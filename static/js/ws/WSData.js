/// <reference path="../Base/WS.js" />
/// <reference path="../Gov.js" />
var WSData =  {};
+function (ns) {
  ns.Command = {
    CMD_ADMIN: 0x8000,      // 管理命令
    CMD_PLATFORM: 0x0800,   // 平台命令
    CMD_RESPONSE: 0x0100,   // 辅助命令,表示服务器端返回(由客户端主动发起)
    CMD_RECORDSETS: 0x0002,  // 辅助命令,表示有记录集
    CMD_RECORDSEHR: 0x0001  //辅助命令,表示返回值只有包头
  };

  ns.Subcmd = {
    LOGIN: 0x01,
    SUBCMD_PONG: 0x03e6,  // 心跳包
    LOGINOFFLINE: 0x04,

    SUBCMD_WARN_URGE_TODO_ACK: 0x1401,		// 报警督办应答

    SUBCMD_WARN_ADPT_INFO: 0x1402,          // 服务器主动上报报警信息
    SUBCMD_ENABLE_USERWARN_PUSH: 1001,
    GOV_ALARM_WarnOverSpeed: 0x1420,
    GOV_ALARM_WarnNightAbnormalMove: 0x1421,
    GOV_ALARM_WarnFatigue: 0x1422,
    SUBCMD_WARN_ADPT_TODO_INFO: 0x1403,		// 上报报警处理信息
    SUBCMD_WARN_URGE_TODO_REQ: 0x9401,     // 报警督办请求回报
    SUBCMD_DATA_LAST_POSITION: 937,
    PING: 999,
    GOV_VEHICLE_TEACK: 45, //车辆监管跟踪
    GOV_VEHICLE_TEACK_R: 46, //车辆监管跟踪
    GOV_VEHICLE_CANCEL_TREACK: 47,//车辆监管取消跟踪
    SUBCMD_PLATFORM_NEW: 0x0270, // 新增平台
    SUBCMD_PLATFORM_UPDATE: 0x0272, // 修改平台
    SUBCMD_PLATFORM_DELETE: 0x0271, // 删除平台
    SUBCMD_PLATFORM_QUERY: 0x0273, // 查询平台
    SUBCMD_DATA_UNITINFO_NEW: 101, //企业基本信息
    SUBCMD_DATA_UNITINFO_UPDATE: 102,
    SUBCMD_DATA_UNITINFO_DELETE: 103,
    SUBCMD_DATA_VEHICLEINFO_NEW: 110,
    SUBCMD_DATA_VEHICLEINFO_UPDATE: 111,
    SUBCMD_DATA_VEHICLEINFO_DELETE: 112,

    SUBCMD_PRACTITIONER_NEW: 120,//新增从业人员
    SUBCMD_PRACTITIONER_UPDATE: 121,//修改从业人员
    SUBCMD_PRACTITIONER_DELETE: 122,//删除从业人员

    SUBCMD_DATA_PROVIDER_QUERY: 94, //查询服务商
    SUBCMD_DATA_PROVIDER_ADD: 91,  //增加服务商
    SUBCMD_DATA_PROVIDER_UPDATE: 93,//修改服务商
    SUBCMD_DATA_PROVIDER_DELETE: 92,//删除服务商

    SUBCMD_ENTINFO_QUERY: 52,                     //单位数据同步
    SUBCMD_CARINFO_QUERY: 51,                    //车辆数据同步

    SUBCMD_UPDATE_PASSWORD: 0x51,                  //修改密码

    SUBCMD_ADMIN_NEW_OPERATOR: 0x21,            // 增加用户
    SUBCMD_ADMIN_UPDATE_OPERATOR: 0x23,          // 更新用户
    SUBCMD_ADMIN_DELETE_OPERATOR: 0x22,         // 删除用户
    SUBCMD_QUERY_LOCATING: 88,                // 历史轨迹
    SUBCMD_OVERSPEED_CONFIG: 10,

    SUBCMD_NORMAL_EXPORT: 665,              //导出普通报表
    SUBCMD_PROHIBIT_EXPORT: 666,            //导出6严禁报表
    SUBCMD_RANGE_EXPORT: 667,            //导出范围查询报表
    SUBCMD_GET_CAR_PHOTO_ID: 0x9502,           //获取车辆照片ID
    SUBCMD_GET_CAR_PHOTO_DATA: 0x3B5,           //获取车辆照片数据
    SUBCMD_QUERY_HISTORY_PHOTO: 0x03b4,             // 查询历史图片列表
    SUBCOM_MSG_TEXT_INFO: 0x9503,             //短信
    SUBCMD_CHECK_SENTRY: 0x012c,          // 上级查岗
    SUBCMD_CHECK_SENTRY_R: 0x0320,              // 查岗结果推送
    SUBCMD_CHECK_SENTRY_RECEIVE: 299,          // 向下级推送问题
    SUBCMD_CHECK_SENTRY_ANSWER: 299,          // 下级回复
    SUBCMD_CHECK_SENTRY_SETTING: 301,            //平台自动查岗配置
    SUBCMD_MSG_VOICE_MONITOR: 0x9501,     // 车辆单向监听请求
    SUBCMD_MSG_DRIVE_RECODER: 0x9504,      // 车辆行驶记录请求
    SUBCMD_MSG_DRIVE_RECODER_DETAIL: 0x02e3,        // 根据idx提取记录仪详细数据
    SUBCMD_DATE_AREA_VEHICLE: 90,            //时间区域车辆数据
    SUBCMD_COMPUTER_INFO: 701,             //获取主机信息
    SUBCMD_COMPUTER_DISK_INFO: 702,             //获取主机磁盘信息
    SUBCMD_COMPUTER_SERVICE_INFO: 703,             //获取主机服务信息
    SUBCMD_HOMEPAGE_UNIT: 190,
    SUBCMD_HOMEPAGE_VEHICLE: 189,
    SUBCMD_HOMEPAGE_ZONE: 187,
    SUBCMD_HOMEPAGE_PLATFORM: 188,
    SUBCMD_WEATHER_TEACK: 48111,               //安全监管设置、取消跟踪
    SUBCMD_WEATHER_TEACK_R: 49111,             //安全监管跟踪主动推送
    SUBCMD_INFO_PUBLISH_REQUEST:302,                //通知服务器推送信息发布,上级督办数据
    SUBCMD_INFO_PUBLISH_SEND: 312,                 //发送信息发布
    SUBCMD_INFO_PUBLISH_RECEIVE: 313,             //接收信息发布
    SUBCMD_SUPERVISE_RECEIVE: 306,             //接收上级督办消息
    SUBCMD_SUPERVISE_DONE: 309,                  //督办完成后发送通知消息通知
    SUBCMD_INFO_PUBLISH_REPLY: 314,                  //消息通知回复
    SUBCMD_AlertZone_ADD: 315,
    SUBCMD_AlertZone_DEL: 316,
    SUBCMD_AlertGraphZone_ADD: 317,
    SUBCMD_AlertGraphZone_DEL: 318,
    SUBCMD_SEND_PLATFORM_MSG: 319,            //向下级接入平台发送消息
    SUBCMD_YUNWEI_Minitor: 322          // 服务监控
  };

  ns.Pushmode = {
    PUSH_MODE_ALL: 0,               // 跟踪所有目标
    PUSH_MODE_COMPANY: 1,           // 跟踪单位下所有目标
    PUSH_MODE_DEVICE: 2,            // 跟踪单个指定目标
    PUSH_MODE_MULTI_COMPANY: 3,     // 跟踪多个单位下指定目标
    PUSH_MODE_MULTI_DEVICE: 4,      // 跟踪多个指定目标
    PUSH_MODE_POLY: 9,              // 跟踪单个指定区域内运行的目标
    PUSH_MODE_NONE: 100             // 取消跟踪

  };
}(WSData);

