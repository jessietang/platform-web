/**
 * 二进制流读写基础库
 * 基于dataview
 */

(function (exports, global) {
  'use strict';

  var compatibility = {
    // 支持情况检查
    NodeBuffer: 'Buffer' in global && 'readInt16LE' in Buffer.prototype,
    DataView: 'DataView' in global && (
      'getFloat64' in DataView.prototype ||
      'getFloat64' in new DataView(new ArrayBuffer(1))
    ),
    ArrayBuffer: 'ArrayBuffer' in global,
    PixelData: 'CanvasPixelArray' in global && 'ImageData' in global
  };

  if (compatibility.PixelData) {
    var createPixelData = function (byteLength, buffer) {
      var data = createPixelData.context2d.createImageData((byteLength + 3) / 4, 1).data;
      data.byteLength = byteLength;
      if (buffer !== undefined) {
        for (var i = 0; i < byteLength; i++) {
          data[i] = buffer[i];
        }
      }
      return data;
    };
    createPixelData.context2d = document.createElement('canvas').getContext('2d');
  }

  var dataTypes = {
    'Int8': 1,
    'Int16': 2,
    'Int32': 4,
    'Uint8': 1,
    'Uint16': 2,
    'Uint32': 4,
    'Float32': 4,
    'Float64': 8,
    'long': 8
  };

  var nodeNaming = {
    'Int8': 'Int8',
    'Int16': 'Int16',
    'Int32': 'Int32',
    'Uint8': 'UInt8',
    'Uint16': 'UInt16',
    'Uint32': 'UInt32',
    'Float32': 'Float',
    'Float64': 'Double',
    'long': 'long'
  };

  function arrayFrom(arrayLike, forceCopy) {
    return (!forceCopy && (arrayLike instanceof Array)) ? arrayLike : Array.prototype.slice.call(arrayLike);
  }

  function defined(value, defaultValue) {
    return value !== undefined ? value : defaultValue;
  }

  function binaryStream(buffer, byteOffset, byteLength, littleEndian) {
    if (buffer instanceof binaryStream) {
      var result = buffer.slice(byteOffset, byteOffset + byteLength);
      result._littleEndian = defined(littleEndian, result._littleEndian);
      return result;
    }

    if (!(this instanceof binaryStream)) {
      return new binaryStream(buffer, byteOffset, byteLength, littleEndian);
    }

    this.buffer = buffer = binaryStream.wrapBuffer(buffer);

    this._isArrayBuffer = compatibility.ArrayBuffer && buffer instanceof ArrayBuffer;
    this._isPixelData = compatibility.PixelData && buffer instanceof CanvasPixelArray;
    this._isDataView = compatibility.DataView && this._isArrayBuffer;
    this._isNodeBuffer = compatibility.NodeBuffer && buffer instanceof Buffer;

    if (!this._isNodeBuffer && !this._isArrayBuffer && !this._isPixelData && !(buffer instanceof Array)) {
      throw new TypeError('binaryStream buffer has an incompatible type');
    }

    this._littleEndian = !!littleEndian;

    var bufferLength = 'byteLength' in buffer ? buffer.byteLength : buffer.length;
    this.byteOffset = byteOffset = defined(byteOffset, 0);
    this.byteLength = byteLength = defined(byteLength, bufferLength - byteOffset);

    if (!this._isDataView) {
      this._checkBounds(byteOffset, byteLength, bufferLength);
    } else {
      this._view = new DataView(buffer, byteOffset, byteLength);
    }

    this._engineAction =
      this._isDataView
        ? this._dataViewAction
        : this._isNodeBuffer
        ? this._nodeBufferAction
        : this._isArrayBuffer
        ? this._arrayBufferAction
        : this._arrayAction;
  }

  function getCharCodes(string) {
    var Type = compatibility.NodeBuffer ? Buffer : compatibility.ArrayBuffer ? Uint8Array : Array,
      codes = new Type(string.length);

    for (var i = 0, length = string.length; i < length; i++) {
      codes[i] = string.charCodeAt(i) & 0xff;
    }
    return codes;
  }

  binaryStream.wrapBuffer = function (buffer) {
    switch (typeof buffer) {
      case 'number':
        if (compatibility.NodeBuffer) {
          buffer = new Buffer(buffer);
          buffer.fill(0);
        } else
        if (compatibility.ArrayBuffer) {
          buffer = new Uint8Array(buffer).buffer;
        } else
        if (compatibility.PixelData) {
          buffer = createPixelData(buffer);
        } else {
          buffer = new Array(buffer);
          for (var i = 0; i < buffer.length; i++) {
            buffer[i] = 0;
          }
        }
        return buffer;

      case 'string':
        buffer = getCharCodes(buffer);
      default:
        if ('length' in buffer && !((compatibility.NodeBuffer && buffer instanceof Buffer) || (compatibility.ArrayBuffer && buffer instanceof ArrayBuffer) || (compatibility.PixelData && buffer instanceof CanvasPixelArray))) {
          if (compatibility.NodeBuffer) {
            buffer = new Buffer(buffer);
          } else
          if (compatibility.ArrayBuffer) {
            buffer = (buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)).buffer;
          } else
          if (compatibility.PixelData) {
            buffer = createPixelData(buffer.length, buffer);
          } else {
            buffer = arrayFrom(buffer);
          }
        }
        return buffer;
    }
  };

  binaryStream.createBuffer = function () {
    return binaryStream.wrapBuffer(arguments);
  };

  function Uint64(lo, hi) {
    this.lo = lo;
    this.hi = hi;
  }

  binaryStream.Uint64 = Uint64;

  Uint64.prototype = {
    valueOf: function () {
      return this.lo + Math.pow(2, 32) * this.hi;
    },

    toString: function () {
      return Number.prototype.toString.apply(this.valueOf(), arguments);
    }
  };

  Uint64.fromNumber = function (number) {
    var hi = Math.floor(number / Math.pow(2, 32)),
      lo = number - hi * Math.pow(2, 32);

    return new Uint64(lo, hi);
  };

  function Int64(lo, hi) {
    Uint64.apply(this, arguments);
  }

  binaryStream.Int64 = Int64;

  Int64.prototype = 'create' in Object ? Object.create(Uint64.prototype) : new Uint64();

  Int64.prototype.valueOf = function () {
    if (this.hi < Math.pow(2, 31)) {
      return Uint64.prototype.valueOf.apply(this, arguments);
    }
    return -((Math.pow(2, 32) - this.lo) + Math.pow(2, 32) * (Math.pow(2, 32) - 1 - this.hi));
  };

  Int64.fromNumber = function (number) {
    var lo, hi;
    if (number >= 0) {
      var unsigned = Uint64.fromNumber(number);
      lo = unsigned.lo;
      hi = unsigned.hi;
    } else {
      hi = Math.floor(number / Math.pow(2, 32));
      lo = number - hi * Math.pow(2, 32);
      hi += Math.pow(2, 32);
    }
    return new Int64(lo, hi);
  };

  binaryStream.prototype = {
    _offset: 0,

    compatibility: compatibility,

    _checkBounds: function (byteOffset, byteLength, maxLength) {
      if (typeof byteOffset !== 'number') {
        throw new TypeError('Offset is not a number.');
      }
      if (typeof byteLength !== 'number') {
        throw new TypeError('Size is not a number.');
      }
      if (byteLength < 0) {
        throw new RangeError('Length is negative.');
      }
      if (byteOffset < 0 || byteOffset + byteLength > defined(maxLength, this.byteLength)) {
        throw new RangeError('Offsets are out of bounds.');
      }
    },

    _action: function (type, isReadAction, byteOffset, littleEndian, value) {
      return this._engineAction(
        type,
        isReadAction,
        defined(byteOffset, this._offset),
        defined(littleEndian, this._littleEndian),
        value
      );
    },

    _dataViewAction: function (type, isReadAction, byteOffset, littleEndian, value) {
      this._offset = byteOffset + dataTypes[type];
      return isReadAction ? this._view['get' + type](byteOffset, littleEndian) : this._view['set' + type](byteOffset, value, littleEndian);
    },

    _nodeBufferAction: function (type, isReadAction, byteOffset, littleEndian, value) {
      this._offset = byteOffset + dataTypes[type];

      var nodeName = nodeNaming[type] + ((type === 'Int8' || type === 'Uint8') ? '' : littleEndian ? 'LE' : 'BE');

      byteOffset += this.byteOffset;

      return isReadAction ? this.buffer['read' + nodeName](byteOffset) : this.buffer['write' + nodeName](value, byteOffset);
    },

    _arrayBufferAction: function (type, isReadAction, byteOffset, littleEndian, value) {
      var size = dataTypes[type], TypedArray = global[type + 'Array'], typedArray;

      if (size === 1 || ((this.byteOffset + byteOffset) % size === 0 && littleEndian)) {
        typedArray = new TypedArray(this.buffer, this.byteOffset + byteOffset, 1);
        this._offset = byteOffset + size;
        return isReadAction ? typedArray[0] : (typedArray[0] = value);
      } else {
        var bytes = new Uint8Array(isReadAction ? this._getBytes(size, byteOffset, littleEndian) : size);
        typedArray = new TypedArray(bytes.buffer, 0, 1);

        if (isReadAction) {
          return typedArray[0];
        } else {
          typedArray[0] = value;
          this._setBytes(byteOffset, bytes, littleEndian);
        }
      }
    },

    _arrayAction: function (type, isReadAction, byteOffset, littleEndian, value) {
      return isReadAction ? this['_get' + type](byteOffset, littleEndian) : this['_set' + type.replace('Uint', 'Int')](byteOffset, value, littleEndian);
    },


    _getBytes: function (length, byteOffset, littleEndian) {
      littleEndian = defined(littleEndian, this._littleEndian);
      byteOffset = defined(byteOffset, this._offset);
      length = defined(length, this.byteLength - byteOffset);

      this._checkBounds(byteOffset, length);

      byteOffset += this.byteOffset;

      this._offset = byteOffset - this.byteOffset + length;

      var result = this._isArrayBuffer
        ? new Uint8Array(this.buffer, byteOffset, length)
        : (this.buffer.slice || Array.prototype.slice).call(this.buffer, byteOffset, byteOffset + length);

      return littleEndian || length <= 1 ? result : arrayFrom(result).reverse();
    },

    getBytes: function (length, byteOffset, littleEndian, toArray) {
      var result = this._getBytes(length, byteOffset, defined(littleEndian, true));
      return toArray ? arrayFrom(result) : result;
    },

    _setBytes: function (byteOffset, bytes, littleEndian) {
      var length = bytes.length;

      if (length === 0) {
        return;
      }

      littleEndian = defined(littleEndian, this._littleEndian);
      byteOffset = defined(byteOffset, this._offset);

      this._checkBounds(byteOffset, length);

      if (!littleEndian && length > 1) {
        bytes = arrayFrom(bytes, true).reverse();
      }

      byteOffset += this.byteOffset;

      if (this._isArrayBuffer) {
        new Uint8Array(this.buffer, byteOffset, length).set(bytes);
      }
      else {
        if (this._isNodeBuffer) {
          new Buffer(bytes).copy(this.buffer, byteOffset);
        } else {
          for (var i = 0; i < length; i++) {
            this.buffer[byteOffset + i] = bytes[i];
          }
        }
      }

      this._offset = byteOffset - this.byteOffset + length;
    },

    setBytes: function (byteOffset, bytes, littleEndian) {
      this._setBytes(byteOffset, bytes, defined(littleEndian, true));
    },

    writeBytes: function (bytes, littleEndian) {
      this.setBytes(undefined, bytes, littleEndian);
    },

    getString: function (byteLength, byteOffset, encoding) {
      if (this._isNodeBuffer) {
        byteOffset = defined(byteOffset, this._offset);
        byteLength = defined(byteLength, this.byteLength - byteOffset);

        this._checkBounds(byteOffset, byteLength);

        this._offset = byteOffset + byteLength;
        return this.buffer.toString(encoding || 'binary', this.byteOffset + byteOffset, this.byteOffset + this._offset);
      }
      var bytes = this._getBytes(byteLength, byteOffset, true), string = '';
      byteLength = bytes.length;
      for (var i = 0; i < byteLength; i++) {
        string += String.fromCharCode(bytes[i]);
      }
      if (encoding === 'utf8') {
        string = decodeURIComponent(escape(string));
      }
      return string;
    },

    setString: function (byteOffset, subString, encoding) {
      if (this._isNodeBuffer) {
        byteOffset = defined(byteOffset, this._offset);
        this._checkBounds(byteOffset, subString.length);
        this._offset = byteOffset + this.buffer.write(subString, this.byteOffset + byteOffset, encoding || 'binary');
        return;
      }
      if (encoding === 'utf8') {
        subString = unescape(encodeURIComponent(subString));
      }
      this._setBytes(byteOffset, getCharCodes(subString), true);
    },

    writeString: function (subString, encoding) {
      this.setString(undefined, subString, encoding);
    },

    getChar: function (byteOffset) {
      return this.getString(1, byteOffset);
    },

    setChar: function (byteOffset, character) {
      this.setString(byteOffset, character);
    },

    writeChar: function (character) {
      this.setChar(undefined, character);
    },

    tell: function () {
      return this._offset;
    },

    seek: function (byteOffset) {
      this._checkBounds(byteOffset, 0);
      return this._offset = byteOffset;
    },

    skip: function (byteLength) {
      return this.seek(this._offset + byteLength);
    },

    slice: function (start, end, forceCopy) {
      return forceCopy
        ? new binaryStream(this.getBytes(end - start, start, true, true), undefined, undefined, this._littleEndian)
        : new binaryStream(this.buffer, this.byteOffset + start, end - start, this._littleEndian);
    },

    _getFloat64: function (byteOffset, littleEndian) {
      var b = this._getBytes(8, byteOffset, littleEndian),

        sign = 1 - (2 * (b[7] >> 7)),
        exponent = ((((b[7] << 1) & 0xff) << 3) | (b[6] >> 4)) - ((1 << 10) - 1),

        mantissa = ((b[6] & 0x0f) * Math.pow(2, 48)) + (b[5] * Math.pow(2, 40)) + (b[4] * Math.pow(2, 32)) +
          (b[3] * Math.pow(2, 24)) + (b[2] * Math.pow(2, 16)) + (b[1] * Math.pow(2, 8)) + b[0];

      if (exponent === 1024) {
        if (mantissa !== 0) {
          return NaN;
        } else {
          return sign * Infinity;
        }
      }

      if (exponent === -1023) {
        return sign * mantissa * Math.pow(2, -1022 - 52);
      }

      return sign * (1 + mantissa * Math.pow(2, -52)) * Math.pow(2, exponent);
    },

    _getFloat32: function (byteOffset, littleEndian) {
      var b = this._getBytes(4, byteOffset, littleEndian),

        sign = 1 - (2 * (b[3] >> 7)),
        exponent = (((b[3] << 1) & 0xff) | (b[2] >> 7)) - 127,
        mantissa = ((b[2] & 0x7f) << 16) | (b[1] << 8) | b[0];

      if (exponent === 128) {
        if (mantissa !== 0) {
          return NaN;
        } else {
          return sign * Infinity;
        }
      }

      if (exponent === -127) {
        return sign * mantissa * Math.pow(2, -126 - 23);
      }

      return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
    },

    _get64: function (Type, byteOffset, littleEndian) {
      littleEndian = defined(littleEndian, this._littleEndian);
      byteOffset = defined(byteOffset, this._offset);

      var parts = littleEndian ? [0, 4] : [4, 0];

      for (var i = 0; i < 2; i++) {
        parts[i] = this.getUint32(byteOffset + parts[i], littleEndian);
      }

      this._offset = byteOffset + 8;

      return new Type(parts[0], parts[1]);
    },

    getInt64: function (byteOffset, littleEndian) {
      return this._get64(Int64, byteOffset, littleEndian);
    },

    getUint64: function (byteOffset, littleEndian) {
      return this._get64(Uint64, byteOffset, littleEndian);
    },

    _getInt32: function (byteOffset, littleEndian) {
      var b = this._getBytes(4, byteOffset, littleEndian);
      return (b[3] << 24) | (b[2] << 16) | (b[1] << 8) | b[0];
    },

    _getUint32: function (byteOffset, littleEndian) {
      return this._getInt32(byteOffset, littleEndian) >>> 0;
    },

    _getInt16: function (byteOffset, littleEndian) {
      return (this._getUint16(byteOffset, littleEndian) << 16) >> 16;
    },

    _getUint16: function (byteOffset, littleEndian) {
      var b = this._getBytes(2, byteOffset, littleEndian);
      return (b[1] << 8) | b[0];
    },

    _getInt8: function (byteOffset) {
      return (this._getUint8(byteOffset) << 24) >> 24;
    },

    _getUint8: function (byteOffset) {
      return this._getBytes(1, byteOffset)[0];
    },

    _setBinaryFloat: function (byteOffset, value, mantSize, expSize, littleEndian) {
      var signBit = value < 0 ? 1 : 0,
        exponent,
        mantissa,
        eMax = ~(-1 << (expSize - 1)),
        eMin = 1 - eMax;

      if (value < 0) {
        value = -value;
      }

      if (value === 0) {
        exponent = 0;
        mantissa = 0;
      } else if (isNaN(value)) {
        exponent = 2 * eMax + 1;
        mantissa = 1;
      } else if (value === Infinity) {
        exponent = 2 * eMax + 1;
        mantissa = 0;
      } else {
        exponent = Math.floor(Math.log(value) / Math.LN2);
        if (exponent >= eMin && exponent <= eMax) {
          mantissa = Math.floor((value * Math.pow(2, -exponent) - 1) * Math.pow(2, mantSize));
          exponent += eMax;
        } else {
          mantissa = Math.floor(value / Math.pow(2, eMin - mantSize));
          exponent = 0;
        }
      }

      var b = [];
      while (mantSize >= 8) {
        b.push(mantissa % 256);
        mantissa = Math.floor(mantissa / 256);
        mantSize -= 8;
      }
      exponent = (exponent << mantSize) | mantissa;
      expSize += mantSize;
      while (expSize >= 8) {
        b.push(exponent & 0xff);
        exponent >>>= 8;
        expSize -= 8;
      }
      b.push((signBit << expSize) | exponent);

      this._setBytes(byteOffset, b, littleEndian);
    },

    _setFloat32: function (byteOffset, value, littleEndian) {
      this._setBinaryFloat(byteOffset, value, 23, 8, littleEndian);
    },

    _setFloat64: function (byteOffset, value, littleEndian) {
      this._setBinaryFloat(byteOffset, value, 52, 11, littleEndian);
    },

    _set64: function (Type, byteOffset, value, littleEndian) {
      if (!(value instanceof Type)) {
        value = Type.fromNumber(value);
      }

      littleEndian = defined(littleEndian, this._littleEndian);
      byteOffset = defined(byteOffset, this._offset);

      var parts = littleEndian ? { lo: 0, hi: 4 } : { lo: 4, hi: 0 };

      for (var partName in parts) {
        this.setUint32(byteOffset + parts[partName], value[partName], littleEndian);
      }

      this._offset = byteOffset + 8;
    },

    setInt64: function (byteOffset, value, littleEndian) {
      this._set64(Int64, byteOffset, value, littleEndian);
    },

    writeInt64: function (value, littleEndian) {
      this.setInt64(undefined, value, littleEndian);
    },

    setUint64: function (byteOffset, value, littleEndian) {
      this._set64(Uint64, byteOffset, value, littleEndian);
    },

    writeUint64: function (value, littleEndian) {
      this.setUint64(undefined, value, littleEndian);
    },

    _setInt32: function (byteOffset, value, littleEndian) {
      this._setBytes(byteOffset, [
        value & 0xff,
        (value >>> 8) & 0xff,
        (value >>> 16) & 0xff,
        value >>> 24
      ], littleEndian);
    },

    _setInt16: function (byteOffset, value, littleEndian) {
      this._setBytes(byteOffset, [
        value & 0xff,
        (value >>> 8) & 0xff
      ], littleEndian);
    },

    _setInt8: function (byteOffset, value) {
      this._setBytes(byteOffset, [value & 0xff]);
    }
  };

  var proto = binaryStream.prototype;

  for (var type in dataTypes) {
    (function (type) {
      proto['get' + type] = function (byteOffset, littleEndian) {
        return this._action(type, true, byteOffset, littleEndian);
      };
      proto['set' + type] = function (byteOffset, value, littleEndian) {
        this._action(type, false, byteOffset, littleEndian, value);
      };
      proto['write' + type] = function (value, littleEndian) {
        this['set' + type](undefined, value, littleEndian);
      };
    })(type);
  }

  if ('module' in global && exports === module.exports) {
    module.exports = binaryStream;
  } else {
    exports.binaryStream = binaryStream;
  }

})(this, (function () { return this })());

