//供线程外部使用的数据结构
/// <reference path="../Gov.js" />
Gov.WS = Gov.WS || {};
+function (ns) {
  ns.DataType = {
    'Int8': { name: 'Int8', len: 1 },
    'Int16': { name: 'Int16', len: 2 },
    'Int32': { name: 'Int32', len: 4 },
    'Uint8': { name: 'Uint8', len: 1 },
    'Uint16': { name: 'Uint16', len: 2 },
    'Uint32': { name: 'Uint32', len: 4 },
    'Float32': { name: 'Float32', len: 4 },
    'Float64': { name: 'Float64', len: 8 },
    'Char': { name: 'Char', len: 1 },
    'long': { name: 'long', len: 8 },
    'String': { name: 'String', len: 0 },
    'Array': { name: 'Array', len: 0 },
  };
  ns.Struct = ns.Struct || {};

  var struct = ns.Struct;
  var nType = ns.DataType;

  // 定义数据集
  struct.DSHeader = function () {
    this.dataLenS = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.rowSizeS = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.rowCntS = {
      'value': 0,
      'type': nType.Uint32.name
    };
  };

  struct.Header = function () {
    // 通讯结构包长度(len)
    this.lenH = {
      'value': 0,
      'type': ns.DataType.Uint16.name
    };

    // 通讯流水号(sequence)
    this.traceH = {
      'value': 0,
      'type': ns.DataType.Uint16.name
    };

    // 用户id(source)
    this.sourceH = {
      'value': 0,
      'type': ns.DataType.Uint32.name
    };

    // 主命令(cmd)
    this.commandH = {
      'value': 0,
      'type': ns.DataType.Uint16.name
    };

    // 子命令(subcmd)
    this.subcmdH = {
      'value': 0,
      'type': ns.DataType.Uint16.name
    };

    // 设备号(target)
    this.deviceH = {
      'value': 0,
      'type': ns.DataType.Uint32.name
    };

    //保留值(reserve)
    this.featureH = {
      'value': 0,
      'type': ns.DataType.Uint16.name
    };

    // 通讯结果(result)
    this.resultH = {
      'value': 0,
      'type': ns.DataType.Int16.name
    };

    //对象网络地址(env)
    this.envH = {
      'value': 0,
      'type': ns.DataType.Int32.name
    };

  };

  struct.LoginOffline = function () {
    struct.Header.call(this);
  }

  // 服务监控
  struct.YUNWEI_Minitor = function () {
    this.content = {
      value: 0,
      type: nType.String.name,
      length: 400,
      isEncode: true
    };
  };


  struct.Login = function () {
    // 呼叫父类,目的是为了继承父类的属性,下同
    struct.Header.call(this);

    // 新增加的属性
    this.rand1 = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.name = {
      'value': '',
      'type': nType.String.name,
      'length': 32
    };
    this.ctime = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.rand2 = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.mapIndex = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.token = {
      'value': '',
      'type': nType.String.name,
      'length': 16
    };
  };

  struct.LoginReply = function () {
    struct.Header.call(this);

    this.index = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.owner = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.mask = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.ctime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.pushMode = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.pushRefer = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.nickName = {
      'value': '',
      'type': nType.String.name,
      'length': 32
    };

    this.telephone = {
      'value': '',
      'type': nType.String.name,
      'length': 44
    };

    this.fax = {
      'value': '',
      'type': nType.String.name,
      'length': 44
    };

    this.email = {
      'value': '',
      'type': nType.String.name,
      'length': 44
    };

    this.notes = {
      'value': '',
      'type': nType.String.name,
      'length': 104
    };

    this.verify = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.zone = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.xmax = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.xmin = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.ymax = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.ymin = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.purvive = { // 权限
      'value': 0,
      'type': nType.Uint32.name
    };

    this.status = {
      'value': 0,
      'type': nType.Uint32.name
    };
  }

  struct.VecLastPosition = function () {
    struct.Header.call(this);
  }

  struct.VecLastPosition_R = function () {
    this.platformid = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.platformname = {
      value: 0,
      type: nType.String.name,
      length: 60,
      isEncode: true
    }
    this.platformowner = {
      value: 0,
      type: nType.String.name,
      length: 100,
      isEncode: true
    }
    this.companyid = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.companyname = {
      value: 0,
      type: nType.String.name,
      length: 160,
      isEncode: true
    }
    this.gpsdate = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.gpstime = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.recvdate = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.recvtime = {
      'value': 0,
      'type': nType.Uint32.name
    }

    this.longitude = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.latitude = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.height = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.limitspeed = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.speed = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.boxspeed = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.direction = {
      'value': 0,
      'type': nType.Uint16.name
    }
    this.alarm = {
      'value': 0,
      'type': nType.Uint16.name
    }
    this.status = {
      'value': 0,
      'type': nType.Uint16.name
    }
  }

  struct.Tagplatform_location = function () {
    struct.Header.call(this);
    //平台接入码
    this.gnssCenterID = {
      value: 0,
      type: nType.Int32.name
    };
    //基本信息ID
    this.platformBaseId = {
      value: 0,
      type: nType.Int32.name
    };
    //平台名称
    this.name = {
      value: 0,
      type: nType.String.name,
      length: 64,
      isEncode: true
    };
    //平台类型
    this.type = {
      value: 0,
      type: nType.Int32.name
    };
    //平台所属单位
    this.owner = {
      value: 0,
      type: nType.Int32.name
    };
    //平台登录名
    this.loginCode = {
      value: 0,
      type: nType.Int32.name
    };
    //平台登录口令
    this.loginPass = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    //平台通讯协议版本
    this.protocolVer = {
      value: 0,
      type: nType.Int32.name
    };
    //平台接入上级IP  [IPV4_ADDRESS_LENGTH];
    this.govAddress = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    //平台接入上级Port
    this.govPort = {
      value: 0,
      type: nType.Int32.name
    };
    //平台监听IP [IPV4_ADDRESS_LENGTH]
    this.comAddress = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    //平台监听Port
    this.comPort = {
      value: 0,
      type: nType.Int32.name
    };
    //平台简称
    this.shortName = {
      value: 0,
      type: nType.String.name,
      length: 12,
      isEncode: true
    };
    //平台联系人
    this.contractMan = {
      value: 0,
      type: nType.String.name,
      length: 52,
      isEncode: true
    };
    //平台联系电话
    this.contractTel = {
      value: 0,
      type: nType.String.name,
      length: 52,
      isEncode: true
    };
    //平台开发商
    this.developer = {
      value: 0,
      type: nType.String.name,
      length: 104,
      isEncode: true
    };
    //平台M1值
    this.m1 = {
      value: 0,
      type: nType.Int32.name

    };
    //平台IA1值
    this.ia1 = {
      value: 0,
      type: nType.Int32.name

    };
    //IC1
    this.ic1 = {
      value: 0,
      type: nType.Int32.name

    };
  }

  struct.Tagplatform_location_s = function () {
    //平台接入码
    this.gnssCenterID = {
      value: 0,
      type: nType.Int32.name
    };
    //基本信息ID
    this.platformBaseId = {
      value: 0,
      type: nType.Int32.name
    };
    //平台名称
    this.name = {
      value: 0,
      type: nType.String.name,
      length: 64,
      isEncode: true
    };
    //平台类型
    this.type = {
      value: 0,
      type: nType.Int32.name
    };
    //平台所属单位
    this.owner = {
      value: 0,
      type: nType.Int32.name
    };
    //平台登录名
    this.loginCode = {
      value: 0,
      type: nType.Int32.name
    };
    //平台登录口令
    this.loginPass = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    //平台通讯协议版本
    this.protocolVer = {
      value: 0,
      type: nType.Int32.name
    };
    //平台接入上级IP  [IPV4_ADDRESS_LENGTH];
    this.govAddress = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    //平台接入上级Port
    this.govPort = {
      value: 0,
      type: nType.Int32.name
    };
    //平台监听IP [IPV4_ADDRESS_LENGTH]
    this.comAddress = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    //平台监听Port
    this.comPort = {
      value: 0,
      type: nType.Int32.name
    };
    //平台简称
    this.shortName = {
      value: 0,
      type: nType.String.name,
      length: 12,
      isEncode: true
    };
    //平台联系人
    this.contractMan = {
      value: 0,
      type: nType.String.name,
      length: 52,
      isEncode: true
    };
    //平台联系电话
    this.contractTel = {
      value: 0,
      type: nType.String.name,
      length: 52,
      isEncode: true
    };
    //平台开发商
    this.developer = {
      value: 0,
      type: nType.String.name,
      length: 104,
      isEncode: true
    };
    //平台M1值
    this.m1 = {
      value: 0,
      type: nType.Int32.name

    };
    //平台IA1值
    this.ia1 = {
      value: 0,
      type: nType.Int32.name

    };
    //IC1
    this.ic1 = {
      value: 0,
      type: nType.Int32.name

    };
  }

  struct.HistoryInfo = function () {
    struct.Header.call(this);

    //单位ID
    this.unit = {
      'value': 0,
      'type': nType.Uint32.name
    };

    //车辆ID
    this.device = {
      'value': 0,
      'type': nType.Uint32.name
    };

    //开始日期
    this.qbdate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    //开始时间
    this.qstart = {
      'value': 0,
      'type': nType.Uint32.name
    };

    //结束日期
    this.qedate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    //结束时间
    this.qend = {
      'value': 0,
      'type': nType.Uint32.name
    };

  }

  struct.HistoryInfo_R = function () {

    this.uint = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.device = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.gpsdate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.gpstime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.recvdate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.recvtime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.longitude = { // 6
      'value': 0,
      'type': nType.Int32.name
    };

    this.latitude = {
      'value': 0,
      'type': nType.Int32.name
    };

    this.height = {
      'value': 0,
      'type': nType.Int32.name
    };

    this.speed = {
      'value': 0,
      'type': nType.Int32.name
    };

    this.direction = { // 10
      'value': 0,
      'type': nType.Uint16.name
    };

    this.source = {
      'value': 0,
      'type': nType.Uint16.name
    };

    this.alarm = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.area = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.segment = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.status1 = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.status2 = {
      'value': 0,
      'type': nType.Uint32.name
    };

    //异常类型
    this.iType = {
      'value': 0,
      'type': nType.Uint32.name
    };
    //接入平台信息
    this.platName = {
      'value': 0,
      'type': nType.String.name,
      'length': 60,
      'isEncode': true
    };

    this.position = {
      'value': 0,
      'type': nType.String.name,
      'length': 128,
      'isEncode': true
    };
  }

  struct.Tagplatform_location_add = function () {
    struct.Header.call(this);
    struct.Tagplatform_location.call(this);
  }

  struct.Tagplatform_location_update = function () {
    struct.Header.call(this);
    struct.Tagplatform_location.call(this);
  }

  struct.Tagplatform_location_delete = function () {
    struct.Header.call(this);
  }
  //服务商
  struct.BaseInfo_provider = function () {
    struct.Header.call(this);
    this.providerID = {
      value: 0,
      type: nType.Int32.name
    };
    this.achProviderName = {
      value: 0,
      type: nType.String.name,
      length: 100,
      isEncode: true
    };
    this.achShortName = {
      value: 0,
      type: nType.String.name,
      length: 40,
      isEncode: true
    };
    this.achContractMan = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.achContraceTel = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.achAddress = {
      value: 0,
      type: nType.String.name,
      length: 100,
      isEncode: true
    };
    this.iRecordVType = {
      value: 0,
      type: nType.Int32.name,
    };
    this.isRigister = {
      value: 0,
      type: nType.Int32.name,
    };
    //this.iOperator = {
    //    value: 0,
    //    type: nType.Int32.name
    //};
    //this.iStatus = {
    //    value: 0,
    //    type: nType.Int32.name
    //};

  }

  struct.BaseInfo_provider_s = function () {
    this.providerID = {
      value: 0,
      type: nType.Int32.name
    };
    this.achProviderName = {
      value: 0,
      type: nType.String.name,
      length: 100,
      isEncode: true
    };
    this.achShortName = {
      value: 0,
      type: nType.String.name,
      length: 40,
      isEncode: true
    };
    this.achContractMan = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.achContraceTel = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.achAddress = {
      value: 0,
      type: nType.String.name,
      length: 100,
      isEncode: true
    };
    this.iRecordVType = {
      value: 0,
      type: nType.Int32.name,
    };
    this.isRigister = {
      value: 0,
      type: nType.Int32.name,
    };
    //this.iOperator = {
    //    value: 0,
    //    type: nType.Int32.name
    //};
    //this.iStatus = {
    //    value: 0,
    //    type: nType.Int32.name
    //};
  }

  struct.BaseInfo_provider_add = function () {

    struct.BaseInfo_provider.call(this);
  }

  struct.BaseInfo_provider_update = function () {

    struct.BaseInfo_provider.call(this);
  }

  struct.BaseInfo_provider_delete = function () {
    struct.Header.call(this);
  }

  struct.bs_array = function () {
    this.bs1 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs2 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs3 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs4 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs5 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs6 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs7 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs8 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs9 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs10 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs11 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs12 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs13 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs14 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs15 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs16 = {
      value: 0,
      type: nType.Uint8.name
    };


    this.bs17 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs18 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs19 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs20 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs21 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs22 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs23 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs24 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs25 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs26 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs27 = {
      value: 0,
      type: nType.Uint8.name
    };
    this.bs28 = {
      value: 0,
      type: nType.Uint8.name
    };
  }

  struct.Baseinfo_unit_add = function () {
    struct.Header.call(this);
    this.unitId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.unitname = {
      value: 0,
      type: nType.String.name,
      length: 100,
      isEncode: true
    };
    this.ca = {
      value: 0,
      type: nType.String.name,
      length: 16
    };

    //this.upca = {
    //    value: 0,
    //    type: nType.String.name,
    //    length: 16
    //};
    //this.manca = {
    //    value: 0,
    //    type: nType.String.name,
    //    length: 16
    //};

    this.upunitid = {
      value: 0,
      type: nType.Uint32.name
    };
    this.logicunitid = {
      value: 0,
      type: nType.Uint32.name
    };
    this.role = {
      value: 0,
      type: nType.Uint32.name
    };
    this.zone = {
      value: 0,
      type: nType.Uint32.name
    };

    this.licenseNo = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };

    this.begin = {
      value: 0,
      type: nType.Uint32.name
    };
    this.end = {
      value: 0,
      type: nType.Uint32.name
    };
    this.gnsscenterid = {
      value: 0,
      type: nType.Uint32.name
    };
    //this.transporttype = {
    //    value: 0,
    //    type: nType.Uint32.name,

    //};
    this.address = {
      value: 0,
      type: nType.String.name,
      length: 160,
      isEncode: true
    };
    this.corporation = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.linkman = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.tel = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.bs = {
      value: 0,
      type: nType.Array.name,
      length: 28,
    };
    this.limits = {
      value: 0,
      type: nType.Uint32.name
    };
  };

  struct.Baseinfo_unit_update = function () {
    struct.Header.call(this);
    struct.Baseinfo_unit_add.call(this);
  };

  struct.Baseinfo_unit_delete = function () {
    struct.Header.call(this);
  };

  struct.Baseinfo_unit_synchro = function () {
    struct.Header.call(this);
    this.id = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    this.name = {
      value: 0,
      type: nType.String.name,
      length: 120,
      isEncode: true
    };
    this.number = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    }
  }

  struct.Baseinfo_vehicle = function () {
    struct.Header.call(this);
    this.deviceId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.vin = {
      value: 0,
      type: nType.String.name,
      length: 20
    };
    this.licensePlat = {
      value: 0,
      type: nType.String.name,
      length: 12,
      isEncode: true
    };
    this.plateColor = {
      value: 0,
      type: nType.String.name,
      length: 4,
      isEncode: true
    };
    this.vehicleType = {
      value: 0,
      type: nType.Uint32.name
    };
    this.zone = {
      value: 0,
      type: nType.Uint32.name
    };
    this.gnsscenterId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.unitId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.logicunitid = {
      value: 0,
      type: nType.Uint32.name
    };

    this.optional = {
      value: 0,
      type: nType.Uint32.name
    };
    this.gpspa = {
      value: 0,
      type: nType.Uint32.name
    };
    this.vediopa = {
      value: 0,
      type: nType.Uint32.name
    };
    this.transno = {
      value: 0,
      type: nType.String.name,
      length: 16
    };

    this.begin = {
      value: 0,
      type: nType.Uint32.name
    };
    this.end = {
      value: 0,
      type: nType.Uint32.name
    };
    this.seatton = {
      value: 0,
      type: nType.Uint32.name
    };
    this.motor = {
      value: 0,
      type: nType.String.name,
      length: 40,
      isEncode: true
    };
    this.owner = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.ownertel = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.bs = {
      value: 0,
      type: nType.Array.name,

    };
  }

  struct.Baseinfo_vehicle_add = function () {
    struct.Baseinfo_vehicle.call(this);
  }

  struct.Baseinfo_vehicle_update = function () {
    struct.Baseinfo_vehicle.call(this);
  }

  struct.Baseinfo_vehicle_delete = function () {
    struct.Header.call(this);
  }

  struct.VehicleTrack = function () {
    struct.Header.call(this);
  }

  struct.VehicleTrack_R = function () {
    this.uint = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.device = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.gpsdate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.gpstime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.recvdate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.recvtime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.longitude = { // 6
      'value': 0,
      'type': nType.Int32.name
    };

    this.latitude = {
      'value': 0,
      'type': nType.Int32.name
    };

    this.height = {
      'value': 0,
      'type': nType.Int32.name
    };

    this.speed = {
      'value': 0,
      'type': nType.Int32.name
    };

    this.direction = { // 10
      'value': 0,
      'type': nType.Uint16.name
    };

    this.source = {
      'value': 0,
      'type': nType.Uint16.name
    };

    this.alarm = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.area = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.segment = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.status1 = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.status2 = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.vehicleType = {
      'value': 0,
      'type': nType.Uint32.name
    };
  }

  struct.VehicleCancelTrack = function () {
    struct.Header.call(this);
  }

  struct.OverSpeedConfig = function () {
    struct.Header.call(this);
    //MUINT32  uiStartTime;        //开始时间
    //MUINT32  uiEndTime;          //结束时间
    //MUINT32  uiSpeed;            //速度值
    //MUINT32  uiLimitSpeed;       //限速值
    //MUINT32  uiLastTimeLen;      //持续时长
    //MUINT32  uiDistance;         //起止点距离
    this.uiStartTime = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.uiEndTime = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.uiSpeed = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.uiLimitSpeed = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.uiLastTimeLen = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.uiDistance = {
      'value': 0,
      'type': nType.Uint32.name
    };
  }

  //下发短信
  struct.SendTextMessage = function () {
    struct.Header.call(this);
    // 命令类型
    this.cmd = {
      'value': 0,
      'type': nType.Uint32.name
    };
    // 信息ID		必填
    this.infoId = {
      'value': 0,
      'type': nType.Uint32.name
    };
    // 0/1:紧急/一般	必填
    this.flag = {
      'value': 0,
      'type': nType.Uint32.name
    };
    // 内容长度		必填
    this.dataLen = {
      'value': 0,
      'type': nType.Uint32.name
    };
    // 内容		必填）
    this.content = {
      'value': 0,
      'type': nType.String.name,
      'length': 1024,
      'isEncode': true
    };

  }

  //用户信息
  struct.User_info_add = function () {
    struct.Header.call(this);
    this.userID = {
      value: 0,
      type: nType.Uint32.name
    };
    this.name = {
      value: 0,
      type: nType.String.name,
      length: 24
    };
    this.token = {
      value: 0,
      type: nType.String.name,
      length: 32
    };
    this.nickname = {
      value: 0,
      type: nType.String.name,
      length: 32
    };
    this.telephone = {
      value: 0,
      type: nType.String.name,
      length: 44
    };
    this.fax = {
      value: 0,
      type: nType.String.name,
      length: 44
    };
    this.email = {
      value: 0,
      type: nType.String.name,
      length: 44
    };
    this.imgIndex = {
      value: 0,
      type: nType.Uint32.name
    };
    this.notes = {
      value: 0,
      type: nType.String.name,
      length: 104
    };
    this.zone = {
      value: 0,
      type: nType.Uint32.name
    };
    this.unit = {
      value: 0,
      type: nType.Uint32.name
    };
    this.right = {
      value: 0,
      type: nType.Uint32.name
    };
    this.unitName = {
      value: 0,
      type: nType.Uint32.name
    }
    this.UnitId = {
      value: 0,
      type: nType.Uint32.name
    }
  };

  struct.User_info_modify = function () {
    struct.User_info_add.call(this);
  };

  struct.User_info_delete = function () {
    struct.Header.call(this);
    this.userID = {
      value: 0,
      type: nType.Uint32.name
    };
  }

  //从业人员
  struct.Practitioner_info_add = function () {
    struct.Header.call(this);
    this.practitionerid = {
      value: 0,
      type: nType.Int32.name,
    };
    this.idnumber = {
      value: 0,
      type: nType.String.name,
      length: 20
    };
    this.name = {
      value: 0,
      type: nType.String.name,
      length: 20
    };
    this.filenumber = {
      value: 0,
      type: nType.String.name,
      length: 28
    };
    this.qualificationType = {
      value: 0,
      type: nType.String.name,
      length: 28
    };
    this.qualificationCode = {
      value: 0,
      type: nType.String.name,
      length: 28
    };
    this.tel = {
      value: 0,
      type: nType.String.name,
      length: 20
    };
    this.address = {
      value: 0,
      type: nType.String.name,
      length: 48
    };
    this.validitybegin = {
      value: 0,
      type: nType.Uint32.name
    };
    this.validityend = {
      value: 0,
      type: nType.Uint32.name,
    };
  }

  struct.Practitioner_info_modify = function () {
    struct.Practitioner_info_add.call(this);
  }

  struct.Practitioner_info_delete = function () {
    struct.Header.call(this);
    //this.practitionerid = {
    //    value: 0,
    //    type: nType.Int32.name,
    //};
  }

  //修改密码
  struct.UpdatePassword = function () {
    struct.Header.call(this);
    this.userId = {
      value: 0,
      type: nType.Int32.name
    }
    this.oldPassword = {
      value: 0,
      type: nType.String.name,
      'length': 32
    }
    this.newPassword = {
      value: 0,
      type: nType.String.name,
      'length': 32
    }
  }

  //车辆数据同步
  struct.Baseinfo_veh_synchro = function () {
    struct.Header.call(this);
    this.id = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    this.plate = {
      value: 0,
      type: nType.String.name,
      length: 12,
      isEncode: true
    };
    this.color = {
      value: 0,
      type: nType.String.name,
      length: 4,
      isEncode: true
    };
  }

  //六严禁报表一键导出
  struct.Prohibit_export = function () {
    struct.Header.call(this);
    this.beginDate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.endDate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.vehicleType = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.platformId = {
      'value': 0,
      'type': nType.Uint32.name
    }

    this.status = {
      'value': 0,
      'type': nType.Uint32.name
    }

    this.configStr = {
      'value': 0,
      'type': nType.String.name,
      'length': 128,
      'isEncode': true
    }
  }

  struct.Prohibit_export_r = function () {
    this.fileName = {
      'value': 0,
      'type': nType.String.name,
      'length': 36,
      'isEncode': true
    };
  }
  //普通报表一键导出
  struct.Normal_export = function () {
    struct.Prohibit_export.call(this);
  }

  struct.Normal_export_r = function () {
    struct.Prohibit_export_r.call(this);
  }

  //范围查询 导出
  struct.Range_export = function () {
    struct.Header.call(this);
    this.sDate = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.sTime = {
      'value': 0,
      'type': nType.Uint32.name
    };


    this.eTime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.lon = {
      'value': 0,
      'type': nType.Float64.name
    }

    this.lat = {
      'value': 0,
      'type': nType.Float64.name
    }

    this.dis = {
      'value': 0,
      'type': nType.Float64.name,

    }
    this.speed = {
      'value': 0,
      'type': nType.Uint32.name
    }
    this.resName = {
      'value': 0,
      'type': nType.String.name,
      'length': 36,
      'isEncode': true
    };
  }

  struct.Range_export_r = function () {
    this.fileName = {
      'value': 0,
      'type': nType.String.name,
      'length': 36,
      'isEncode': true
    };
  }

  //拍照
  struct.Get_car_photo_id = function () {
    struct.Header.call(this);
    this.camno = {
      'value': 0,
      'type': nType.Int32.name
    };
    this.quality = {
      'value': 0,
      'type': nType.Int32.name
    };
  }

  struct.Get_car_photo_id_r = function () {
    this.uint = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.device = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.gpsdate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.gpstime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.recvdate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.recvtime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.longitude = { // 6
      'value': 0,
      'type': nType.Int32.name
    };

    this.latitude = {
      'value': 0,
      'type': nType.Int32.name
    };

    this.height = {
      'value': 0,
      'type': nType.Int32.name
    };

    this.speed = {
      'value': 0,
      'type': nType.Int32.name
    };

    this.direction = { // 10
      'value': 0,
      'type': nType.Uint16.name
    };

    this.source = {
      'value': 0,
      'type': nType.Uint16.name
    };

    this.alarm = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.area = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.segment = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.status1 = {
      'value': 0,
      'type': nType.Uint32.name
    };

    //图片id
    this.status2 = {
      'value': 0,
      'type': nType.Uint32.name
    };

  }

  struct.Get_car_photo_data = function () {
    struct.Header.call(this);
    this.picId = {
      'value': 0,
      'type': nType.Int32.name
    };
  }

  //查询历史图片列表
  struct.Car_history_photos = function () {
    struct.Header.call(this);

    this.unitId = {
      value: 0,
      type: nType.Int32.name
    };

    this.deviceId = {
      value: 0,
      type: nType.Int32.name
    };

    this.sDate = {
      value: 0,
      type: nType.Int32.name
    };

    this.eDate = {
      value: 0,
      type: nType.Int32.name
    };

    this.sTime = {
      value: 0,
      type: nType.Int32.name
    };

    this.eTime = {
      value: 0,
      type: nType.Int32.name
    };
  };

  // 查询历史图片列表应答
  struct.Car_history_photos_r = function () {
    this.unitId = {
      value: 0,
      type: nType.Int32.name
    };

    this.deviceId = {
      value: 0,
      type: nType.Int32.name
    };

    this.gpsDate = {
      value: 0,
      type: nType.Int32.name
    };

    this.gpsTime = {
      value: 0,
      type: nType.Int32.name
    };

    this.recvDate = {
      value: 0,
      type: nType.Int32.name
    };

    this.recvTime = {
      value: 0,
      type: nType.Int32.name
    };

    this.longitude = {
      value: 0,
      type: nType.Int32.name
    };

    this.latitude = {
      value: 0,
      type: nType.Int32.name
    };

    this.height = {
      value: 0,
      type: nType.Int32.name
    };

    this.speed = {
      value: 0,
      type: nType.Int32.name
    };

    this.direction = {
      value: 0,
      type: nType.Int16.name
    };

    this.source = {
      value: 0,
      type: nType.Int16.name
    };

    this.alarmStatus = {
      value: 0,
      type: nType.Int32.name
    };

    this.area = {
      value: 0,
      type: nType.Int32.name
    };

    this.segment = {
      value: 0,
      type: nType.Int32.name
    };

    this.status1 = {
      value: 0,
      type: nType.Int32.name
    };

    this.status2 = { // 图片id
      value: 0,
      type: nType.Int32.name
    };
  }

  // 查岗
  struct.Check_sentry = function () {
    struct.Header.call(this);
    this.objType = { // 对象类型:平台,单位
      'value': 0,
      'type': nType.Uint32.name
    };

    this.objId = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.question = {
      'value': '',
      'type': nType.String.name,
      'length': 60,
      'isEncode': true
    };

    this.answer = {
      'value': '',
      'type': nType.String.name,
      'length': 60,
      'isEncode': true
    };

    this.batch = {
      'value': 0,
      'type': nType.Uint32.name
    };
  };

  //查岗问题
  struct.Check_sentry_receive = function () {
    // 对象类型
    this.objType = {
      'value': 0,
      'type': nType.Uint32.name
    };
    // 对象ID
    this.objId = {
      'value': '',
      'type': nType.String.name,
      'length': 16,
      'isEncode': true
    };
    // 信息ID
    this.infoId = {
      'value': 0,
      'type': nType.Uint32.name
    };
    // 内容长度
    this.dataLen = {
      'value': 0,
      'type': nType.Uint32.name
    };
    // 内容
    this.content = {
      'value': '',
      'type': nType.String.name,
      'length': 1024,
      'isEncode': true
    };
  };

  //查岗回复
  struct.Check_sentry_answer = function () {
    struct.Header.call(this);
    struct.Check_sentry_receive.call(this);
  };

  //监听
  struct.Voice_monitor = function () {
    struct.Header.call(this);
    //号码长度
    this.len = {
      'value': 0,
      'type': nType.Uint32.name
    };
    //电话
    this.tel = {
      'value': 0,
      'type': nType.String.name,
      'length': 20,
      'isEncode': true
    };
  };

  //行车记录
  struct.Drive_recoder = function () {
    struct.Header.call(this);
    this.typeId = {
      'value': 0,
      'type': nType.Uint32.name
    };
  };

  struct.Drive_recoder_r = function () {
    this.index = {
      value: 0,
      type: nType.Uint32.name
    };

    this.cmdType = {
      value: 0,
      type: nType.Uint32.name
    };

    this.device = {
      value: 0,
      type: nType.Uint32.name
    };

    this.date = {
      value: 0,
      type: nType.Uint32.name
    };

    this.time = {
      value: 0,
      type: nType.Uint32.name
    };
    this.content = {
      'value': 0,
      'type': nType.String.name,
      'length': 1024,
      'isEncode': true
    };
  };

  struct.Drive_recoder_detail = function () {
    struct.Header.call(this);
  }

  // 行车记录仪详细数据相关的东西
  struct.Short_date = function () {
    this.year = {
      value: '',
      type: nType.Uint8.name
    };

    this.month = {
      value: '',
      type: nType.Uint8.name
    };

    this.day = {
      value: '',
      type: nType.Uint8.name
    };

    this.hour = {
      value: '',
      type: nType.Uint8.name
    };

    this.minute = {
      value: '',
      type: nType.Uint8.name
    };
  };

  // 0x01 采集驾驶员代码及对应的机动车驾驶证号码
  struct.Driver_info = function () {
    this.driverNo = {
      value: '',
      type: nType.String.name,
      length: 3,
      isEncode: true
    };

    this.lisenceNo = {
      value: '',
      type: nType.String.name,
      length: 18,
      isEncode: true
    };
  };

  // 0x02 采集记录仪的实时时钟
  struct.Realtime_clock = function () {
    struct.Short_date.call(this);

    this.second = {
      value: '',
      type: nType.Uint8.name
    };
  };

  // 0x03 采集最近360h内的累计行驶里程数据
  struct.Accumulated_mile = function () {
    this.accmile01 = {
      value: '',
      type: nType.Uint8.name
    };

    this.accmile02 = {
      value: '',
      type: nType.Uint8.name
    };

    this.accmile03 = {
      value: '',
      type: nType.Uint8.name
    };

    struct.Short_date.call(this);
  };

  // 0x04 上载车辆特征系数数据
  struct.Vehicle_coefficient = function () {
    this.vc01 = {
      value: '',
      type: nType.Uint8.name
    };

    this.vc01 = {
      value: '',
      type: nType.Uint8.name
    };

    this.vc01 = {
      value: '',
      type: nType.Uint8.name
    };
  };

  // 0x06 上载记录仪的车辆VIN号、车牌号码、车牌分类数据
  struct.vehicle_vin_plate = function () {
    this.vin = {
      value: '',
      type: nType.String.name,
      length: 17,
      isEncode: true
    };

    this.plate = {
      value: '',
      type: nType.String.name,
      length: 12,
      isEncode: true
    };

    this.classify = {
      value: '',
      type: nType.String.name,
      length: 12,
      isEncode: true
    };
  };

  //// 0x08 最近2个日历天内的累计行驶里程
  //// 0x08共用0x03的结构

  //指定时间区域车辆查询
  struct.DateAreaVehicleList = function () {
    struct.Header.call(this);
    this.dateAreaList = {
      value: 0,
      type: nType.Array.name
    }
  }

  struct.DateAreaItem = function () {

    this.id = {
      value: 0,
      type: nType.Int32.name
    };

    this.startDate = {
      value: 0,
      type: nType.Int32.name
    };

    this.startTime = {
      value: 0,
      type: nType.Int32.name
    };

    this.endDate = {
      value: 0,
      type: nType.Int32.name
    };

    this.endTime = {
      value: 0,
      type: nType.Int32.name
    };

    this.northEastlongitude = {
      value: 0,
      type: nType.Int32.name
    };

    this.northEastlatitude = {
      value: 0,
      type: nType.Int32.name
    };

    this.southWestlongitude = {
      value: 0,
      type: nType.Int32.name
    };

    this.southWestlatitude = {
      value: 0,
      type: nType.Int32.name
    };
  }

  struct.DateAreaVehicleList_r = function () {
    //MINT32     ZoneID;     //区域ID
    this.areaId = {
      value: 0,
      type: nType.Int32.name
    };
    //MINT32     iVehicleID; //车辆ID
    this.deviceId = {
      value: 0,
      type: nType.Int32.name
    };
    //char       achPlatNo[16]; //车牌号
    this.plateNumber = {
      value: '',
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    //char       achPlatNoColor[4]; //车牌颜色
    this.plateColor = {
      value: '',
      type: nType.String.name,
      length: 4,
      isEncode: true
    };
    //char       achZone[80]; //所属地区
    this.zoneName = {
      value: '',
      type: nType.String.name,
      length: 80,
      isEncode: true
    };
    //char       achCompany[80]; //所属企业
    this.companyName = {
      value: '',
      type: nType.String.name,
      length: 80,
      isEncode: true
    };
    //MINT32     EnterDate;  //进入日期
    this.enterDate = {
      value: 0,
      type: nType.Int32.name
    };
    //MINT32     EnterTime;  //进入时间
    this.enterTime = {
      value: 0,
      type: nType.Int32.name
    };
    //MINT32     LeaveDate;  //离开日期
    this.leaveDate = {
      value: 0,
      type: nType.Int32.name
    };
    //MINT32     LeaveTime;  //离开时间
    this.leaveTime = {
      value: 0,
      type: nType.Int32.name
    };


  }

  //主机信息
  struct.ComputerInfo = function () {
    struct.Header.call(this);
  }
  //主机信息
  struct.ComputerInfo_r = function () {
    //忽略该字段
    this.start = {
      value: 0,
      type: nType.Uint32.name
    }
    //Cpu使用率
    this.CpuUse = {
      value: 0,
      type: nType.Uint32.name
    }
    //内存使用率
    this.MemoryUse = {
      value: 0,
      type: nType.Uint32.name
    }
    //Cpu数量
    this.CpuNumber = {
      value: 0,
      type: nType.Uint32.name
    }
    //获取主机信息的日期
    this.Date = {
      value: 0,
      type: nType.Uint32.name
    }
    //获取主机信息的时间
    this.Time = {
      value: 0,
      type: nType.Uint32.name
    }
    //物理内存大小
    this.MemorySize = {
      value: 0,
      type: nType.Uint32.name
    }
    //虚拟内存大小
    this.VirtualMemorySize = {
      value: 0,
      type: nType.Uint32.name
    }
    //系统版本
    this.achSysVersion = {
      value: '',
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    //忽略该字段
    this.pchrLocalIp = {
      value: '',
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    //忽略该字段
    this.pchInternetIp = {
      value: '',
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    //系统位数
    this.achSysPlaces = {
      value: '',
      type: nType.String.name,
      length: 8,
      isEncode: true
    };
    //系统语言
    this.achSysLanguage = {
      value: '',
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    //主机名
    this.achHostName = {
      value: '',
      type: nType.String.name,
      length: 80,
      isEncode: true
    };
  }

  //主机信息磁盘信息
  struct.ComputerDiskInfo = function () {
    struct.Header.call(this);
  }

  struct.ComputerDiskInfo_r = function () {
    //磁盘名
    this.achName = {
      value: '',
      type: nType.String.name,
      length: 4,
      isEncode: true
    };
    //磁盘总大小，单位M
    this.Total = {
      value: 0,
      type: nType.Uint32.name
    }
    //磁盘使用空间，单位M
    this.Use = {
      value: 0,
      type: nType.Uint32.name
    }
    //磁盘剩余空间，单位M
    this.Free = {
      value: 0,
      type: nType.Uint32.name
    }
    //磁盘驱动器卷标名称
    this.achVolName = {
      value: '',
      type: nType.String.name,
      length: 40,
      isEncode: true
    };
    //磁盘驱动器卷标序列号
    this.SerialNumber = {
      value: 0,
      type: nType.Uint32.name
    }
    //系统允许的最大文件名长度
    this.MaxLength = {
      value: 0,
      type: nType.Uint32.name
    }
    //文件系统标识
    this.FileSysFlag = {
      value: 0,
      type: nType.Uint32.name
    }
    //文件系统名称
    this.achFileSysName = {
      value: '',
      type: nType.String.name,
      length: 40,
      isEncode: true
    };
  }

  //主机运行服务信息
  struct.ComputerServiceInfo = function () {
    struct.Header.call(this);
  }

  //首页推送数据
  //企业监管
  struct.HomePageDataUnit = function () {
    //客车企业数
    this.bUnitCount = {
      value: 0,
      type: nType.Uint32.name
    }
    //危险品车企业数
    this.dUnitCount = {
      value: 0,
      type: nType.Uint32.name
    }
    //重货车企业数
    this.tUnitCount = {
      value: 0,
      type: nType.Uint32.name
    }
  }
  //车辆监管
  struct.HomePageDataVehicle = function () {
    //月份
    this.month = {
      value: 0,
      type: nType.Uint32.name
    }
    //客车
    this.bBreakCount = {
      value: 0,
      type: nType.Uint32.name
    }
    //危险品车
    this.dBreakCount = {
      value: 0,
      type: nType.Uint32.name
    }
    //重货车
    this.tBreakCount = {
      value: 0,
      type: nType.Uint32.name
    }
  }
  //地区监管
  struct.HomePageDataZone = function () {
    //地区名称
    this.zoneName = {
      type: nType.String.name,
      length: 60,
      isEncode: true
    }
    //地区Id
    this.zoneId = {
      value: 0,
      type: nType.Uint32.name
    }
    //违章数
    this.breakCount = {
      value: 0,
      type: nType.Uint32.name
    }

  }
  //接入平台监管
  struct.HomePageDataPlatform = function () {
    this.platform = {
      value: '',
      type: nType.String.name,
      length: 60,
      isEncode: true
    }
  }

  struct.ComputerServiceInfo_r = function () {
    //服务类型，忽略
    this.Type = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务运行状态，0，不正常；1，正常
    this.Start = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务开启线程数
    this.Thread = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务所在的机器的内存总大小，忽略
    this.TotalMem = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务占用内存大小
    this.Mem = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务所在的机器的虚拟内存总大小，忽略
    this.TotalVirmem = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务虚拟内存数
    this.Virmem = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务CPU占有率
    this.Cpu = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务进程句柄
    this.Pid = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务的优先权
    this.Priority = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务已运行时间
    this.Time = {
      value: 0,
      type: nType.Uint32.name
    }
    //开启服务的用户名
    this.achName = {
      value: '',
      type: nType.String.name,
      length: 40,
      isEncode: true
    };
    //服务的编号
    this.Id = {
      value: 0,
      type: nType.Uint32.name
    }
    //服务的名字
    this.achProcessName = {
      value: '',
      type: nType.String.name,
      length: 64,
      isEncode: true
    };

  }

  //手动督办
  struct.SuperviseData = function () {
    this.deviceId = {
      value: 0,
      type: nType.long.name,
    };
    this.gnssId = {
      value: 0,
      type: nType.long.name,
    };
    this.supervision_Id = {
      value: 0,
      type: nType.long.name,
    };
    this.alarmId = {
      value: 0,
      type: nType.long.name,
    };
    this.warnType = {
      value: 0,
      type: nType.long.name,
    };
    //督办级别
    this.level = {
      value: 0,
      type: nType.long.name,
    };
    //督办人
    this.source = {
      value: 0,
      type: nType.long.name,
    };
  }

  struct.SuperviseData_r = function () {
    this.deviceid = {
      value: 0,
      type: nType.long.name,
    };
    this.supervision_id = {
      value: 0,
      type: nType.long.name,
    };
    this.result = {
      value: 0,
      type: nType.long.name,
    };
    this.alarmId = {
      value: 0,
      type: nType.long.name,
    };
    this.warn_type = {
      value: 0,
      type: nType.long.name,
    };
    this.begin_date = {
      value: 0,
      type: nType.long.name,
    };
    this.begin_time = {
      value: 0,
      type: nType.long.name,
    };
    this.end_date = {
      value: 0,
      type: nType.long.name,
    };
    this.end_time = {
      value: 0,
      type: nType.long.name,
    };
    this.description = {
      value: '',
      type: nType.String.name,
      length: 100,
      isEncode: true
    };
  }

  //督办回应
  struct.SuperviseResponse = function () {
    struct.Header.call(this);
  }

  struct.SuperviseResponse_r = function () {
    struct.SuperviseData_r.call(this);
  }

  //推送报警信息
  struct.WarnInfoTable = function () {
    struct.Header.call(this);
  }

  struct.WarnInfoTable_R = function () {
    this.deviceid = {
      value: 0,
      type: nType.Uint32.name
    };
    this.unitid = {
      value: 0,
      type: nType.Uint32.name
    };
    this.plate = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };

    this.unitname = {
      value: 0,
      type: nType.String.name,
      length: 100,
      isEncode: true

    };
    this.warn_source = {
      value: 0,
      type: nType.Uint32.name,
    };
    this.warn_type = {
      value: 0,
      type: nType.Uint32.name,

    };
    this.date = {
      value: 0,
      type: nType.Uint32.name,
    };
    this.time = {
      value: 0,
      type: nType.Uint32.name,

    };

    this.supervisionId = {
      value: 0,
      type: nType.Uint32.name,

    };
    this.warn_content = {
      value: 0,
      type: nType.String.name,
      length: 512,
      isEncode: true
    };
    //this.warn_startLocation = {
    //    value: 0,
    //    type: nType.String.name,
    //    length: 148,
    //    isEncode: true
    //};
    //this.warn_endLocation = {
    //    value: 0,
    //    type: nType.String.name,
    //    length: 148,
    //    isEncode: true
    //};
    this.dataId = {
      value: 0,
      type: nType.Uint32.name,

    };
  }

  struct.WarnMsgEx = function () {
    this.vehicleId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.unitId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.plate = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    this.unitName = {
      value: 0,
      type: nType.String.name,
      length: 100,
      isEncode: true
    };
    this.warnSource = {
      value: 0,
      type: nType.Uint32.name
    };
    this.warnType = {
      value: 0,
      type: nType.Uint32.name
    };
    this.alarmId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.zoneId = {
      value: 0,
      type: nType.Uint32.name
    };
  }

  struct.WarnOverSpeed = function () {
    struct.WarnMsgEx.call(this);
    this.beginDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.beginTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.topSpeed = {
      value: 0,
      type: nType.Uint16.name
    };
    this.beginLongtitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.beginLatitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endLongtitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endLatitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.rate = {
      value: 0,
      type: nType.Uint16.name
    };
    this.speedLimit = {
      value: 0,
      type: nType.Uint16.name
    };
    this.speed = {
      value: 0,
      type: nType.Uint16.name
    };
    this.driverId = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.driverZone = {
      value: 0,
      type: nType.Uint32.name
    };
  }

  struct.WarnNightAbnormalMove = function () {
    struct.WarnMsgEx.call(this);
    this.beginDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.beginTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.abnormalType = {
      value: 0,
      type: nType.Uint16.name
    };
    this.driverId = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.driverZone = {
      value: 0,
      type: nType.Uint32.name
    };
    this.beginLongtitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.beginLatitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endLongtitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endLatitude = {
      value: 0,
      type: nType.Uint32.name
    };
  }

  struct.WarnFatigue = function () {
    struct.WarnMsgEx.call(this);
    this.beginDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.beginTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.driverId = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.driverZone = {
      value: 0,
      type: nType.Uint32.name
    };
    this.beginLongtitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.beginLatitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endLongtitude = {
      value: 0,
      type: nType.Uint32.name
    };
    this.endLatitude = {
      value: 0,
      type: nType.Uint32.name
    };

  }

  //新督办
  struct.SuperviseRequest=function() {

    struct.Header.call(this);
    this.deviceId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.sourceId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.alarmType = {
      value: 0,
      type: nType.Uint32.name
    };
    this.level = {
      value: 0,
      type: nType.Uint32.name
    };
    this.alarmDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.alarmTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.alarmId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.dealDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.dealTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.dealUser = {
      value: 0,
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    this.dealTel = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.dealEmail = {
      value: 0,
      type: nType.String.name,
      length: 32,
      isEncode: true
    };
    this.contentLength = {
      value: 0,
      type: nType.Uint32.name
    };
    this.alarmContent = {
      value: 0,
      type: nType.String.name,
      length: 512,
      isEncode: true
    };
  }
  struct.SuperviseRequest_R = function () {
    struct.Header.call(this);
  }

  //推送报警处理信息
  struct.WarnDealResult = function () {
    struct.Header.call(this);
  }

  struct.WarnDealResult_r = function () {
    struct.SuperviseData_r.call(this);
  }

  //安全监管设置、取消跟踪
  struct.WeatherTrack = function () {
    struct.Header.call(this);
  }

  struct.WarnInfoRequest = function () {
    struct.Header.call(this);
  }

  struct.WarnInfoResponse = function () {
    this.alarmId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.vehicleId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.alarmType = {
      value: 0,
      type: nType.Uint32.name
    };
    this.isSupervise = {
      value: 0,
      type: nType.Uint32.name
    };
    this.plate = {
      value: "",
      type: nType.String.name,
      length: 16,
      isEncode: true
    };
    this.vehicleType = {
      value: 0,
      type: nType.Uint32.name
    };
    this.zoneName = {
      value: 0,
      type: nType.String.name,
      length: 60,
      isEncode: true
    };
    this.unitId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.zoneId = {
      value: 0,
      type: nType.Uint32.name
    };
    this.unitName = {
      value: 0,
      type: nType.String.name,
      length: 200,
      isEncode: true
    };
    this.platformName = {
      value: 0,
      type: nType.String.name,
      length: 60,
      isEncode: true
    };
    this.sDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.sTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.eDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.eTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.sLon = {
      value: 0,
      type: nType.Uint32.name
    };
    this.sLat = {
      value: 0,
      type: nType.Uint32.name
    };
    this.eLon = {
      value: 0,
      type: nType.Uint32.name
    };
    this.eLat = {
      value: 0,
      type: nType.Uint32.name
    };
    this.topSpeed = {
      value: 0,
      type: nType.Uint32.name
    };
    this.speedLimit = {
      value: 0,
      type: nType.Uint32.name
    };
    this.overSpeedRate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.level = {
      value: 0,
      type: nType.Uint32.name
    };
    this.source = {
      value: 0,
      type: nType.Uint32.name
    };
    this.superviseLevel = {
      value: 0,
      type: nType.Uint32.name
    };
    this.superviseUser = {
      value: 0,
      type: nType.String.name,
      length: 20,
      isEncode: true
    };
    this.superviseDate = {
      value: 0,
      type: nType.Uint32.name
    };
    this.superviseTime = {
      value: 0,
      type: nType.Uint32.name
    };
    this.tel = {
      value: 0,
      type: nType.String.name,
      length: 40,
      isEncode: true
    };
    this.email = {
      value: 0,
      type: nType.String.name,
      length: 40,
      isEncode: true
    };
    this.result = {
      value: 0,
      type: nType.Uint32.name
    };
    this.bAddress = {
      value: 0,
      type: nType.String.name,
      length: 80,
      isEncode: true
    }
    this.eAddress = {
      value: 0,
      type: nType.String.name,
      length: 80,
      isEncode: true
    }
    this.highWay = {
      value: 0,
      type: nType.Uint32.name
    }
    //是否接驳
    this.shuttleBus = {
      value: 0,
      type: nType.Uint32.name
    }
  }

  //安全监管跟踪推送数据
  struct.WeatherTrack_R = function () {
    struct.VehicleTrack_R.call(this);
  }

  //平台自动查岗配置
  struct.CheckSentry_Setting = function () {
    struct.Header.call(this);
    this.settingID = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.switch = {
      'value': 0,
      'type': nType.Uint16.name
    };
    this.checkType = {
      'value': 0,
      'type': nType.Uint16.name
    };
    this.checkCnt = {
      'value': 0,
      'type': nType.Uint16.name
    };
    this.checkTime = {
      value: '',
      type: nType.String.name,
      length: 128,
      isEncode: true
    };
  };

  //请求信息发布数据
  struct.Info_Publish_Request = function () {
    struct.Header.call(this);
  }

  // 信息发布
  struct.Info_Publish = function () {
    struct.Header.call(this);

    this.id = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.userId = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.zoneId = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.flag = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.startDate = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.startTime = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.endDate = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.endTime = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.status = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.isReply = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.isReplyed = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.content = {
      'value': '',
      'type': nType.String.name,
      'length': 1024,
      'isEncode': true
    };
    this.title = {
      'value': '',
      'type': nType.String.name,
      'length': 1024,
      'isEncode': true
    };
  };

  // 接收信息发布
  struct.Info_Publish_R = function () {

    this.id = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.userId = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.userName = {
      'value': '',
      'type': nType.String.name,
      'length': 20,
      'isEncode': true
    };

    this.zoneId = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.zoneName = {
      'value': '',
      'type': nType.String.name,
      'length': 60,
      'isEncode': true
    };

    this.content = {
      'value': '',
      'type': nType.String.name,
      'length': 1024,
      'isEncode': true
    };



    this.flag = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.startDate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.startTime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.endDate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.endTime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.isReply = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.isReplyed = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.title = {
      'value': '',
      'type': nType.String.name,
      'length': 1024,
      'isEncode': true
    };
  }

  // 消息通知回复
  struct.Info_Publish_Reply = function () {
    struct.Header.call(this);

    this.id = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.replayUserId = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.sendUserId = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.upZoneId = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.startDate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.startTime = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.endDate = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.endTime = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.content = {
      'value': '',
      'type': nType.String.name,
      'length': 1024,
      'isEncode': true
    };
  }

  //接收上级督办数据
  struct.Supervise_R = function () {

    this.warnType = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.warnId = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.level = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.vehicleType = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.unitZone = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.bDate = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.bTime = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.eDate = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.eTime = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.urgDate = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.urgTime = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.urgUserId = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.plate = {
      'value': '',
      'type': nType.String.name,
      'length': 16,
      'isEncode': true
    };
    this.unitZoneName = {
      'value': '',
      'type': nType.String.name,
      'length': 32,
      'isEncode': true
    };
    this.unitName = {
      'value': '',
      'type': nType.String.name,
      'length': 160,
      'isEncode': true
    };
    this.urgUserName = {
      'value': '',
      'type': nType.String.name,
      'length': 32,
      'isEncode': true
    };
    this.urgUserUnit = {
      'value': '',
      'type': nType.String.name,
      'length': 40,
      'isEncode': true
    };
  }

  struct.Supervise_Done = function () {
    this.warnId = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.warnType = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.userZone = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.type = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.level = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.urgUser = {
      'value': '',
      'type': nType.String.name,
      'length': 32,
      'isEncode': true
    };
    this.urgTime = {
      'value': '',
      'type': nType.String.name,
      'length': 20,
      'isEncode': true
    };
    this.tel = {
      'value': '',
      'type': nType.String.name,
      'length': 40,
      'isEncode': true
    };
    this.email = {
      'value': '',
      'type': nType.String.name,
      'length': 40,
      'isEncode': true
    };

  }

  //查岗响应
  struct.Check_sentry_r = function () {
    this.objType = {
      'value': 0,
      'type': nType.Uint32.name
    };

    this.objId = {
      'value': 0,
      'type': nType.Uint32.name
    };
  };

  //历史轨迹一键导出
  struct.HistoryExport = function () {
    struct.HistoryInfo.call(this);
  }

  struct.HistoryExport_R = function () {
    struct.Prohibit_export_r.call(this);
  }

  struct.AlertZone_Data = function () {
    this.alertZoneId = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.zoneId = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.userId = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.type = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.alertZone = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.validityBegin = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.validityEnd = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.status = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.alertZoneName = {
      'value': '',
      'type': nType.String.name,
      'length': 32,
      'isEncode': true
    };
  }

  struct.AlertZone_ADD = function () {
    struct.Header.call(this);
    struct.AlertZone_Data.call(this);
  }

  struct.AlertZone_DEL = function () {
    struct.Header.call(this);
    struct.AlertZone_Data.call(this);
  }

  struct.AlertGraphZone_ADD = function () {
    struct.Header.call(this);
    struct.AlertZone_Data.call(this);
    this.pointList = {
      value: 0,
      type: nType.Array.name
    }
  }

  struct.AlertGraphZone_Point = function () {
    this.alertGraphZoneId = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.posOrder = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.lon = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.lat = {
      'value': 0,
      'type': nType.Uint32.name
    };
  }

  struct.AlertGraphZone_DEL = function () {
    struct.Header.call(this);
    struct.AlertZone_Data.call(this);
  }

  struct.SendPlatformMsg = function () {
    struct.Header.call(this);
    this.obj_type = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.obj_id = {
      'value': '',
      'type': nType.String.name,
      'length': 16,
      'isEncode': true
    };
    this.info_id = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.data_len = {
      'value': 0,
      'type': nType.Uint32.name
    };
    this.content = {
      'value': '',
      'type': nType.String.name,
      'length': 1024,
      'isEncode': true
    };
  }

  //车辆集结
  struct.MultiVehicleTrack = function () {
    struct.Header.call(this);
    this.vehicleList = {
      value: 0,
      type: nType.Array.name
    }
  }

  struct.SingleVehicleId = function () {
    this.vehicleId = {
      'value': 0,
      'type': nType.Uint32.name
    };
  }

  var addFunction = function (struct, className) {
    var proto = struct.prototype;
    proto.toString = function () {
      return className;
    }
    proto.getWSObject = function () {
      var obj = new struct();
      var retObj = {};
      for (var item in obj) {
        if (typeof obj[item] !== 'function')
          retObj[item] = this[item] ? this[item].value : null;
      }
      return retObj;
    }
  }

  for (var item in struct) {
    if (typeof struct[item] === 'function' && struct !== 'command') {
      addFunction(struct[item], item);
    }
  }
}(Gov.WS);
