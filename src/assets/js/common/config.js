/**
 * Created by jessietang on 2017/6/24.
 */
/*初始化生产环境  或者  正式环境*/
const config = () => {
  let rootSrc;
  if (process.env.NODE_ENV !== 'production') { //生产环境 (由于本地没有接口等，所以利用浏览器跨域访问线上的接口)
    rootSrc = {
      api: 'http://125.71.30.136/AppWebApi/'
    }
  } else { //正式环境
    rootSrc = {
      //api:`http://125.71.30.136/AppWebApi/`
      api:`http://${window.location.host}/AppWebApi/`
    }
  }
  window.rootSrc = rootSrc
}

config()