/**
 * stream reader
 */

(function (exports, global) {
  if (!('binaryStream' in global)) throw 'require binary-stream.js,but not found';

  /**
   * @param buffer ArrayBuffer,Unit8Array,DataView,etc...
   * @param format string
   *	i 	- Int32,4 bytes
   * 	C4	- һ���ַ�����,����Ϊ4
   *	s	- Int16,2 bytes
   * @littleEndian - ���˻���С��,Ĭ��С��
   *
   * @code begin
   *		// ע��: ��'iiS4'��ʽ��������һ��C�ṹ��
   *		// ����: struct demo {
	 *		// 			int m1;
	 *		//			int m2;
	 *		//			char str[4]
	 *		//		};
   *		var sr = new streamReader(new ArrayBuffer(12), 'iiC4');
   *		var data = sr.readToEnd(); // data��һ��js Array,����m1,m2,str
   *
   *		for (var i = 0; i < data.length; ++i) {
	 *			console.log(data[i]);
	 *		}
   *	@code end
   */
  function streamReader(buffer, format, littleEndian) {
    this._buffer = new binaryStream(buffer);
    this._format = format;
    this._format_length = this._format.length;
    this._littleEndian = typeof littleEndian !== 'undefined' ? littleEndian : false;
    this._byteLength = buffer.byteLength;
    this._readBytes = 0;
    this._encoding = 'gbk';
  }

  streamReader.prototype = {
    readToEnd: function () {
      var data = [];
      var index = 0;

      do {
        var cur = this._helper(index);

        index += cur.step;
        data.push(cur.data);
      } while (index < this._format_length);

      // ע�͵���һ����������reader�ܹ���ͣ�Ķ�����
      //this._readBytes = 0;

      return data;
    },
    setFormat: function (fmt) {
      this._format = fmt;
      this._format_length = this._format.length;
      //this._readBytes = 0;
    },
    reset: function () {
      this._readBytes = 0;
    },
    /**
     * @param encoder String {'binary', 'gb2312'}
     */
    setEncoding: function (encoder) {
      this._encoding = encoder;
    },
    getBuffer: function () {
      return this._buffer;
    },
    _helper: function (index) {
      var ret = {
        step: 1
      };

      switch (this._format.charAt(index)) {
        case 'i':
          ret.data = this._buffer.getInt32(this._readBytes, this._littleEndian);

          this._readBytes += 4;
          break;
        case 'I':
          ret.data = this._buffer.getUint32(this._readBytes, this._littleEndian);

          this._readBytes += 4;
          break;
        case 's':
          ret.data = this._buffer.getInt16(this._readBytes, this._littleEndian);

          this._readBytes += 2;
          break;
        case 'S':
          ret.data = this._buffer.getUint16(this._readBytes, this._littleEndian);

          this._readBytes += 2;
          break;
        case 'b':
          ret.data = this._buffer.getInt8(this._readBytes);

          this._readBytes += 1;
          break;
        case 'B':
          ret.data = this._buffer.getUint8(this._readBytes);

          this._readBytes += 1;
          break;
        case 'f':
          ret.data = this._buffer.getFloat32(this._readBytes, this._littleEndian);

          this._readBytes += 4;
          break;
        case 'F':
          ret.data = this._buffer.getFloat64(this._readBytes, this._littleEndian);

          this._readBytes += 8;
          break;
        case 'C':
          var substr = this._format.substr(index + 1);
          var len = parseInt(substr);

          ret.step = ('' + len).length + 1;

          if (len === 1) {
            ret.data = this._buffer.getString(len, this._readBytes);
          } else {
            var temp = '';
            ret.data = '';
            var tempLen = 0;

            if (this._encoding === 'gbk') {
              for (var i = 0; i < len; ++i) {
                temp = this._buffer.getUint8(this._readBytes + i);

                if (temp === 0) break;

                ret.data += '%' + temp.toString(16);
                tempLen++;
              }
              try { ret.data = Gov.Encrypt.decoderGBK(ret.data.toUpperCase()); } catch (e) { }
            } else if (this._encoding === 'jpeg') {
              // ����ͼ������
              ret.data = new Uint8Array(this._buffer.buffer, this._readBytes, len);
            } else if (this._encoding === 'binary') {
              // ���ƶ���������
              ret.data = new Uint8Array(this._buffer.buffer, this._readBytes, len);
            } else {
              for (var i = 0; i < len; ++i) {
                temp = this._buffer.getChar(this._readBytes + i);

                if (temp === '\0') break;

                ret.data += temp;
              }
            }
          }

          this._readBytes += len;
          break;
        default:
          throw 'unknow format string at ' + index + ',the format string is ' + this._format;
      }

      return ret;
    }
  };

  if ('module' in global && exports === module.exports) {
    module.exports = streamReader;
  } else {
    exports.streamReader = streamReader;
  }

})(this, function () { return this; }());
/**
 * stream writer
 */

