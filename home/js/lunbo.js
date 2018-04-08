$(function(){
  var c = 0;

  function run(){
    c++
    c = (c==7)?0:c;

    //让c号图片显示，兄弟图片隐藏
    $("#lunbo img").eq(c).fadeIn(1000).siblings('img').fadeOut(1000);

    //让c号li变红
    $("#lunbo ul li").eq(c).css({'background':'#b20000'}).siblings('li').css({'background':'#DDDDDD'});
  }

  //设置定时器，自动轮播
  var timer = setInterval(run,2000);

  //给li加入鼠标移入事件
  $("#lunbo ul li").mouseenter(function(){
    var jqthis = $(this);

    //停止计时器
    clearInterval(timer);

    tt = setTimeout(function(){
      //停止计时器
      clearInterval(timer);

      //获得当前移入的li的序号
      c = jqthis.index();

      //让c号图片显示，兄弟图片隐藏
      $("#lunbo img").eq(c).stop().fadeIn(1000).siblings('img').stop().fadeOut(1000);

      //让c号li变红
      $("#lunbo ul li").eq(c).css({'background':'#b20000'}).siblings('li').css({'background':'#DDDDDD'});
    },100)


  })

  //鼠标移出事件
  $("#lunbo ul li").mouseleave(function(){
    //清理
    clearTimeout(tt);

    //恢复计时器
    timer = setInterval(run,2000);

  })
})