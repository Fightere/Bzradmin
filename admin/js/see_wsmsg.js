$(function(){

  AJAX(0);

  function AJAX(page){
    //显示公告
    $.get('../php/see_wsmsg.php',{p:page,action:'list'},function(data) {

      var arr = JSON.parse(data);

      var str = '',spans = '<input style="float:left;margin-left:143px;margin-right:10px;width:60px;font-size:15px;color:#a00000; " type="button" onclick="return confirm(\'你确定要把这些留言显示在留言板上吗？\')" id="shtg" name="dosubmit" value="确认">';

      for(var i = 2;i <= arr.length-1;i++){

        str += '<div class="admin_msg_cir">';

        str += '<div class="admin_msg_cir_h">';
        str += '<input id="checkbox" type="checkbox" name="id[]" value="'+arr[i]['id']+'">';
        str += '<p id="p1">'+ arr[i]['title'] +'</p>';
        str += '<p id="p2">'+ arr[i]['name'] +'</p>';
        str += '<p id="p3">'+ arr[i]['email'] +'</p>';
        str += '<p id="p4">['+ arr[i]['addtime'] +']</p>';
        str += '</div>';
        str += '<div class="admin_msg_line"></div>';
        str += '<div class="admin_msg_cir_c">';
        str += arr[i]['content'];
        str += '</div>';

        str += '</div>';

      }

      spans += '<div id="bottompage">';
      spans += '<a id="firstpage" class="p'+page+' bp">首页</a>';
      spans += '<a id="prev" class="p'+page+' bp">上一页</a>';
      spans += '<a class="bq"> <b style="color:#a00000;">'+ ((arr[1] == 0) ? 0 : parseInt(parseInt(page) + 1)) + '</b> / ' + arr[1] +' </a>'
      spans += '<a id="next" class="'+ arr[1] +'p'+page+' bp">下一页</a>';
      spans += '<a id="finalpage" class="p'+arr[1]+' bp">末页</a>';
      spans += '<input type="text" id="yema" style="width:20px;margin-right:5px;border:1px solid blue;">';
      spans += '<a id="tzs" class="p'+arr[1]+' bp">跳转</a></div></td></tr>';

      $('#disp_wsmsg').html(str);
      $('#page_wsmsg').html(spans);
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

  $('body').on('click', '#shtg' ,function(){

    var checksel = new Array();

    $(":checkbox:checked").each(function(){
      checksel[checksel.length] = this.value;
    });

    if(checksel.length <= 0){
      alert("请勾选您要提交的内容！");
      return false;
    }

    idstr = checksel.join();

    $.get("../php/see_wsmsg.php",{id:idstr,action:"change"},function(data){
      if(data == 1){
        alert("提交成功！");
        AJAX(0);
      }else{
        alert("提交失败！");
      }
    });
  });

});