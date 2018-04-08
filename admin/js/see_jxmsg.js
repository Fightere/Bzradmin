$(function(){

  AJAX(0);

  function AJAX(page){
    //显示公告
    $.get('../php/see_jxmsg.php',{p:page},function(data) {

      var arr = JSON.parse(data);

      var str = '',spans = '';

      for(var i = 2;i <= arr.length-1;i++){

        str += '<div class="admin_msg_cir">';

        str += '<div class="admin_msg_cir_h">';
        str += '<p id="p1" style="margin-left:20px;">'+ arr[i]['title'] +'</p>';
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

      $('#disp_jxmsg').html(str);
      $('#page_jxmsg').html(spans);
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

});