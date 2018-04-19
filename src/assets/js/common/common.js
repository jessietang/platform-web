const crypto = require('crypto');

function toDouble(n){
  return n<10 ? '0'+n : n;
}

const common = {
  MD5_SUFFIX:'hhdHGGH6893$799HHDY83HMNVNUEJndhjs',
  // MD5加密（MD5签名）
  md5: function(str){
    var obj = crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
  },
  // 时间转换
  time2date: function(timestamp){
    var oDate = new Date();
    oDate.setTime(timestamp);
    return oDate.getFullYear() +'-'+ toDouble(oDate.getMonth()+1) +'-'+
      toDouble(oDate.getDate())+' '+toDouble(oDate.getHours())+':'+toDouble(oDate.getMinutes())
      +':'+toDouble(oDate.getSeconds());
  }
};

export {
  common
}
