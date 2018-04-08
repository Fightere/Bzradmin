function add_stu(){
  var name = $("#name").val();

  var sex = $("#sex").val();

  var date = $("#date").val();

  var tel = $("#tel").val();

  var email = $("#email").val();

  var place = $("#place").val();

  var pic = $("#pic").val();

  var nation = $("#nation").val();

  var join_sch = $("#join_sch").val();

  var school = $("#school").val();

  var profess = $("#profess").val();

  var sclass = $("#sclass").val();

  var xh = $("#xh").val();

  var duty = $("#duty").val();

  var score_1 = $("#score_1").val();

  var mc_1 = $("#mc_1").val();

  var score_2 = $("#score_2").val();

  var mc_2 = $("#mc_2").val();

  var score_3 = $("#score_3").val();

  var mc_3 = $("#mc_3").val();

  var score_4 = $("#score_4").val();

  var mc_4 = $("#mc_4").val();

  var prize = $("#prize").val();

  var crtiz = $("#crtiz").val();

  var message = $("#message").val();

  function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
  }

  function isNotDate(date){
    var reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig;
    if(!reg.test(date)){
      return true;
    }else{
      return false;
    }
  }

  if (name == ""){
      alert("姓名不能为空！");
      $("#name").focus();
      return false;
  }

  if(name.length > 4 || name.length < 2){
    alert("姓名不符合规范！");
    $("#name").focus();
    return false;
  }

  if(date == ""){
      alert("出生日期不能为空！");
      $("#date").focus();
      return false;
  }

  if(isNotDate(date)){
    alert("日期格式不正确！");
    $("#date").focus();
    return false;
  }

  if(tel == ""){
      alert("手机号不能为空！");
      $("#tel").focus();
      return false;
  }

  if(tel.length != 11){
    alert("手机号格式不正确！");
    $("#tel").focus();
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

  if(place == "") {
    alert("籍贯不能为空！");
    $("#place").focus();
    return false;
  }

  if(nation == "") {
    alert("民族不能为空！");
    $("#nation").focus();
    return false;
  }

  if(join_sch == ""){
    alert("入学日期不能为空！");
    $('#join_sch').focus();
    return false;
  }

  if(isNotDate(join_sch)){
    alert("日期格式不正确！");
    $("#join_sch").focus();
    return false;
  }

  if(school == ""){
    alert("学院不能为空！");
    $('#school').focus();
    return false;
  }

  if(profess == ""){
    alert("专业不能为空！");
    $('profess').focus();
    return false;
  }

  if(xh == ""){
    alert("学号不能为空！");
    $('#xh').focus();
    return false;
  }

  if(xh.length != 12){
    alert("学号应为12位！");
    $('#xh').focus();
    return false;
  }

  if(mc_1 == ""){
    mc_1 = "未录入";
  }

  if(mc_2 == ""){
    mc_2 = "未录入";
  }

  if(mc_3 == ""){
    mc_3 = "未录入";
  }

  if(mc_4 == ""){
    mc_4 = "未录入";
  }

  if(prize == ""){
    prize = "未录入";
  }

  if(crtiz == ""){
    crtiz = "未录入";
  }

  if(message == ""){
    message = "未录入";
  }

  $.ajax({
      type: "POST",
      url: "../php/add_stu.php",
      data: "name=" + name + "&sex=" + sex + "&date=" + date + "&tel=" + tel + "&email=" + email + "&place=" + place + "&nation=" + nation + "&join_sch=" + join_sch + "&school=" + school + "&profess=" + profess + "&sclass=" + sclass + "&xh=" + xh + "&duty=" + duty + "&score_1=" + score_1 + "&mc_1=" + mc_1 + "&score_2=" + score_2 + "&mc_2=" + mc_2 + "&score_3=" + score_3 + "&mc_3=" + mc_3 + "&score_4=" + score_4 + "&mc_4=" + mc_4 + "&prize=" + prize + "&crtiz=" + crtiz + "&message=" + message,
      success: function(msg){
        if(msg == 1){
            alert("添加成功！");
        }else if(msg == 2){
            alert("学号不能重复！");
        }else{
          alert("添加失败！");
        }
      }
  });
}

function add_stu_img(){

  var file = $("#img").val();

  if(file.length < 1){
    $.post("../php/add_stu.php",{mess:789},function(data){
      alert("请上传图片！");
      return false;
    });
  }else{
    $.ajaxFileUpload({
      url:'../php/add_stu.php',
      secureuri:false,
      fileElementId:'img',
      dataType:'json',
      success:function(data){
      }
    });
    add_stu();
  }
}

