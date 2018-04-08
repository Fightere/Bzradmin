$(function(){

  AJAX(0);

  function AJAX(page){
    //显示公告
    $.get('../php/msgjx.php',{p:page},function(data) {
      //alert(data);//0-7 第七个为bj

      var arr = JSON.parse(data);

      var wz = 0;

      for(var bj = 0;bj < arr.length;bj++){
        if(arr[bj] == "|"){
          wz = bj;//那个标记所在的位置，从0开始数
        }
      }

      var str = '',spans = '',reply = '';

      for(var i = 2;i <= wz-1;i++){

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
        str += '<a href="javascript:void(0);" id="replys" class="re'+ arr[i]['id'] +'">回复</a>';
        str += '<div class="admin_msg_line";></div>';
        str += '<div class="admin_msg_reply">';

        for(var j = (wz+1);j < arr.length;j++){
          if(arr[j]['ruid'] == arr[i]['id']){
            str += '<div class="admin_msg_reply_cir">';

            if(arr[j]['rname'] == arr[i]['idnum']){
              str += '<div class="admin_msg_reply_h">';
              str += '<p id="p1" style="margin-left:20px;color:red;">我的回复：</p>';
              str += '<p id="p2">'+ arr[j]['rname'] +'</p>';
              str += '<p id="p3">['+ arr[j]['raddtime'] +']</p>';
              str += '</div>';
            }else{
              str += '<div class="admin_msg_reply_h">';
              str += '<p id="p1" style="margin-left:20px;">回复者编号：</p>';
              str += '<p id="p2">'+ arr[j]['rname'] +'</p>';
              str += '<p id="p3">['+ arr[j]['raddtime'] +']</p>';
              str += '</div>';
            }



            str += '<div class="admin_msg_line"></div>';

            str += '<div class="admin_msg_reply_c">';
            str += arr[j]['rcontent'];
            str += '</div>';

            str += '</div>';
          }
        }

        //str += '<p>暂时无人回复</p>';

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

      $('#see_msg_con_adminjx').html(str);
      $('#see_msg_page_adminjx').html(spans);
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

  $('body').on('click', '#replys' ,function(){

    var tmp = $(this).attr('class');
    var id = tmp.substring(2);
    var meButton = $(this);

    var reply = prompt("请输入评论内容：","");

    replys = reply;

    if(replys != null & replys != ''){

      $.get('../php/reply.php', {dataid:id,areply:replys} ,function(data) {
        if(data == 1){
          alert("回复成功！");
          AJAX(0);
        }else{
          alert("回复失败！");
        }
      });
    }else{
      alert("回复失败！");
    }

  });

});