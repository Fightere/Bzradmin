$(function(){

  AJAX(0);

  function AJAX(page){
    //显示公告
    $.get('../php/notice.php',{p:page,action:'list'},function(data) {

      var arr = JSON.parse(data);

      var str = '',spans = '';

      for(var i = 2;i <= arr.length-1;i++){
        str += '<div class="n_con">';
        str += '<div class="n_pic">';
        str += '<img width="180" height="160" src="../../admin/upload/notice/'+ arr[i]['no_pic'] +'">';
        str += '</div>';

        str += '<div class="n_rig">';
        str += '<div class="n_head">';
        str += '<p>'+ arr[i]['no_name'] +'</p>';
        str += '&nbsp;<p style="font-size:11px;color:#7d7d7d";>发布者：'+ arr[i]['username'] +'</p>';
        str += '</div>';
        str += '<div class="n_line"></div>';

        str += '<div class="n_foot">';
        str += '<div class="time">';
        str += '<p>发布时间：'+ arr[i]['no_time'] +'</p>';
        str += '</div>';

        str += '<div class="n_pa">';
        str += '<p>'+ arr[i]['no_con'].substring(0, 100) +'......';
        str += '&nbsp;&nbsp;<a id="see" class="n'+ arr[i]['id'] +'" href="javascript:void(0)">查看全文</a></p>';
        str += '</div>';

        str += '</div>';
        str += '</div>';
        str += '</div>';

        str += '<div class="n_line"></div>';
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

  $('body').on('click', '#see' ,function(){
    var tmp = $(this).attr('class');
    var id = tmp.substring(1);
    var meButton = $(this);

    $.get("../php/notice.php",{dataid:id,action:'disp'},function(data){
      data = eval("("+data+")");

      function getLocalTime(nS) {
         return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }

      var str = "";

      str += '<div class="dis_no_con">';

      str += '<div class="dis_no_title">';
      str += '<p>'+data.no_name+'</p>';
      str += '</div>';

      str += '<div class="dis_no_date">';
      str += '<p>发表日期：'+ getLocalTime(data.no_time) +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发表者：'+data.username+'</p>';
      str += '</div>';

      str += '<div class="dis_no_pic">';
      str += '<img width="672" height="500" src="../../admin/upload/notice/'+data.no_pic+'">';
      str += '</div>';

      str += '<div class="dis_no_pas">';
      str += '<p>'+data.no_con+'</p>';
      str += '</div>';

      str += '</div>';

      $("#change").html(str);
    });
  });

});