function mod_stu0(){

  var tmpid = $("h1").attr("class");

  var img = $("#stuimg")[0].src;

  var id = tmpid.slice("1");

  var name = $("#name").val();

  var sex = $("#sex").val();

  var date = $("#date").val();

  var tel = $("#tel").val();

  var email = $("#email").val();

  var place = $("#place").val();

  var pic = $("#pic").val();

  var nation = $("#nation").val();

  var join_sch = $("#join_sch").val();

  var school = $("#school").val();

  var profess = $("#profess").val();

  var sclass = $("#sclass").val();

  var xh = $("#xh").val();

  var duty = $("#duty").val();

  var score_1 = $("#score_1").val();

  var mc_1 = $("#mc_1").val();

  var score_2 = $("#score_2").val();

  var mc_2 = $("#mc_2").val();

  var score_3 = $("#score_3").val();

  var mc_3 = $("#mc_3").val();

  var score_4 = $("#score_4").val();

  var mc_4 = $("#mc_4").val();

  var prize = $("#prize").val();

  var crtiz = $("#crtiz").val();

  var message = $("#message").val();

  function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
  }

  function isNotDate(date){
    var reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig;
    if(!reg.test(date)){
      return true;
    }else{
      return false;
    }
  }

  if (name == ""){
      alert("姓名不能为空！");
      $("#name").focus();
      return false;
  }

  if(name.length > 4 || name.length < 2){
    alert("姓名不符合规范！");
    $("#name").focus();
    return false;
  }

  if(date == ""){
      alert("出生日期不能为空！");
      $("#date").focus();
      return false;
  }

  if(isNotDate(date)){
    alert("日期格式不正确！");
    $("#date").focus();
    return false;
  }

  if(tel == ""){
      alert("手机号不能为空！");
      $("#tel").focus();
      return false;
  }

  if(tel.length != 11){
    alert("手机号格式不正确！");
    $("#tel").focus();
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

  if(place == "") {
    alert("籍贯不能为空！");
    $("#place").focus();
    return false;
  }

  if(nation == "") {
    alert("民族不能为空！");
    $("#nation").focus();
    return false;
  }

  if(join_sch == ""){
    alert("入学日期不能为空！");
    $('#join_sch').focus();
    return false;
  }

  if(isNotDate(join_sch)){
    alert("日期格式不正确！");
    $("#join_sch").focus();
    return false;
  }

  if(school == ""){
    alert("学院不能为空！");
    $('#school').focus();
    return false;
  }

  if(profess == ""){
    alert("专业不能为空！");
    $('profess').focus();
    return false;
  }

  if(xh == ""){
    alert("学号不能为空！");
    $('#xh').focus();
    return false;
  }

  if(xh.length != 12){
    alert("学号应为12位！");
    $('#xh').focus();
    return false;
  }

  if(mc_1 == ""){
    mc_1 = "未录入";
  }

  if(mc_2 == ""){
    mc_2 = "未录入";
  }

  if(mc_3 == ""){
    mc_3 = "未录入";
  }

  if(mc_4 == ""){
    mc_4 = "未录入";
  }

  if(prize == ""){
    prize = "未录入";
  }

  if(crtiz == ""){
    crtiz = "未录入";
  }

  if(message == ""){
    message = "未录入";
  }

  $.ajax({
      type: "POST",
      url: "../php/mod_stu0.php",
      data: "id=" + id + "&name=" + name + "&img=" + img + "&sex=" + sex + "&date=" + date + "&tel=" + tel + "&email=" + email + "&place=" + place + "&nation=" + nation + "&join_sch=" + join_sch + "&school=" + school + "&profess=" + profess + "&sclass=" + sclass + "&xh=" + xh + "&duty=" + duty + "&score_1=" + score_1 + "&mc_1=" + mc_1 + "&score_2=" + score_2 + "&mc_2=" + mc_2 + "&score_3=" + score_3 + "&mc_3=" + mc_3 + "&score_4=" + score_4 + "&mc_4=" + mc_4 + "&prize=" + prize + "&crtiz=" + crtiz + "&message=" + message,
      success: function(msg){
        if(msg == 1){
            alert("修改成功！");
        }else{
          alert("修改失败！");
        }
      }
  });
}


