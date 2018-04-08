function a(index){
  if(index == 1){

    $.post("notice.html",'',function(data){
      $("#change").html(data);
    });
    //$("#lunbo").css({'display':'none'});
  }else if(index == 2){
    $.post("stu_dis.html",'',function(data){
      $("#change").html(data);
      //$("#stu_list").css({'background':'blue'});
    });
    //$("#lunbo").css({'display':'none'});href="stu_dis.php"href="see_msg.php"
  }else if(index == 3){
    $.post("msg.html",'',function(data){
      $("#change").html(data);
    });
  }else if(index == 4){
    $.post("see_msg.html",'',function(data){
      $("#change").html(data);
    });
  }else if(index == 5){
    $.post("lunbo.html",'',function(data){
      $("#change").html(data);
    });
  }else if(index == 6){
    $.post("mymsg.html",'',function(data){
      $("#change").html(data);
    });
  }else if(index == 7){
    $.post("adminwjx.html",'',function(data){
      $("#change").html(data);
    });
  }
}