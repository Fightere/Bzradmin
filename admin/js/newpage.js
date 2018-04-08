function a(index){
  if(index == 1){
    $.post("add_notice.html",'',function(data){
      $("#change").html(data);
    });
  }else if(index == 2){
    $.post("add_stu.html",'',function(data){
      $("#change").html(data);
    });
  }else if(index == 3){
    $.post("stu_list.html",'',function(data){
      $("#change").html(data);
    });
  }else if(index == 4){
    $.post("see_jxmsg.html",'',function(data){
      $("#change").html(data);
    });
  }else if(index == 5){
    $.post("see_wsmsg.html",'',function(data){
      $("#change").html(data);
    });
  }else if(index == 6){
    $.post("lunbo.html",'',function(data){
      $("#change").html(data);
    });
  }
}