(function (exports, global) {
  if (!('binaryStream' in global)) throw 'require binary-stream.js,but not found';

  function streamWriter(littleEndian) {
    this._buffer = null;
    this._byte_length = 0;
    this._format = '';
    this._writeBytes = 0;
    this._littleEndian = typeof littleEndian !== 'undefined' ? littleEndian : false;
  }

  /**
   * @code begin
   *		// 考虑以下C结构体
   *		// struct demo {
	 *		// 		int m1;
	 *		//		int m2;
	 *		//		char str[4];
	 *		//	};
   *		// 如何用js来实现这样的一个结构体呢?看下面的例子代码
   *		var sw = new streamWriter();
   *
   *		sw.createBuffer(12);
   *		var data = [];
   *
   *		data.push(12);
   *		data.push(56);
   *		data.push('abc');
   *
   *		sw.writeBuffer(data, 'iiS3'); // 'iiS3'是格式化字符串,比如i代表C语言里面的int
   *		var buffer = sw.getBuffer(); // 现在buffer里面就包含了这样的一个结构体
   *	@code end
   */
  streamWriter.prototype = {
    createBuffer: function (byteLength) {
      if (typeof byteLength === 'undefined') {
        throw 'arguments byteLength is undefined';
      }
      if (typeof byteLength !== 'number') {
        throw 'arguments byteLength not an number';
      }

      // create buffer
      if (this._buffer !== null) {
        this._buffer = null; // 解引用
      }
      this._buffer = new binaryStream(new Int8Array(byteLength));
      this._byte_length = byteLength;
    },
    writeBuffer: function (array, format) {
      if (this._writeBytes === this._byte_length) {
        throw 'buffer is full';
      }

      if (typeof format === 'undefined') {
        this._format = '';
        for (var i = 0; i < array.length; ++i) {
          // 注意,如果你不设置格式
          // 这种方式将有可能截断数据
          this._format += 'b';
        }
      } else {
        this._format = format;
      }

      var index = 0;
      var length = this._format.length;
      do {
        var value = array.shift();
        var ret = this._helper(index, value);
        index += ret.step;
      } while (index < length);
    },
    getBuffer: function () {
      return this._buffer.buffer;
    },
    getBufferObj:function(){
      return this._buffer;
    },
    _helper: function (index, value) {
      var ret = {
        step: 1
      };

      switch (this._format.charAt(index)) {
        case 'i':
          this._buffer.setInt32(this._writeBytes, value, this._littleEndian);

          this._writeBytes += 4;
          break;
        case 'I':
          this._buffer.setUint32(this._writeBytes, value, this._littleEndian);

          this._writeBytes += 4;
          break;
        case 's':
          this._buffer.setInt16(this._writeBytes, value, this._littleEndian);

          this._writeBytes += 2;
          break;
        case 'S':
          this._buffer.setUint16(this._writeBytes, value, this._littleEndian);

          this._writeBytes += 2;
          break;
        case 'b':
          this._buffer.setInt8(this._writeBytes, value);

          this._writeBytes += 1;
          break;
        case 'B':
          this._buffer.setUint8(this._writeBytes, value);

          this._writeBytes += 1;
          break;
        case 'f':
          this._buffer.setFloat32(this._writeBytes, value, this._littleEndian);

          this._writeBytes += 4;
          break;
        case 'F':
          this._buffer.setFloat64(this._writeBytes, value, this._littleEndian);

          this._writeBytes += 8;
          break;
        case 'C':
          // 对数组不足的元素补'\0'
          var substr = this._format.substr(index + 1);
          var str_len = parseInt(substr);
          var length = value.length > str_len ? str_len : value.length;
          var i = 0;

          ret.step = ('' + str_len).length + 1;

          for (i = 0; i < length; ++i) {
            this._buffer.setChar(this._writeBytes + i, value[i]);
          }
          for (; i < str_len; ++i) {
            this._buffer.setChar(this._writeBytes + i, '\0');
          }

          this._writeBytes += str_len;
          break;
        case 'l':
          this._buffer.setInt64(this._writeBytes, value, this._littleEndian);

          this._writeBytes += 8;
          break;
        default:
          throw 'unknow format string at ' + index + ',the format string is ' + this._format;
      }

      return ret;
    }
  };

  if ('module' in global && exports === module.exports) {
    module.exports = streamWriter;
  } else {
    exports.streamWriter = streamWriter;
  }
})(this, function () { return this; }());
/**
 * Single
 *
 * 实现了一套基于js的信号机制
 */

(function(exports){
  var _ = exports.Single = function() {
    this._listener = [];
  };

  _.prototype = {
    addEventListener: function (event, handler) {
      this._listener.push({
        event_name: 'on' + event,
        event_handler: handler
      });
    },
    removeEventListener: function(event) {
      event = 'on' + event;

      for (var i = 0; i < this._listener.length; ++i) {
        if (this._listener[i].event_name === event) {
          this._listener.splice(i, 1);
          return;
        }
      }
    },
    single: function(event) {
      event = 'on' + event;

      for (var i = 0; i < this._listener.length; ++i) {
        if (this._listener[i].event_name === event) {
          this._listener[i].event_handler();
          return;
        }
      }
    }
  };
})(this);