WSData.Original = Gov.WS.Struct;
WSData.Struct = new Object();
//WSData.Struct = Gov.WS.Struct;
WSData.DataType = Gov.WS.DataType;

+function (ns) {
  var struct = ns.Struct;
  var nType = ns.DataType;

  for (var item in ns.Original) {
    struct[item] = function () { };
    var obj = new ns.Original[item];
    struct[item].prototype = obj;
    struct[item].constructor = ns.Original[item].constructor;
  }
  var _action = function (type, prop, value) {
    switch (type) {
      case 'Int8': this[prop].value = value; break;
      case 'Int16': this[prop].value = value; break;
      case 'Int32': this[prop].value = value; break;

      case 'Uint8': this[prop].value = value; break;
      case 'Uint16': this[prop].value = value; break;
      case 'Uint32': this[prop].value = value; break;

      case 'Float32': this[prop].value = value; break;
      case 'Float64': this[prop].value = value; break;

      case 'String': this[prop].value = value; break;
      case 'long': this[prop].value = value; break;
      case 'Array': this[prop].value = value; break;
    }
  };

  var addFunction = function (struct) {


    var obj = new struct;
    var proto = struct.prototype;

    for (var prop in obj) {
      if (typeof obj[prop] !== 'function') {
        (function (type) {
          var action = type.replace(/\b\w+\b/g, function (word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);
          });

          proto['get' + action] = function () {
            var isunsigned = this[type].type.substring(0, 1).toLowerCase() === 'u' ?
              true : false;

            return isunsigned ?
            this[type].value >>> 0 :
              this[type].value;
          };
          proto['set' + action] = function (value) {
            if (this[type].isEncode) {
              value = Gov.Encrypt.encoderGBK(value);
            }
            _action.call(this, this[type].type, type, value);
          };
        })(prop);
      }
    }
    /**
     * @return object { data: js数组; format: 格式化字符串,如'iiC4'}
     * 	可以直接构造一个streamWriter,将数组读入到缓冲区
     *
     * @code begin
     *		var sw = new streamWriter();
     *		var login = new structure.login();
     *
     *		sw.createBuffer(login.getBufferLen());
     *
     *		var data = login.getData();
     *		sw.writeBuffer(data.data, data.format);
     *
     *		// 我们再将数据交给streamReader
     *		var sr = new streamReader(sw.getBuffer(), data.format);
     *		sr.reandToEnd();
     *
     *		// 当然我们也可以将缓冲数据通过socket发到服务器
     * @code end
     */
    proto['getData'] = function () {
      var str = '';
      var datas = [];
      // 自动设置len字段
      if ('lenH' in this || this.hasOwnProperty('lenH')) this.setLenH(this.getBufferLen() - 2);

      for (var prop in this) {
        if (typeof this[prop] !== 'function') {
          switch (this[prop].type) {
            case 'Int8': str += 'b'; datas.push(this[prop].value); break;
            case 'Int16': str += 's'; datas.push(this[prop].value); break;
            case 'Int32': str += 'i'; datas.push(this[prop].value); break;

            case 'Uint8': str += 'B'; datas.push(this[prop].value); break;
            case 'Uint16': str += 'S'; datas.push(this[prop].value); break;
            case 'Uint32': str += 'I'; datas.push(this[prop].value); break;

            case 'Float32': str += 'f'; datas.push(this[prop].value); break;
            case 'Float64': str += 'F'; datas.push(this[prop].value); break;

            case 'String': str += 'C' + this[prop].length; datas.push(this[prop].value); break;
            case 'Char': str += 'C1'; datas.push(this[prop].value); break;

            case 'Array': {
              for (var item in this[prop].value) {
                if (typeof this[prop].value[item].getData === 'function') {
                  var temp = this[prop].value[item].getData();
                  str += temp.format;
                  for (var i = 0; i < temp.data.length; i++) datas.push(temp.data[i]);

                }
                // else item is int? or other type.
              }
            } break;

            case 'long': str += 'l'; datas.push(this[prop].value); break;

            default: throw 'unknow type ' + this[prop].type;
          }
        }
      }

      return {
        data: datas,
        format: str
      };
    };

    /**
     * 从一个数组中赋值
     */
    proto['setData'] = function (array) {
      if (array instanceof Array !== true) throw new TypeError('参数必须为数组(Array)');

      for (var prop in this) {
        this[prop].value = array.shift();
      }
    };

    /**
     * 获取结构体信息
     */
    proto['getFormat'] = function () {
      var str = '';

      // 自动设置len字段
      if (this.hasOwnProperty('lenH')) this.setLenH(this.getBufferLen() - 2);

      for (var prop in this) {
        if (typeof this[prop] !== 'function') {
          switch (this[prop].type) {
            case 'Int8': str += 'b'; break;
            case 'Int16': str += 's'; break;
            case 'Int32': str += 'i'; break;

            case 'Uint8': str += 'B'; break;
            case 'Uint16': str += 'S'; break;
            case 'Uint32': str += 'I'; break;

            case 'Float32': str += 'f'; break;
            case 'Float64': str += 'F'; break;

            case 'String': str += 'C' + this[prop].length; break;
            case 'Char': str += 'C1'; break;

            case 'Array': {
              for (var item in this[prop].value) {
                if (typeof this[prop].value[item].getFormat === 'function') {
                  str += this[prop].value[item].getFormat();
                }
                // else item is int? or other type.
              }
            } break;

            case 'long': str += 'l'; break;

            default: throw 'unknow type ' + this[prop].type;
          }
        }
      }

      return str;
    };

    /**
     * 获取缓冲区长度
     */
    proto['getBufferLen'] = function () {
      var len = 0;

      for (var prop in this) {
        if (typeof this[prop] !== 'function') {
          switch (this[prop].type) {
            case 'String': len += this[prop].length; break;
            case 'Array': {
              for (var item in this[prop].value) {
                if (typeof this[prop].value[item].getBufferLen === 'function') {
                  len += this[prop].value[item].getBufferLen();
                }
                // else item is int? or other type.
              }
            } break;
            default: len += ns.DataType[this[prop].type].len; break;
          }
        }
      }

      return len;
    };

    /**
     * 序列化成json串
     *
     * @param {Object} 待序列化的对象或者this
     *
     */
    proto['serialize'] = function (obj) {
      var _this = obj || this;

      try {
        if (window && window.JSON) return window.JSON.stringify(_this);
      } catch (e) { }

      // 遍历属性,生成json字符串
      var _json = '{';
      for (var prop in _this) {
        if (typeof _this[prop] !== 'function') {
          _json += '"' + prop + '":';
          if (typeof _this[prop] === 'object') {
            _json += arguments.callee.call(this, _this[prop]); // 递归
          } else {
            var re = /^[0-9]+\.?[0-9]*$/;

            try {
              if (!re.test(_this[prop])) {


                // 非数字
                _json += '"' + _this[prop] + '"';
              } else {
                // 数字
                _json += _this[prop];
              }
            }
            catch (e) {
              console.info(e);
              console.error(obj);

            }
          }
          _json += ','
        }
      }
      _json += '}';

      return _json.replace(/,}/g, '}');
    }
  }

  for (var item in struct) {
    if (typeof struct[item] === 'function' && struct !== 'command') {
      addFunction(struct[item]);
    }
  }
}(WSData);

