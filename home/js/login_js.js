$(document).ready(function(){
    $(".login").submit(function(){
        login();
        return false;
        });
});

function login(){
  var user = $("#idnum").val();

  var pass = $("#password").val();

  if (user == ""){
      alert("请输入登录用户名");
      $("#idnum").focus();
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
      data: "idnum=" + user + "&password=" + pass,
      success: function(msg){
        if(msg == 1){
            setTimeout("location='index.html'",0);
            //$("#confirm").text("登录成功，欢迎" + user + "回来！正在进入你的空间");
        }else {
            alert("没有此用户或者密码不正确！");
        }
        //alert(msg);
      }
  });
}