function mod_stu1(){

  var tmpid = $("h1").attr("class");

  var img = $("#stuimg")[0].src;

  var id = tmpid.slice("1");

  var name = $("#name").val();

  var sex = $("#sex").val();

  var date = $("#date").val();

  var tel = $("#tel").val();

  var email = $("#email").val();

  var place = $("#place").val();

  var pic = $("#pic").val();

  var nation = $("#nation").val();

  var join_sch = $("#join_sch").val();

  var school = $("#school").val();

  var profess = $("#profess").val();

  var sclass = $("#sclass").val();

  var xh = $("#xh").val();

  var duty = $("#duty").val();

  var score_1 = $("#score_1").val();

  var mc_1 = $("#mc_1").val();

  var score_2 = $("#score_2").val();

  var mc_2 = $("#mc_2").val();

  var score_3 = $("#score_3").val();

  var mc_3 = $("#mc_3").val();

  var score_4 = $("#score_4").val();

  var mc_4 = $("#mc_4").val();

  var prize = $("#prize").val();

  var crtiz = $("#crtiz").val();

  var message = $("#message").val();

  function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
  }

  function isNotDate(date){
    var reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig;
    if(!reg.test(date)){
      return true;
    }else{
      return false;
    }
  }

  if (name == ""){
      alert("姓名不能为空！");
      $("#name").focus();
      return false;
  }

  if(name.length > 4 || name.length < 2){
    alert("姓名不符合规范！");
    $("#name").focus();
    return false;
  }

  if(date == ""){
      alert("出生日期不能为空！");
      $("#date").focus();
      return false;
  }

  if(isNotDate(date)){
    alert("日期格式不正确！");
    $("#date").focus();
    return false;
  }

  if(tel == ""){
      alert("手机号不能为空！");
      $("#tel").focus();
      return false;
  }

  if(tel.length != 11){
    alert("手机号格式不正确！");
    $("#tel").focus();
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

  if(place == "") {
    alert("籍贯不能为空！");
    $("#place").focus();
    return false;
  }

  if(nation == "") {
    alert("民族不能为空！");
    $("#nation").focus();
    return false;
  }

  if(join_sch == ""){
    alert("入学日期不能为空！");
    $('#join_sch').focus();
    return false;
  }

  if(isNotDate(join_sch)){
    alert("日期格式不正确！");
    $("#join_sch").focus();
    return false;
  }

  if(school == ""){
    alert("学院不能为空！");
    $('#school').focus();
    return false;
  }

  if(profess == ""){
    alert("专业不能为空！");
    $('profess').focus();
    return false;
  }

  if(xh == ""){
    alert("学号不能为空！");
    $('#xh').focus();
    return false;
  }

  if(xh.length != 12){
    alert("学号应为12位！");
    $('#xh').focus();
    return false;
  }

  if(mc_1 == ""){
    mc_1 = "未录入";
  }

  if(mc_2 == ""){
    mc_2 = "未录入";
  }

  if(mc_3 == ""){
    mc_3 = "未录入";
  }

  if(mc_4 == ""){
    mc_4 = "未录入";
  }

  if(prize == ""){
    prize = "未录入";
  }

  if(crtiz == ""){
    crtiz = "未录入";
  }

  if(message == ""){
    message = "未录入";
  }

  $.ajax({
      type: "POST",
      url: "../php/mod_stu1.php",
      data: "id=" + id + "&name=" + name + "&img=" + img + "&sex=" + sex + "&date=" + date + "&tel=" + tel + "&email=" + email + "&place=" + place + "&nation=" + nation + "&join_sch=" + join_sch + "&school=" + school + "&profess=" + profess + "&sclass=" + sclass + "&duty=" + duty + "&score_1=" + score_1 + "&mc_1=" + mc_1 + "&score_2=" + score_2 + "&mc_2=" + mc_2 + "&score_3=" + score_3 + "&mc_3=" + mc_3 + "&score_4=" + score_4 + "&mc_4=" + mc_4 + "&prize=" + prize + "&crtiz=" + crtiz + "&message=" + message,
      success: function(msg){
        if(msg == 1){
            alert("修改成功！");
        }else{
          alert("修改失败！");
        }
      }
  });
}

function mod_stu_img(){

  var file = $("#img").val();

  if(file.length < 1){
    mod_stu0();
  }else{
    $.ajaxFileUpload({
      url:'../php/mod_stu1.php',
      secureuri:false,
      fileElementId:'img',
      dataType:'json',
      success:function(data){
      }
    });
    mod_stu1();
  }
}