+function (ns) {
  ns.DataBag = {
    DSHeader: {
      command: 0,
      subcmd: 0,
      struct: ns.Struct.DSHeader
    },
    Header: {
      command: 0,
      subcmd: 0,
      struct: ns.Struct.Header
    },
    Ping:{
      command: ns.Command.CMD_ADMIN,
      subcmd: ns.Subcmd.PING,
      struct: ns.Struct.Header
    },
    Login: {
      command: ns.Command.CMD_ADMIN,
      subcmd: ns.Subcmd.LOGIN,
      struct: ns.Struct.Login,
      response:ns.Struct.LoginReply
    },
    VecLastPosition: {
      command: (ns.Command.CMD_ADMIN | ns.Command.CMD_RESPONSE),
      subcmd: ns.Subcmd.SUBCMD_DATA_LAST_POSITION,
      struct: ns.Struct.VecLastPosition,
      response: ns.Struct.VecLastPosition_R
    },
    VehicleTrack: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.GOV_VEHICLE_TEACK,
      struct: ns.Struct.VehicleTrack,
      response: ns.Struct.Header
    },
    VehicleCancelTrack: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.GOV_VEHICLE_CANCEL_TREACK,
      struct: ns.Struct.VehicleCancelTrack,
      response: ns.Struct.Header
    },
    //YUNWEI_Minitor: { // 平台连接情况
    //    command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
    //    subcmd: ns.Subcmd.SUBCMD_YUNWEI_Minitor,
    //    struct: ns.Struct.YUNWEI_Minitor,
    //    response: ns.Struct.Header
    //},
    Tagplatform_location: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_PLATFORM_QUERY,
      struct: ns.Struct.Tagplatform_location,
      response: ns.Struct.Tagplatform_location_s
    },
    Tagplatform_location_add: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_PLATFORM_NEW,
      struct: ns.Struct.Tagplatform_location_add,
      response: ns.Struct.Header
    },
    Tagplatform_location_update: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_PLATFORM_UPDATE,
      struct: ns.Struct.Tagplatform_location_update,
      response: ns.Struct.Header
    },
    Tagplatform_location_delete: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_PLATFORM_DELETE,
      struct: ns.Struct.Tagplatform_location_delete,
      response: ns.Struct.Header
    },
    Baseinfo_unit_add: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_UNITINFO_NEW,
      struct: ns.Struct.Baseinfo_unit_add,
      response: ns.Struct.Header
    },
    Baseinfo_unit_update: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_UNITINFO_UPDATE,
      struct: ns.Struct.Baseinfo_unit_update,
      response: ns.Struct.Header
    },
    Baseinfo_unit_delete: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_UNITINFO_DELETE,
      struct: ns.Struct.Baseinfo_unit_delete,
      response: ns.Struct.Header
    },
    Baseinfo_unit_synchro: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_ENTINFO_QUERY,
      struct: ns.Struct.Baseinfo_unit_synchro,
      response: ns.Struct.Header
    },
    Baseinfo_vehicle_add: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_VEHICLEINFO_NEW,
      struct: ns.Struct.Baseinfo_vehicle_add,
      response: ns.Struct.Header
    },
    Baseinfo_vehicle_update: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_VEHICLEINFO_UPDATE,
      struct: ns.Struct.Baseinfo_vehicle_update,
      response: ns.Struct.Header
    },
    Baseinfo_vehicle_delete: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_VEHICLEINFO_DELETE,
      struct: ns.Struct.Baseinfo_vehicle_delete,
      response: ns.Struct.Header
    },
    User_info_add: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_ADMIN_NEW_OPERATOR,
      struct: ns.Struct.User_info_add,
      response: ns.Struct.Header
    },
    User_info_modify: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_ADMIN_UPDATE_OPERATOR,
      struct: ns.Struct.User_info_modify,
      response: ns.Struct.Header
    },
    User_info_delete: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_ADMIN_DELETE_OPERATOR,
      struct: ns.Struct.User_info_delete,
      response: ns.Struct.Header
    },
    HistoryInfo: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_QUERY_LOCATING,
      struct: ns.Struct.HistoryInfo,
      response: ns.Struct.HistoryInfo_R
    },
    Baseinfo_veh_synchro: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_CARINFO_QUERY,
      struct: ns.Struct.Baseinfo_veh_synchro,
      response: ns.Struct.Header
    },
    UpdatePassword: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_UPDATE_PASSWORD,
      struct: ns.Struct.UpdatePassword,
      response: ns.Struct.Header
    },
    BaseInfo_provider: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_PROVIDER_QUERY,
      struct: ns.Struct.BaseInfo_provider,
      response: ns.Struct.BaseInfo_provider_s
    },

    BaseInfo_provider_add: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_PROVIDER_ADD,
      struct: ns.Struct.BaseInfo_provider_add,
      response:ns.Struct.Header
    },
    BaseInfo_provider_update: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_PROVIDER_UPDATE,
      struct: ns.Struct.BaseInfo_provider_update,
      response:ns.Struct.Header
    },
    BaseInfo_provider_delete: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATA_PROVIDER_DELETE,
      struct: ns.Struct.BaseInfo_provider_delete,
      response:ns.Struct.Header
    },
    OverSpeedConfig: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_OVERSPEED_CONFIG,
      struct: ns.Struct.OverSpeedConfig,
      response: ns.Struct.Header
    },
    Prohibit_export: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_PROHIBIT_EXPORT,
      struct: ns.Struct.Prohibit_export,
      response: ns.Struct.Prohibit_export_r
    },
    Range_export: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_RANGE_EXPORT,
      struct: ns.Struct.Range_export,
      response: ns.Struct.Range_export_r
    },
    //Normal_export: {
    //    command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
    //    subcmd: ns.Subcmd.SUBCMD_NORMAL_EXPORT,
    //    struct: ns.Struct.Normal_export,
    //    response: ns.Struct.Normal_export_r
    //},
    SendTextMessage: {
      command: ns.Command.CMD_PLATFORM,
      subcmd: ns.Subcmd.SUBCOM_MSG_TEXT_INFO,
      struct: ns.Struct.SendTextMessage,
      response: ns.Struct.Header
    },
    Practitioner_info_add: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_PRACTITIONER_NEW,
      struct: ns.Struct.Practitioner_info_add,
      response: ns.Struct.Header
    },
    Practitioner_info_modify: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_PRACTITIONER_UPDATE,
      struct: ns.Struct.Practitioner_info_modify,
      response: ns.Struct.Header
    },
    Practitioner_info_delete: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_PRACTITIONER_DELETE,
      struct: ns.Struct.Practitioner_info_delete,
      response: ns.Struct.Header
    },
    Get_car_photo_id: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_GET_CAR_PHOTO_ID,
      struct: ns.Struct.Get_car_photo_id,
      response: ns.Struct.Get_car_photo_id_r
    },
    Get_car_photo_data: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_GET_CAR_PHOTO_DATA,
      struct: ns.Struct.Get_car_photo_data,
      response: ns.Struct.DSHeader
    },
    Car_history_photos: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_QUERY_HISTORY_PHOTO,
      struct: ns.Struct.Car_history_photos,
      response: ns.Struct.Car_history_photos_r
    },
    Check_sentry: {//查岗
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_CHECK_SENTRY,
      struct: ns.Struct.Check_sentry,
      response: ns.Struct.Header
    },
    Voice_monitor: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_MSG_VOICE_MONITOR,
      struct: ns.Struct.Voice_monitor,
      response: ns.Struct.Header
    },
    Drive_recoder: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_MSG_DRIVE_RECODER,
      struct: ns.Struct.Drive_recoder,
      response: ns.Struct.Drive_recoder_r
    },
    Drive_recoder_detail: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_MSG_DRIVE_RECODER_DETAIL,
      struct: ns.Struct.Drive_recoder_detail,
      response: ns.Struct.Driver_info
    },
    DateAreaVehicleList: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_DATE_AREA_VEHICLE,
      struct: ns.Struct.DateAreaVehicleList,
      response: ns.Struct.DateAreaVehicleList_r,
      item: ns.Struct.DateAreaItem
    },
    ComputerInfo: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_COMPUTER_INFO,
      struct: ns.Struct.ComputerInfo,
      response: ns.Struct.ComputerInfo_r
    },
    ComputerDiskInfo: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_COMPUTER_DISK_INFO,
      struct: ns.Struct.ComputerDiskInfo,
      response: ns.Struct.ComputerDiskInfo_r
    },
    ComputerServiceInfo: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_COMPUTER_SERVICE_INFO,
      struct: ns.Struct.ComputerServiceInfo,
      response: ns.Struct.ComputerServiceInfo_r
    },
    //SuperviseData: {
    //    command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
    //    subcmd: ns.Subcmd.SUBCMD_WARN_URGE_TODO_REQ,
    //    struct: ns.Struct.SuperviseData,
    //    response: ns.Struct.SuperviseData_r
    //},
    //SuperviseResponse: {
    //    command: ns.Command.CMD_PLATFORM,
    //    subcmd: ns.Subcmd.SUBCMD_WARN_URGE_TODO_REQ,
    //    struct: ns.Struct.SuperviseResponse,
    //    response: ns.Struct.SuperviseResponse_r
    //},
    WarnInfoRequest: {
      command: ns.Command.CMD_PLATFORM,
      subcmd: ns.Subcmd.SUBCMD_ENABLE_USERWARN_PUSH,
      struct: ns.Struct.WarnInfoRequest,
      response: ns.Struct.Header
    },
    SuperviseRequest: {
      command: ns.Command.CMD_ADMIN,
      subcmd: ns.Subcmd.SUBCMD_WARN_URGE_TODO_REQ,
      struct: ns.Struct.SuperviseRequest,
      response: ns.Struct.SuperviseRequest_R
    },

    //WarnOverSpeed: {
    //    command: ns.Command.CMD_PLATFORM,
    //    subcmd: ns.Subcmd.GOV_ALARM_WarnOverSpeed,
    //    struct: ns.Struct.Header,
    //    response: ns.Struct.WarnOverSpeed
    //},
    //WarnNightAbnormalMove: {
    //    command: ns.Command.CMD_PLATFORM,
    //    subcmd: ns.Subcmd.GOV_ALARM_WarnNightAbnormalMove,
    //    struct: ns.Struct.Header,
    //    response: ns.Struct.WarnNightAbnormalMove
    //},
    //WarnFatigue: {
    //    command: ns.Command.CMD_PLATFORM,
    //    subcmd: ns.Subcmd.GOV_ALARM_WarnFatigue,
    //    struct: ns.Struct.Header,
    //    response: ns.Struct.WarnFatigue
    //},
    //WarnInfoTable: {
    //    command: ns.Command.CMD_PLATFORM,
    //    subcmd: ns.Subcmd.SUBCMD_WARN_ADPT_INFO,
    //    struct: ns.Struct.WarnInfoTable,
    //    response: ns.Struct.WarnInfoTable_R
    //},
    WarnDealResult: {
      command: ns.Command.CMD_PLATFORM,
      subcmd: ns.Subcmd.SUBCMD_WARN_ADPT_TODO_INFO,
      struct: ns.Struct.WarnDealResult,
      response: ns.Struct.WarnDealResult_r
    },
    WeatherTrack: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_WEATHER_TEACK,
      struct: ns.Struct.WeatherTrack,
      response: ns.Struct.Header
    },
    Check_sentry_answer: {//行业查岗回复
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_CHECK_SENTRY_ANSWER,
      struct: ns.Struct.Check_sentry_answer,
      response: ns.Struct.Check_sentry_answer
    },
    CheckSentry_Setting: {//平台自动查岗配置
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_CHECK_SENTRY_SETTING,
      struct: ns.Struct.CheckSentry_Setting,
      response: ns.Struct.Header
    },
    Info_Publish_Request: {//请求信息发布
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_INFO_PUBLISH_REQUEST,
      struct: ns.Struct.Info_Publish_Request,
      response: ns.Struct.Header
    },
    Info_Publish: {//信息发布
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_INFO_PUBLISH_SEND,
      struct: ns.Struct.Info_Publish,
      response: ns.Struct.Header
    },
    HistoryExport: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSETS | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_NORMAL_EXPORT,
      struct: ns.Struct.HistoryExport,
      response: ns.Struct.HistoryExport_R
    },
    Info_Publish_Reply: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_INFO_PUBLISH_REPLY,
      struct: ns.Struct.Info_Publish_Reply,
      response: ns.Struct.Header
    },
    AlertZone_ADD: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_AlertZone_ADD,
      struct: ns.Struct.AlertZone_ADD,
      response: ns.Struct.Header
    },
    AlertZone_DEL: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_AlertZone_DEL,
      struct: ns.Struct.AlertZone_DEL,
      response: ns.Struct.Header
    },
    AlertGraphZone_ADD: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_AlertGraphZone_ADD,
      struct: ns.Struct.AlertGraphZone_ADD,
      response: ns.Struct.Header,
      item: ns.Struct.AlertGraphZone_Point
    },
    AlertGraphZone_DEL: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_AlertGraphZone_DEL,
      struct: ns.Struct.AlertGraphZone_DEL,
      response: ns.Struct.Header
    },
    SendPlatformMsg: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RECORDSEHR | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.SUBCMD_SEND_PLATFORM_MSG,
      struct: ns.Struct.SendPlatformMsg,
      response: ns.Struct.Header
    },
    MultiVehicleTrack: {
      command: ns.Command.CMD_ADMIN | ns.Command.CMD_RESPONSE,
      subcmd: ns.Subcmd.GOV_VEHICLE_TEACK,
      struct: ns.Struct.MultiVehicleTrack,
      response: ns.Struct.Header,
      item: ns.Struct.SingleVehicleId
    },
  }
  function addFunction(bag,className) {
    bag.toString = function () {
      return className;
    }
  }
  for (var item in ns.DataBag) {
    addFunction(ns.DataBag[item], item);
  }
  ns.getDataBagBySubcmd = function (subcmd) {
    for (var item in ns.DataBag) {
      if (ns.DataBag[item].subcmd == subcmd) {
        return ns.DataBag[item];
      }
    }
    return null;
  }
}(WSData);

+function (ns) {
  ns.CreateDataBag = function (dataBag) {
    var obj = new dataBag.struct();
    obj.setCommandH(dataBag.command);
    obj.setSubcmdH(dataBag.subcmd);
    return obj;
  };
}(WSData);
