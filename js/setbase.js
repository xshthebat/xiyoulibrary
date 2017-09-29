
var navs=new tab({
     tab:"nav_ul",  //对应选项卡tab集合的id
     contains:"contants", //相应页的class
     tolerate:4,   //默认显示
     event:"click" //默认时间 
});
var home_nav=new tab({
		 tab:"contants_home_nav",  //对应选项卡tab集合的id
     contains:"home_contants", //相应页的class
     tolerate:1,   //默认显示
     event:"click" //默认时间
});
var person_login=new Login({
     all:"login",
     username:"login_input_username",
     password:"login_input_password",
     submit:"login_submit",
     prompt:"login_prompt",
     fn:null
});
function personlogin(result){
     window.person=result;
     if(result.Result){
          window.sessionid=result.Detail;
    person_login.login_success(person_login);
}
    else{
     person_login.login_fail(person_login);
    }
}
function loginupback(result){
     console.log(result);
}

