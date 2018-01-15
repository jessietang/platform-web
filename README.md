# platform-web

> 四川省道路运输车辆监管平台

> 主要技术：vue + webpack + baidumap，其中，用vuex来保存一些公共状态，用axios来进行数据请求，用H5仿手淘的移动端布局，用baidu Echart来进行一些图表的展示，用百度地图API来进行地图上的一些操作，如，定位，附近车辆搜索，车辆历史轨迹播放等。

> 主要功能：<br/>

>> 一、首页模块：<br/>
>>>1.附近的车：展示用户所在位置附近车辆以及附近报警车辆<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/near1.png) <br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/near2.png) <br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/alarm1.png) <br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/alarm2.png) <br/>

>>>2.模糊查找：可搜索用户所在位置附近车辆以及附近报警车辆，这里用了autocomplete来进行提示<br/>

>>>3.地图拖动：用户可拖动地图，选择地图上某一个点，然后点击“附近”或者“报警”按钮来在地图上展示相应的搜索结果车辆<br/>

>>>4.定位：用户点击左下角“定位”按钮，可回到当前用户所在位置（这个主要是针对用户拖动了地图后的操作）<br/>

>>>5.具体某个车详细信息展示：搜索某一辆车或者点击地图上某一辆车，可查看该车的详细信息<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/car_detail.png) <br/>

>>>6.历史轨迹播放：搜索某一辆车或者点击地图上某一辆车，可选择某个时间段在地图上播放历史轨迹，点击历史轨迹上的每一个点，可查看该点的车辆的具体信息<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/car_trail.png) <br/>

>> 二、报表模块：<br/>
>>>1.接入平台监管：展示各个接入平台监控的通断情况，点击某一个接入平台，可查看改接入平台的报警与定位详情（baidu echart 折线图展示）<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/report1.png) <br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/report1_detail.png) <br/>

>>>2.在线情况：可选择展示方式（地区、服务商、企业），展示在线数、入网数以及车辆总数。同时可以选择地区、输入企业、服务商等进行查询展示（baidu echart 柱状图展示），点击具体某个柱状图，可查看相应的累计入网详情<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/report2.png) <br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/report2_detail.png) <br/>

>>>3.报警督办统计：用饼图展示报警督办统计情况<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/report3.png) <br/>

>> 三、更多模块：<br/>
>>>1.展示在线平台数、在岗平台数以及平台总数（更多模块还待开发...）<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/statistic.png) <br/>

>> 四、个人信息模块：<br/>
>>>1.个人信息展示<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/info.png) <br/>

>>>2.密码修改<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/password.png) <br/>

>>>3.退出登录<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/login_out.png) <br/>

>> 五、登录模块：<br/>
>>>1.用户登录信息验证，用md5加密法加密，userId,zoneId保存在localStorage里面。（这里开始做的时候，我是把这两个信息放在store里面的，结果在其他页面一直取不到，后来发现vuex刷新以后确实会清空数据，得到的是初始值，所以这个地方，用这种处理方式是不行的。这种一般就用localStorage或者cookie来做就好了。）<br/>
![](https://github.com/jessietang/demo/raw/master/screenshots/login.png) <br/>

>> 六、新增websocket模块，目前主要做了以下功能：
>>>1.账号在别处登录，被迫下线通知
![](https://github.com/jessietang/demo/raw/master/screenshots/websocket.png) <br/>

>>>2.平台的服务器监控
![](https://github.com/jessietang/demo/raw/master/screenshots/monitor.png) <br/>

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

#最终打包输出的文件路径在config/index.js里面配置：'../GovMonitorPlatform/index.html'

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
