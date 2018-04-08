$(function(){
  AJAX(0);

  function AJAX(page){
    //显示列表
    $.get('../php/stu_list.php',{p:page,action:'list'},function(data){

      var arr = JSON.parse(data);

      var str = '',spans = '<tr><td><input type="button" onclick="return confirm(\'你确定要删除这些信息吗？\')" id="delmore" name="dosubmit" value="删除"></td><td colspan="5">';

      for(var i = 2;i <= arr.length-1;i++){
        str += '<tr><td><input type="checkbox" name="id[]" value="' + arr[i]['id'] + '"></td><td>' + arr[i]['student_name'] + '</td><td>' + arr[i]['student_classname'] + '</td><td>' + arr[i]['student_xh'] + '</td><td>' + arr[i]['student_duty'] + '</td><td><a id="del" class="p'+arr[i]['id']+'" href="javascript:void(0);" onclick="return confirm(\'你确定要删除 '+arr[i]['student_name']+' 的信息吗？\')">删除</a>/<a id="mod" class="p'+arr[i]['id']+'" href="javascript:void(0);" >修改</a></td></tr>';
      }

      spans += '<div id="bottompage">';
      spans += '<a id="firstpage" class="p'+page+' bp">首页</a>';
      spans += '<a id="prev" class="p'+page+' bp">上一页</a>';
      spans += '<a class="bq"> <b style="color:#a00000;">'+ ((arr[1] == 0) ? 0 : parseInt(parseInt(page) + 1)) + '</b> / ' + arr[1] +' </a>'
      spans += '<a id="next" class="'+ arr[1] +'p'+page+' bp">下一页</a>';
      spans += '<a id="finalpage" class="p'+arr[1]+' bp">末页</a>';
      spans += '<input type="text" id="yema" style="width:20px;margin-right:5px;border:1px solid blue;">';
      spans += '<a id="tzs" class="p'+arr[1]+' bp">跳转</a></div></td></tr>';

      $('#disp').html(str);
      $('#page').html(spans);
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

  //点击a标签删除
  $('body').on('click','#del',function(){
    var tmp = $(this).attr('class');
    var id = tmp.substring(1);
    var meButton = $(this);

    $.get("../php/stu_list.php",{dataid:id,action:'del'},function(res){
      if(res == 1){
        $(meButton).parent().parent().remove();
        alert("删除成功！");
        AJAX(0);
      }else{
        alert("删除失败 ...");
      }
    });
  });

  //点击button删除
  $('body').on('click','#delmore',function(){
    //alert(123);

    var delsel = new Array();

    $(":checkbox:checked").each(function(){
      delsel[delsel.length] = this.value;
    });

    if(delsel.length <= 0){
      alert("请勾选您要删除的内容！");
      return false;
    }

    idstr = delsel.join();

    $.get("../php/stu_list.php",{id:idstr,action:"delmore"},function(data){

      if(data == 1){
        alert('删除成功！');
        AJAX(0);
      }else{
        alert('删除失败！');
      }
    })
  });

  //修改
  $('body').on('click','#mod',function(){
    var tmp = $(this).attr('class');
    var id = tmp.substring(1);
    var meButton = $(this);

    $.get("../php/stu_list.php",{dataid:id,action:'mod'} ,function(data){
      data = eval("("+data+")");


      var str = "";

      str += '<div class="stu_con">';
      str += '<form class="add_stu"  method="post" enctype="multipart/form-data">';
      str += '<script type="text/javascript" src="../js/add_stu.js"></script>';
      str += '<script type="text/javascript" src="../laydate/laydate.js"></script>';
      str += '<h1 class="h'+id+'">修改学生信息</h1>';

      str += '<label><span>姓名：</span><input id="name" type="text"  name="name" placeholder="请输入您的姓名：" value="'+data.student_name+'" ></label>';

      if(data.student_sex == "男"){
        str += '<label><span>性别：</span><select id="sex" name="sex"><option value="男" selected="selected">男</option><option value="女">女</option></select></label>';
      }else{
        str += '<label><span>性别：</span><select id="sex" name="sex"><option value="男">男</option><option value="女" selected="selected">女</option></select></label>';
      }

      str += '<label><span>出生日期：</span><input id="date" onclick="laydate()" type="text" name="date" placeholder="如：1997-01-01" value="'+data.student_date+'"></label>';
      str += '<label><span>手机号：</span><input id="tel" type="text" name="tel" placeholder="请输入您的手机号码" value="'+data.student_tel+'"></label>';
      str += '<label><span>邮箱：</span><input id="email" type="text" name="email" placeholder="请输入您的邮箱" value="'+data.student_email+'"></label>';
      str += '<label><span>籍贯：</span><input id="place" type="text" name="place" placeholder="如：xx省xx市xx县" value="'+data.student_place+'"></label>';
      str += '<input type="hidden" name="srcimg" value="'+data.student_pic+'">';
      str += '<img width="120" id="stuimg" src="../upload/student/'+data.student_pic+'">';
      str += '<label><span>照片：</span><input type="hidden" name="MAX_FILE_SIZE" value="1000000"><input id="img" type="file" name="img"></label>';
      str += '<label><span>民族：</span><input id="nation" type="text" name="nation" placeholder="如：汉族" value="'+data.student_nation+'" ></label>';
      str += '<label><span>入学时间：</span><input id="join_sch" onclick="laydate()" type="text" name="join_sch" placeholder="如：2012-09-12" value="'+data.student_joindate+'"></label>';
      str += '<label><span>学院：</span><input id="school" type="text" name="school" placeholder="如：控制与计算机工程学院" value="'+data.student_school+'"></label>';
      str += '<label><span>专业：</span><input id="profess" type="text" name="profess" placeholder="如：计算机科学与技术" value="'+data.student_profess+'"></label>';
      str += '<label><span>班级：</span><input id="sclass" type="text" name="class_name" placeholder="如：计科1501" value="'+data.student_classname+'"></label>';
      str += '<label><span>学号：</span><input id="xh" type="text" name="xh" disabled="true" value="'+data.student_xh+'"></label>';

      if(data.student_duty == ""){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value="" selected="selected"></option><option value="班长" >班长</option><option value="学习委员" >学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "班长"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长" selected="selected">班长</option><option value="学习委员" >学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "学习委员"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长">班长</option><option value="学习委员"  selected="selected">学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "心理委员"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长">班长</option><option value="学习委员"  >学习委员</option><option value="心理委员" selected="selected">心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "体育委员"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长">班长</option><option value="学习委员"  >学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" selected="selected">体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "文艺委员"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长">班长</option><option value="学习委员"  >学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" selected="selected">文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "生活委员"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长">班长</option><option value="学习委员"  >学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" selected="selected">生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "治保委员"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长">班长</option><option value="学习委员"  >学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" selected="selected">治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "团支部书记"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长">班长</option><option value="学习委员"  >学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" selected="selected">团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "组织委员"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长">班长</option><option value="学习委员"  >学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" selected="selected">组织委员</option><option value="宣传委员" >宣传委员</option></select></label>';
      }else if(data.student_duty == "宣传委员"){
        str += '<label><span>职务：</span><select id="duty" name="duty" ><option value=""></option><option value="班长">班长</option><option value="学习委员"  >学习委员</option><option value="心理委员" >心理委员</option><option value="体育委员" >体育委员</option><option value="文艺委员" >文艺委员</option><option value="生活委员" >生活委员</option><option value="治保委员" >治保委员</option><option value="团支部书记" >团支部书记</option><option value="组织委员" >组织委员</option><option value="宣传委员" selected="selected">宣传委员</option></select></label>';
      }


      str += '<label><span>一年级学分绩：</span><input id="score_1" type="text" name="score_1" placeholder="请如实填写" value="'+((data.student_score1 != 0) ? data.student_score1 : "未录入")+'"></label>';
      str += '<label><span>一年级名次：</span><input id="mc_1" type="text" name="mc_1" placeholder="如：13/81" value="'+ ((data.student_mc1) ? data.student_mc1 : "未录入") +'"></label>';
      str += '<label><span>二年级学分绩：</span><input id="score_2" type="text" name="score_2" placeholder="请如实填写" value="'+((data.student_score2 != 0) ? data.student_score2 : "未录入")+'"></label>';
      str += '<label><span>二年级名次：</span><input id="mc_2" type="text" name="mc_2" placeholder="如：13/81" value="'+ ((data.student_mc2) ? data.student_mc2: "未录入") +'"></label>';
      str += '<label><span>三年级学分绩：</span><input id="score_3" type="text" name="score_3" placeholder="请如实填写" value="'+((data.student_score3 != 0) ? data.student_score3 : "未录入")+'"></label>';
      str += '<label><span>三年级名次：</span><input id="mc_3" type="text" name="mc_3" placeholder="如：13/81" value="'+ ((data.student_mc3) ? data.student_mc3 : "未录入") +'"></label>';
      str += '<label><span>四年级学分绩：</span><input id="score_4" type="text" name="score_4" placeholder="请如实填写" value="'+((data.student_score4 != 0) ? data.student_score4 : "未录入")+'"></label>';
      str += '<label><span>四年级名次：</span><input id="mc_4" type="text" name="mc_4" placeholder="如：13/81" value="'+ ((data.student_mc4) ? data.student_mc4 : "未录入") +'"></label>';
      str += '<label><span>获奖记录：</span><textarea id="prize" name="prize" value="'+data.student_prize+'" ></textarea></label>';
      str += '<label><span>违纪记录：</span><textarea id="crtiz" name="crtiz" value="'+data.student_crtiz+'"></textarea></label>';
      str += '<label><span>老师评价：</span><textarea id="message" name="message" value="'+data.student_message+'"></textarea></label>';
      str += '<label><span></span><button type="button" onclick="mod_stu_img();" name="dosubmit" class="do_sub">修改</button></label>';

      str += '</form>';
      str += '</div>';
      $("#change").html(str);

    });
  });

});