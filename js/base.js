(function(){
  var EventUtil = {
   addHandler: function(element, type, handler) {
    if(element.addEventListener) {
     element.addEventListener(type, handler, false);
   } else if(element.attachEvent) {
     element.attachEvent("on" + type, handler);
   } else {
     element["on" + type] = handler;
   }
 },
 getEvent: function(event) {
  return event ? event : window.event;
},
getTarget: function(event) {
  return event.target || event.srcElement;
},
preventDefault: function(event) {
  if(event.preventDefault) {
   event.preventDefault();
 } else {
   event.preventDefault = false;
 }
},
removeHandler: function(element, type, handler) {
  if(element.removeLister) {
   element.removeLister(type, hander, false);
 } else if(element.detachEvent) {
   element.detachEvent("on" + type, handler);
 } else {
   element["on" + type] = null;
 }
},
stopPropagation: function(event) {
  if(event.stopPropagation) {
   event.stopPropagation();
 } else {
   event.cancelBubble = ture;
 }
},
getRelatedTatget: function(event) {
  if(event.relatedTarget) {
   return event.relatedTarget;
 } else if(event.toElement) {
   return event.toElement;
 } else if(event.fromElement) {
   return event.fromElement;
 } else {
   return null;
 }
}
};
window.EventUtil=EventUtil;
})(window);
(function(){
  var Tab=function(options){
   var _this=this;
   this.config=this.init(options);
   this.dom=this.getdom(this.config);
   this.bindevent(options,this.dom);
   this.tolerate(options,this.dom);
 };
 Tab.prototype={
   constructor:Tab,
   init:function(options){
               //初始化参数
               var config={};
               config.tab=options.tab;
               config.contains=options.contains;
               config.tolerate=options.tolerate?options.tolerate:1;
               config.event=options.event?options.event:"click";
               config.fn=options.fn?options.fn:null;
               return config;
             },
            //获取dom
            getdom:function(config){
            	var dom={};
            	dom.tabs=document.getElementById(config.tab).children;
            	dom.contains=document.getElementsByClassName(config.contains);
            	return dom;
            },
            //绑定事件
            bindevent:function(options,dom){
            	for(var i=0,len=dom.tabs.length;i<len;i++)
            	{
            		(function(m){
            			EventUtil.addHandler(dom.tabs[m],options.event,function(){
            				for(var i=0,len=dom.tabs.length;i<len;i++)
            				{
            					dom.contains[i].className=options.contains+" dn";
            				}
            				dom.contains[m].className=options.contains;
            				// dom.contains[m].className=options.contains;
            				if(options.fn)
            				{
            					if(options.fn[m].fun)
            						options.fn[m].fun();
            				}
            				return false;
            			})
            		})(i)
            	}
            },
            //默认显示
            tolerate:function(options,dom){
            	var i=options.tolerate-1;
            	dom.contains[i].className=options.contains;
            	if(options.fn)
            	{
            		if(options.fn[i].fun)
            			options.fn[i].fun();
            	}
            }
          }
          window.tab=Tab;
        })(window);

    // var newtab=new tab({
    //      tab:"tab",  //对应选项卡tab集合的id
    //      contains:"contains", //相应页的class
    //      tolerate:1,   //默认显示
    //      event:"click", //默认时间 
    //      fn:[{num:1,fun:function(){
    //         console.log("haha");
    //      }},{},{},{},{}]
    //  });
     //tab选项卡功能 参数1绑定的tab选项卡的id 参数2 绑定的 对应页面的class(不用指定页数自动获取) 默认为 tabs 与 contains 默认选择的页 
  //绑定tab的事件默认为 click事件 (其中带有阻止事件冒泡);
  //对应选项卡选择时的回掉函数 包括(函数防抖功能); 只需要指定页码;
   //注意 括号中的功能等之后实现函数 
   (function(){
    var jsonp = function (url,name,fn) {
    this.url=url;    //获取url
    this.name=name;   //获取请求参数
    this.fn=fn;   //获取回掉函数
    this.js = this.createjsonp();   //创建script jsonp
    this.setjsonp();  //设置script jsonp
    this.putjsonp();  //发送 script jsonp
    this.movejsonp();  //删除script jsonp
  };
  jsonp.prototype = {
    createjsonp:function () {
      var js = document.createElement("script");
      return js;
    },
    setjsonp: function () {
      this.js.src =this.url+"&callback=" +this.name;
      console.log(this.js.src);
    },
    putjsonp:function () {
      var body=document.getElementsByTagName("head")[0];
      body.appendChild(this.js);
    },
    movejsonp:function () {
      var body=document.getElementsByTagName("head")[0];
      body.removeChild(this.js);
    }
  };
  window.Jsonp = jsonp;
})(window);
//  uername:domid,  账号框
//  password:domeid,  密码框
//  submit:domid, 提交框
//  prompt: domclass, 提示框
//  fn:function(){}  登录成功回调函数
(function(){
 var login=function(options){
   _this=this;
   this.dom=this.getdom(options);
   EventUtil.addHandler(this.dom.submit,"click",function(){
     _this.dom.prompt.innerHTML="";
     if(_this.dom.username.value.length==8&&_this.dom.password.value!="")
     {
       _this.sendjsonp({username:_this.dom.username.value,password:_this.dom.password.value},"personlogin");
     }
     if(_this.dom.username.value.length!=8)
     {
      _this.dom.prompt.innerHTML="请输入正确8位学号";
      return;
    }
    if(_this.dom.password.value=="")
    {
      _this.dom.prompt.innerHTML="密码不能为空";
      return;
    }
  });
 }; 
 login.prototype={
  constructor:login,
  getdom:function(options){
    var doms={};
    doms.all=document.getElementById(options.all)
    doms.username=document.getElementById(options.username);
    doms.password=document.getElementById(options.password);
    doms.submit=document.getElementById(options.submit);
    doms.prompt=document.getElementById(options.prompt);
    return doms;
  },
  sendjsonp:function(person,fn)
  {

    var url="http://api.xiyoumobile.com/xiyoulibv2/user/login?username="+person.username+"&password="+person.password;
    var login=new Jsonp(url,"personlogin");
  },
  login_success:function(that)
  {
    console.log(window.sessionid);
    alert("登录成功！");
    that.dom.all.className="dn";
        //成功函数
        var loginup= new Loginup();
      },
      login_fail:function(that)
      {
       if(window.person.Detail=="ACCOUNT_ERROR")
       {
        that.dom.prompt.innerHTML="密码错误";
      }
    }
  };
  window.Login=login;
})(window);
(function(){
  var loginup=function(){
   if(!window.sessionid){
    return ;
  }
  this.sendjsonp();
}
loginup.prototype={
  constructor:loginup,
  sendjsonp:function(){
   var url="http://api.xiyoumobile.com/xiyoulibv2/user/info?session="+window.sessionid;
   var jsonp=new Jsonp(url,"loginupback");
 }
}
window.Loginup=loginup;
})(window);