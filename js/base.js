$(function(){

  if (typeof isFrontEnv === 'function') {
    if (!isFrontEnv()) {
      //在设计器中添加类名 isFENV
      document.body.classList.add('isFENV');
    }
  }
  if (typeof WOW === 'function') {
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 100,
        live: true
    }).init();
    //  data-wow-delay="0.1s"
  }
  

  function handleScrollBehavior(options) {
    const {
      headerSelector,
      hideClass,
      whiteClass,
      hideThreshold,
      whiteThreshold
    } = options;

    const header = document.querySelector(headerSelector);
    if (!header) {
      console.error('Header element not found:', headerSelector);
      return;
    }
    
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 监听滚动事件
    window.addEventListener('scroll', function() {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // 导航栏隐藏/显示逻辑
      if (currentScrollTop > hideThreshold) {
        if (currentScrollTop > lastScrollTop) {
          // 向下滚动
          header.classList.add(hideClass);
        } else {
          // 向上滚动
          header.classList.remove(hideClass);
        }
      } else {
        // 在顶部阈值内
        header.classList.remove(hideClass);
      }
      lastScrollTop = currentScrollTop;

      // 导航栏背景色切换逻辑
      if (currentScrollTop > whiteThreshold) {
        header.classList.add(whiteClass);
      } else {
        header.classList.remove(whiteClass);
      }
    });
  }

    // 调用示例
    handleScrollBehavior({
      headerSelector: '.header', //导航栏的CSS选择器
      hideClass: 'hideHeader', // 隐藏导航栏的CSS类
      hideThreshold: 50, //触发隐藏的滚动距离（像素）
      whiteClass: 'white', //导航栏变白的CSS类
      whiteThreshold: 10 //触发变白的滚动距离（像素）
    });

  
    
    if(!placeholderSupport()){
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    };
    if(IsMo()){$('body').addClass('touch_body')}
    //ie浏览器
    if(isIE()){$('html').addClass('isIe');}
    // 获取当前url
    var url_location = window.location.pathname;
    var arr = [];
    arr = url_location.split('/');
})

function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}
function scrollT($Dom){
    if($Dom.offset()){
      if($(window).scrollTop()+$(window).height()>=$Dom.offset().top+200){
          return true;
      }
    }
}
//判断是否Firefox浏览器
function isFirefox(){
    if (navigator.userAgent.indexOf("Firefox") > -1) 
    return true;
    else
    return false;
}
//判断是否IE浏览器
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
    return true;
    else
    return false;
}
function IsPC() { 
   var userAgentInfo = navigator.userAgent; 
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod","iPad Pro","iPad Air"); 
   var flag = true; 
   for (var v = 0; v < Agents.length; v++) { 
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
   } 
   return flag; 
}  

function IsMo() {
    return 'ontouchstart' in document.documentElement || 
           (window.innerWidth < 768 && window.matchMedia("(pointer: coarse)").matches);
}

//鼠标延迟执行事件方法
$.fn.hoverDelay = function(options){
    var defaults = {
        hoverDuring: 200,
        outDuring: 200,
        hoverEvent: function(){
            $.noop();
        },
        outEvent: function(){
            $.noop();    
        }
    };
    var sets = $.extend(defaults,options || {});
    var hoverTimer, outTimer, that = this;
    return $(this).each(function(){
        $(this).on('mouseenter',function(){
            clearTimeout(outTimer);
            hoverTimer = setTimeout(function(){sets.hoverEvent.apply(that)}, sets.hoverDuring);
        });
        $(this).on('mouseleave',function(){
            clearTimeout(hoverTimer);
            outTimer = setTimeout(function(){sets.outEvent.apply(that)}, sets.outDuring);
        });
    });
}
/*
演示事例
$('.header .nav li').hoverDelay({
    hoverEvent: function(){
      $(this).addClass('hover');
    },
    outEvent: function(){
      $(this).removeClass('hover');
    }
  });
*/ 

