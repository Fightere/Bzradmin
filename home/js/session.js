 $.post("../php/index.php",'',function(data){
    data=eval("("+data+")");
    $("#session").val(data.isLogin);
    $(".hyc #hyc").html(data.name+"&nbsp;&nbsp;");

    var session = $("#session").val();

    if(!(session == 1)){
      setTimeout("location='login.html'",0);
    }
 });