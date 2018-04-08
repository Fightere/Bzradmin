$.post("../php/index.php",'',function(data){
  data=eval("("+data+")");
  $("#name").val(data.name);
});

function msg(){

  var name = $("#name").val();

  var title = $("#title").val();

  var email = $("#email").val();

  var message = $("#message").val();

  function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
  }

  if (name == ""){
      alert("姓名不能为空！");
      $("#name").focus();
      return false;
  }

  if(name.length > 10){
    alert("姓名过长！");
    $("#name").focus();
    return false;
  }

  if(title == ""){
      alert("标题不能为空！");
      $("#title").focus();
      return false;
  }

  if(title.length > 10){
    alert("标题过长！");
    $("#title").focus();
    return false;
  }

  if (email == ""){
      alert("邮箱不能为空！");
      $("#email").focus();
      return false;
  }

  if(!isEmail(email)){
    alert("邮箱格式不正确！");
    $("#email").focus();
    return false;
  }

  if(message == ""){
      alert("留言不能为空！");
      $("#message").focus();
      return false;
  }

  $.ajax({
      type: "POST",
      url: "../php/msg.php",
      data: "name=" + name + "&title=" + title + "&email=" + email + "&message=" + message,
      success: function(msg){
        if(msg == 1){
            alert("留言成功！\n请等待管理员审核！");

            $("#title").val("");

            $("#email").val("");

            $("#message").val("");
        }else {
            alert("留言失败！");
        }
      }
  });
}