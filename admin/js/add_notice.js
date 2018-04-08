function add_notice(){
  var no_name = $("#class").val();

  var intro = $("#intro").val();

  if (no_name == ""){
      alert("名称不能为空！");
      $("#class").focus();
      return false;
  }

  if(no_name.length >20){
    alert("公告名称过长！");
    $("#class").focus();
    return false;
  }

  if(intro == ""){
      alert("内容不能为空！");
      $("#intro").focus();
      return false;
  }

  $.ajax({
      type: "POST",
      url: "../php/add_notice.php",
      data: "name=" + no_name + "&intro=" + intro,
      success: function(msg){
        //alert(msg);
        if(msg == 1){
            alert("添加成功！");
            $("#class").val("");
            $("#intro").val("");
        }else{
            alert("添加失败！");
        }
      }
  });
}

function add_notice_img(){
  var file = $("#img").val();

  if(file.length < 1){
    $.post("../php/add_notice.php",{mess:789},function(data){
      alert("请上传图片！");
      return false;
    });
  }else{
    $.ajaxFileUpload({
      url:'../php/add_notice.php',
      secureuri:false,
      fileElementId:'img',
      dataType:'json',
      success:function(data){
      }
    });
    add_notice();
  }
}