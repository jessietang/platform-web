/// <reference path="WebSocket.js" />
/// <reference path="WSData.js" />
/// <reference path="../Base/Data.js" />

var loginDone = function (userInfo) {
  CurContext.setUserIndex(userInfo.getIndex());
  triggerEvent("ondone", userInfo.getWSObject());
}

var wsClose = function () {
  triggerEvent("onclose");
}

function response(byteData, dataBag) {
  if (dataBag.response != null) {
    var head = new WSData.Struct.Header();
    var reader = new streamReader(byteData, '');
    reader.reset();
    reader.setFormat(head.getFormat());
    head.setData(reader.readToEnd());

    var data = new dataBag.response();
    var ret;
    if (data.toString() == "Header") {
      reader.reset();
      ret = getResponseData_Fill(reader, head);
    }
    else if ((head.getCommandH() & WSData.Command.CMD_RESPONSE) == WSData.Command.CMD_RESPONSE) {
      ret = getResponseData(data, head, reader);
    }
    else{
      ret = getResponseData(data, head, reader);
    }
    triggerEvent("WSReply", {
      structName: (new dataBag.struct()).toString(),
      response: ret,
      result: head.getResultH(),
      trace: head.getTraceH(),
      device: head.getDeviceH(),
      envH: head.getEnvH()
    });

  }
}

function unResponse(byteData, dataBag) {
  var head = new WSData.Struct.Header();
  var reader = new streamReader(byteData, '');
  reader.reset();
  reader.setFormat(head.getFormat());
  head.setData(reader.readToEnd());
  var eventName, struct, data;
  switch (head.getSubcmdH()) {

    //踢下线通知
    case WSData.Subcmd.LOGINOFFLINE:
      eventName = "LoginOffline";
      struct = head;
      reader.reset();
      isReConn = false;
      data = getResponseData_Fill(reader, head);
      break;
    //车辆监管跟踪
    case WSData.Subcmd.GOV_VEHICLE_TEACK_R:
      struct = new WSData.Struct.VehicleTrack_R();
      data = getResponseData(struct, head, reader);
      data["carType"] = head.getFeatureH();
      eventName = "VehicleTrack_R";
      break;
    // 服务监控
    case WSData.Subcmd.SUBCMD_YUNWEI_Minitor:
      struct = new WSData.Struct.YUNWEI_Minitor();
      data = getResponseData(struct, head, reader);
      eventName = "YunWei_Minitor";
      break;
    //安全监管跟踪
    case WSData.Subcmd.SUBCMD_WEATHER_TEACK_R:
      struct = new WSData.Struct.WeatherTrack_R();
      data = getResponseData(struct, head, reader);
      data["carType"] = head.getFeatureH();
      eventName = "Wer_VehicleTrack_R";
      debugger;
      break;
    //获取车辆照片数据
    case WSData.Subcmd.SUBCMD_GET_CAR_PHOTO_DATA:
      //eventName = "GetCarPhoto";
      struct = head;
      data = [];
      var ds = new WSData.Struct.DSHeader();
      reader.setFormat(ds.getFormat());
      ds.setData(reader.readToEnd());
      reader.setEncoding('jpeg');
      for (var i = 0, len = ds.getRowCntS() ; i < len; ++i) {
        var _fmt = ds.getDataLenS();
        reader.setFormat('C' + _fmt);
        data.push(reader.readToEnd());
      }
      eventName = "WSReply";
      struct = new WSData.Struct.Get_car_photo_data();
      break;
    //提取记录仪详细数据
    case WSData.Subcmd.SUBCMD_MSG_DRIVE_RECODER_DETAIL:
      if (head.getFeatureH() == 1) {
        struct = new WSData.Struct.Driver_info();
      } else if (head.getFeatureH() == 2) {
        struct = new WSData.Struct.Realtime_clock();
      } else if (head.getFeatureH() == 3) {
        struct = new WSData.Struct.Accumulated_mile();
      } else if (head.getFeatureH() == 4) {
        struct = new WSData.Struct.Vehicle_coefficient();
      }

      data = getResponseData(struct, head, reader);
      eventName = "WSReply";
      struct = new WSData.Struct.Drive_recoder_detail();
      break;
    case WSData.Subcmd.SUBCMD_HOMEPAGE_UNIT:
      struct = new WSData.Struct.HomePageDataUnit();
      data = getResponseData(struct, head, reader);
      eventName = "HomePageDataUnit";
      break;
    case WSData.Subcmd.SUBCMD_HOMEPAGE_VEHICLE:
      struct = new WSData.Struct.HomePageDataVehicle();
      data = getResponseData(struct, head, reader);
      eventName = "HomePageDataVehicle";
      break;
    case WSData.Subcmd.SUBCMD_HOMEPAGE_ZONE:
      struct = new WSData.Struct.HomePageDataZone();
      data = getResponseData(struct, head, reader);
      eventName = "HomePageDataZone";
      break;
    case WSData.Subcmd.SUBCMD_HOMEPAGE_PLATFORM:
      struct = new WSData.Struct.HomePageDataPlatform();
      data = getResponseData(struct, head, reader);
      eventName = "HomePageDataPlatform";
      break;
    case WSData.Subcmd.SUBCMD_CHECK_SENTRY_RECEIVE:
      struct = new WSData.Struct.Check_sentry_receive();
      data = getResponseData(struct, head, reader);
      eventName = "HomePageCheckSentry";
      break;
    case WSData.Subcmd.GOV_ALARM_WarnOverSpeed:
      struct = new WSData.Struct.WarnOverSpeed();
      data = getResponseData(struct, head, reader);
      eventName = "Alarm_WarnOverSpeed";
      break;
    case WSData.Subcmd.GOV_ALARM_WarnNightAbnormalMove:
      struct = new WSData.Struct.WarnNightAbnormalMove();
      data = getResponseData(struct, head, reader);
      eventName = "Alarm_WarnNightAbnormalMove";
      break;
    case WSData.Subcmd.GOV_ALARM_WarnFatigue:
      struct = new WSData.Struct.WarnFatigue();
      data = getResponseData(struct, head, reader);
      eventName = "Alarm_WarnFatigue";
      break;
    case WSData.Subcmd.SUBCMD_WARN_ADPT_INFO:
      struct = new WSData.Struct.WarnInfoResponse();
      data = getResponseData(struct, head, reader);
      eventName = "Alarm_Response";
      break;
    case WSData.Subcmd.SUBCMD_INFO_PUBLISH_RECEIVE:
      struct = new WSData.Struct.Info_Publish_R();
      data = getResponseData(struct, head, reader);
      eventName = "HomePageInfoPublish";
      break;
    case WSData.Subcmd.SUBCMD_SUPERVISE_RECEIVE:
      struct = new WSData.Struct.Supervise_R();
      data = getResponseData(struct, head, reader);
      eventName = "HomePageSupervise";
      break;
    case WSData.Subcmd.SUBCMD_SUPERVISE_DONE:
      struct = new WSData.Struct.Supervise_Done();
      data = getResponseData(struct, head, reader);
      eventName = "AlarmSuperviseDone";
      break;
    //查岗
    case WSData.Subcmd.SUBCMD_CHECK_SENTRY_R:
      struct = new WSData.Struct.Check_sentry_r();
      data = getResponseData(struct, head, reader);
      eventName = "CHECK_SENTRY_R";
      break;
  }
  if (!eventName)return;
  triggerEvent(eventName, {
    structName: struct.toString(),
    response: data ? data : getResponseData(struct, head, reader),
    result: head.getResultH(),
    trace: head.getTraceH(),
    feature: head.getFeatureH()
  });
}

