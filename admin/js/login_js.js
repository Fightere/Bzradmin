$(document).ready(function(){
    $(".login").submit(function(){
        login();
        return false;
        });
});

function login(){
  var user = $("#username").val();

  var pass = $("#password").val();

  if (user == ""){
      alert("请输入登录用户名");
      $("#username").focus();
      return false;
  }
  if(pass == ""){
      alert("请输入登录密码");
      $("#password").focus();
      return false;
  }
  $.ajax({
      type: "POST",
      url: "../php/login.php",
      data: "username=" + user + "&password=" + pass,
      success: function(msg){
        //alert(msg);
        if(msg == 1){
            setTimeout("location='index.html'",0);
            //$("#confirm").text("登录成功，欢迎" + user + "回来！正在进入你的空间");
        }else {
            alert("没有此用户或者密码不正确！");
        }
      }
  });
}