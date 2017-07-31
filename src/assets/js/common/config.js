/**
 * Created by jessietang on 2017/6/24.
 */
/*初始化生产环境  或者  正式环境*/
const config = () => {
  let rootSrc;
  if (process.env.NODE_ENV !== 'production') { //生产环境
    rootSrc = {
      //api: 'http://125.71.30.136:8706/'
      api: 'http://125.71.30.136/AppWebApi'
    }
  } else { //正式环境
    rootSrc = {
      api:`http://125.71.30.136/AppWebApi`
    }
  }
  window.rootSrc = rootSrc
}

config()
