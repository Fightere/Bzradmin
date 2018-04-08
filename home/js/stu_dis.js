$(function(){
  AJAX(0);

  function AJAX(page){
    //显示列表
    $.get('../php/stu_dis.php',{p:page,action:'list'},function(data){

      var arr = JSON.parse(data);

      var str = '',spans = '<tr><td colspan="4">';

      for(var i = 2;i <= arr.length-1;i++){
        str += '<tr>';
        str += '<td><a id="record" class="r'+arr[i]['id']+'" href="javascript:void(0);">'+ arr[i]['student_name'] +'</a></td>';
        str += '<td>'+ arr[i]['student_classname'] +'</td>';
        str += '<td>'+ arr[i]['student_xh'] +'</td>';
        str += '<td>'+ arr[i]['student_duty'] +'</td>';
        str += '</tr>';
      }

      spans += '<div id="bottompage">';
      spans += '<a id="firstpage" class="p'+page+' bp">首页</a>';
      spans += '<a id="prev" class="p'+page+' bp">上一页</a>';
      spans += '<a class="bq"> <b style="color:#a00000;">'+ ((arr[1] == 0) ? 0 : parseInt(parseInt(page) + 1)) + '</b> / ' + arr[1] +' </a>'
      spans += '<a id="next" class="'+ arr[1] +'p'+page+' bp">下一页</a>';
      spans += '<a id="finalpage" class="p'+arr[1]+' bp">末页</a>';
      spans += '<input type="text" id="yema" style="width:20px;margin-right:5px;border:1px solid blue;">';
      spans += '<a id="tzs" class="p'+arr[1]+' bp">跳转</a></div></td></tr>';

      $('#studisp').html(str);
      $('#stupage').html(spans);
    });
  }

  $('body').on('click', '#firstpage' ,function(){
    AJAX(0);
  });

  $('body').on('click', '#prev' ,function(){
    //alert('xxx');
    var tmp = $(this).attr('class');
    var page = tmp.substring(1);

    page = parseInt(parseInt(page) - 1);

    if(page <= 0){
      page = 0;
    }

    //alert(page);

    AJAX(page);
  });

  $('body').on('click', '#next' ,function(){
    //alert('xxx');
    var tmp = $(this).attr('class');

    var strs= new Array(); //定义一数组
    strs=tmp.split("p"); //字符分割

    var page = strs[1];

    var total = parseInt( parseInt(strs[0]) - 1 );

    //alert(total);

    page = parseInt(parseInt(page) + 1);

    if(page > total){
      page = total;
    }

    AJAX(page);
  });

  $('body').on('click', '#finalpage' ,function(){
    var tmp = $(this).attr('class');
    var page = tmp.substring(1);

    page = parseInt( parseInt(page) - 1 );

    AJAX(page);
  });

  $('body').on('click', '#tzs' ,function(){

    var ym = $("#yema").val();

    var tmp = $(this).attr('class');
    var page = tmp.substring(1);

    if(isNaN(ym) || ym==''){
      alert("请正确输入数字！");
      return false;
    }

    if( (ym < 0) || ( parseInt(ym) > parseInt(page)) ){
      alert("请输入正确的页码！");
      return false;
    }

    ym = parseInt(parseInt(ym) - 1);

    AJAX(ym);

  });

  $("#ser").click(function(){

    var name = $("#namedis").val();

    var xh = $("#xhdis").val();

    $("#studisp").css({'display':'none'});

    $("#stupage").css({'display':'none'});

    $("#studispser").show();

    $("#stupageser").show();

    AJAX2(0,name,xh);

    function AJAX2(page,name,xh){
      //显示列表
      $.get('../php/stu_dis.php',{p:page,name:name,xh:xh,action:'ser'},function(data){

        //alert(data);

        var arr = JSON.parse(data);

        var str = '',spans = '<tr><td colspan="4">';

        for(var i = 2;i <= arr.length-1;i++){
          str += '<tr>';
          str += '<td><a id="record" class="r'+arr[i]['id']+'" href="javascript:void(0);">'+ arr[i]['student_name'] +'</a></td>';
          str += '<td>'+ arr[i]['student_classname'] +'</td>';
          str += '<td>'+ arr[i]['student_xh'] +'</td>';
          str += '<td>'+ arr[i]['student_duty'] +'</td>';
          str += '</tr>';
        }

        spans += '<div id="bottompage">';
        spans += '<a id="firstpage" class="p'+page+' bp">首页</a>';
        spans += '<a id="prev" class="p'+page+' bp">上一页</a>';
        spans += '<a class="bq"> <b style="color:#a00000;">'+ ((arr[1] == 0) ? 0 : parseInt(parseInt(page) + 1)) + '</b> / ' + arr[1] +' </a>'
        spans += '<a id="next" class="'+ arr[1] +'p'+page+' bp">下一页</a>';
        spans += '<a id="finalpage" class="p'+arr[1]+' bp">末页</a>';
        spans += '<input type="text" id="yemas" style="width:20px;margin-right:5px;border:1px solid blue;">';
        spans += '<a id="tzss" class="p'+arr[1]+' bp">跳转</a></div></td></tr>';

        $('#studispser').html(str);
        $('#stupageser').html(spans);
      });
    }

    $('body').on('click', '#firstpage' ,function(){
      name = $("#namedis").val();

      xh = $("#xhdis").val();

      AJAX2(0,name,xh);
    });

    $('body').on('click', '#prev' ,function(){
      //alert('xxx');
      var tmp = $(this).attr('class');
      var page = tmp.substring(1);

      name = $("#namedis").val();

      xh = $("#xhdis").val();

      page = parseInt(parseInt(page) - 1);

      if(page <= 0){
        page = 0;
      }

      //alert(page);

      AJAX2(page,name,xh);
    });

    $('body').on('click', '#next' ,function(){
      //alert('xxx');
      var tmp = $(this).attr('class');

      name = $("#namedis").val();

      xh = $("#xhdis").val();

      var strs= new Array(); //定义一数组
      strs=tmp.split("p"); //字符分割

      var page = strs[1];

      var total = parseInt( parseInt(strs[0]) - 1 );

      //alert(total);

      page = parseInt(parseInt(page) + 1);

      if(page > total){
        page = total;
      }

      AJAX2(page,name,xh);
    });

    $('body').on('click', '#finalpage' ,function(){
      var tmp = $(this).attr('class');
      var page = tmp.substring(1);

      name = $("#namedis").val();

      xh = $("#xhdis").val();

      page = parseInt( parseInt(page) - 1 );

      AJAX2(page,name,xh);
    });

    $('body').on('click', '#tzss' ,function(){

      var ym = $("#yemas").val();

      //alert(ym);

      var name = $("#namedis").val();

      var xh = $("#xhdis").val();

      var tmp = $(this).attr('class');
      var page = tmp.substring(1);

      if(isNaN(ym) || ym==''){
        alert("请正确输入数字！");
        return false;
      }

      if( (ym < 0) || ( parseInt(ym) > parseInt(page)) ){
        alert("请输入正确的页码！");
        return false;
      }

      ym = parseInt(parseInt(ym) - 1);

      AJAX2(ym,name,xh);

    });
  });

  $('body').on('click', '#record' ,function(){

    var tmp = $(this).attr('class');
    var id = tmp.substring(1);
    var meButton = $(this);

    $.get("../php/stu_dis.php",{dataid:id,action:'record'} ,function(data){
      data = eval("("+data+")");

      var str = "";

      str += '<div class="record">';
      str += '<table border="0" align="center" >';
      str += '<caption><h2 style="margin:20px auto;">学生信息</h2></caption>';

      str += '<tr>';
      str += '<td width="100"><font>姓名：</font></td>';
      str += '<td width="140"><font>'+data.student_name+'</font></td>';
      str += '<td width="100"><font>性别：</font></td>';
      str += '<td width="100"><font>'+data.student_sex+'</font></td>';
      str += '<td width="120"><font>出生日期：</font></td>';
      str += '<td width="160"><font>'+data.student_date+'</font></td>';
      str += '<td width="140" rowspan="4"><img src="../../admin/upload/student/'+data.student_pic+'" width="140px" height="160"></td>';
      str += '</tr>';

      str += '<tr>';
      str += '<td><font>籍贯：</font></td>';
      str += '<td colspan="3"><font>'+data.student_place+'</font></td>';
      str += '<td><font>民族：</font></td>';
      str += '<td><font>'+data.student_nation+'</font></td>';
      str += '</tr>';

      str += '<tr>';
      str += '<td><font>手机号：</font></td>';
      str += '<td colspan="2"><font>'+data.student_tel+'</font></td>';
      str += '<td><font>邮箱：</font></td>';
      str += '<td colspan="2"><font>'+data.student_email+'</font></td>';
      str += '</tr>';

      str += '<tr>';
      str += '<td><font>学院：</font></td>';
      str += '<td colspan="2"><font>'+data.student_school+'</font></td>';
      str += '<td><font>专业：</font></td>';
      str += '<td colspan="2"><font>'+data.student_profess+'</font></td>';
      str += '</tr>';

      str += '<tr>';
      str += '<td><font>班级：</font></td>';
      str += '<td colspan="2"><font>'+data.student_classname+'</font></td>';
      str += '<td><font>学号：</font></td>';
      str += '<td colspan="3"><font>'+data.student_xh+'</font></td>';
      str += '</tr>';

      str += '<tr>';
      str += '<td><font>职务：</font></td>';
      str += '<td colspan="2"><font>'+data.student_duty+'</font></td>';
      str += '<td><font>入学时间：</font></td>';
      str += '<td colspan="3"><font>'+data.student_joindate+'</font></td>';
      str += '</tr>';

      str += '<tr>';
      str += '<td><font>大一学分绩：</font></td>';
      str += '<td colspan="2"><font>'+((data.student_score1 != 0) ? data.student_score1 : "未录入")+'</font></td>';
      str += '<td><font>大一名次：</font></td>';
      str += '<td colspan="3"><font>'+((data.student_mc1) ? data.student_mc1 : "未录入")+'</font></td>';
      str += '</tr>';

      str += '<tr>';
      str += '<td><font>大二学分绩：</font></td>';
      str += '<td colspan="2"><font>'+((data.student_score2 != 0) ? data.student_score2 : "未录入")+'</font></td>';
      str += '<td><font>大二名次：</font></td>';
      str += '<td colspan="3"><font>'+((data.student_mc2) ? data.student_mc2 : "未录入")+'</font></td>';
      str += '</tr>';

      str += '<tr>';
      str += '<td><font>大三学分绩：</font></td>';
      str += '<td colspan="2"><font>'+((data.student_score3 != 0) ? data.student_score3 : "未录入")+'</font></td>';
      str += '<td><font>大三名次：</font></td>';
      str += '<td colspan="3"><font>'+((data.student_mc3) ? data.student_mc3 : "未录入")+'</font></td>';
      str += '</tr>';

      str += '<tr>';
      str += '<td><font>大四学分绩：</font></td>';
      str += '<td colspan="2"><font>'+((data.student_score4 != 0) ? data.student_score4 : "未录入")+'</font></td>';
      str += '<td><font>大四名次：</font></td>';
      str += '<td colspan="3"><font>'+((data.student_mc4) ? data.student_mc4 : "未录入")+'</font></td>';
      str += '</tr>';

      str += '<tr valign="top" height="160px">';
      str += '<td><font>获奖记录</font></td>';
      str += '<td colspan="6"><p>'+data.student_prize+'</p></td>';
      str += '</tr>';

      str += '<tr valign="top" height="160px">';
      str += '<td><font>违纪记录</font></td>';
      str += '<td colspan="6"><p>'+data.student_crtiz+'</p></td>';
      str += '</tr>';

      str += '<tr valign="top" height="160px">';
      str += '<td><font>老师评价</font></td>';
      str += '<td colspan="6"><p>'+data.student_message+'</p></td>';
      str += '</tr>';

      str += '</table>';
      str += '</div>';

      $("#change").html(str);

    });
  });

});