var getResponseData = function (struct, head, reader) {
  var name = struct.toString();
  var retVal = null;

  if ((head.getCommandH() & WSData.Command.CMD_RECORDSETS) == WSData.Command.CMD_RECORDSETS) {
    retVal = [];
    var ds = new WSData.DataBag.DSHeader.struct();
    reader.setFormat(ds.getFormat());
    ds.setData(reader.readToEnd());

    reader.setFormat(struct.getFormat());
    for (var i = 0, len = ds.getRowCntS() ; i < len; ++i) {
      retVal.push(getResponseData_Fill(reader, name));
    }
  }
  else {
    reader.setFormat(struct.getFormat());
    retVal = getResponseData_Fill(reader, name);
    if (head.getSubcmdH() == WSData.Subcmd.UP_WARN_MSG_ADPT_INFO) {
      retVal.plateId = head.getSourceH();
    }
  }
  return retVal;
}
var getResponseData_Fill = function (reader, structName) {
  var wsObj = (new WSData.Original[structName]()).getWSObject();
  var row = reader.readToEnd();
  var j = 0;
  for (var item in wsObj) {
    wsObj[item] = row[j];
    j++;
  }
  return wsObj;
}

//接收包处理
var recvBagHandle = function (head, byteData) {
  console.info(head.getSubcmdH());
  if (head.getSubcmdH() == WSData.Subcmd.SUBCMD_GET_CAR_PHOTO_DATA
    || head.getSubcmdH() == WSData.Subcmd.SUBCMD_MSG_DRIVE_RECODER_DETAIL
    || head.getSubcmdH() == WSData.Subcmd.SUBCMD_CHECK_SENTRY_RECEIVE) {
    unResponse(byteData);
  }else
  if (head.getSubcmdH() == 998 || head.getSubcmdH() == WSData.DataBag.Ping.subcmd) {
    //console.info("心跳包");
  }
  //else if (head.getSubcmdH() == WSData.Subcmd.UP_WARN_MSG_ADPT_INFO) {
  //    //暂时先过滤报警
  //}
  else {
    var dataBag = WSData.getDataBagBySubcmd(head.getSubcmdH());
    if (dataBag != null) response(byteData, dataBag);
    else unResponse(byteData, dataBag);
  }
}

var getDataBag = function (subcmd) {
  for (var obj in WS.DataBag) {
    if (obj.subcmd == subcmd) {
      return WS.CreateDataBag(obj);
    }
  }
  return null;
}

var bindDataBag = function () {
  // 保存数据
  var _header = new structure.header();
  var _reader = new streamReader(buffer, '');
  var _data = null;
  // 重置指针位置到起始位置
  _reader.reset();
  // 读表头
  _reader.setFormat(_header.getFormat());
  _data = _reader.readToEnd();
  _header.setData(_data);
  if (_header.getResultH() === 0) {
    Gov.MsgAlert.showMsgAlert("操作成功！");
    return false;
  }
  else {
    Gov.MsgAlert.showMsgAlert("操作失败！");
    return false;
  }
}

var handleRecvMsg = function (msg) {
  var header = WS.CreateDataBag(WS.DataBag.Header);
  var reader = new streamReader(msg.data, header.getFormat());
  var data = reader.readToEnd();
  header.setData(data);

  //错误包判断
  if (!recv_bag_error_check(header, reader)) return false;
  //分发包
  var dbag = getDataBag(header.getSubcmdH());
  reply('cars_pz', {
    header: header,
    data: data
  });
  switch (header.getSubcmdH()) {
    case WSData.Subcmd.LOGIN:

      break;
  }
}

var filterObjAttr = function (obj) {
  var retObj = {};
  for (var item in obj) {
    if (typeof obj[item] != 'function'
      && typeof obj[item] != 'undefined') {
      retObj[item] = obj[item];
    }
  }
  return retObj;
}

