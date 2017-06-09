import '../static/zepto.min.js';
import './style.css';

Zepto(function($) {
  setPageScroll('#container');

  /**
   * 设置滚轮滚动事件，定义容器内的全局变量
   * @param elemId 窗口ID
   */
  function setPageScroll(elemId) {
    const scrollPage = {
      parent: $(elemId),  // 父容器
      count: $(elemId).find('.page').length, // 页面数
      scrolling: false  // 页面是否在滚动
    }
    /*Firefox注册事件*/
    if(document.getElementById(elemId.slice(1)).addEventListener){
      document.getElementById(elemId.slice(1)).addEventListener('DOMMouseScroll', (e) => bindScroll(e, scrollPage), false);
    }
    document.getElementById(elemId.slice(1)).onmousewheel = (e) => bindScroll(e, scrollPage);  //IE/Opera/Chrome
  }

  /**
   * 处理滚动滚动
   * @param e 滚轮滚动事件
   * @param scrollPage 需要滚动的页面对象
   */
  function bindScroll(e, scrollPage) {
    // 当前显示的页面信息
    const currPage = {
      elem: scrollPage.parent.find('.curr'),
      index: scrollPage.parent.find('.curr').data('page'),
      set: function(v) {
        this.elem = $(v);
        this.index = $(v).data('page');
      },
    };

    e = e || window.event;
      if (!scrollPage.scrolling) {
      handleScroll((e.wheelDelta || e.detail) > 0 ? 1 : -1);
    }
    // 处理滚动，判断滚动方向
    function handleScroll(delta) {
      const direc = delta > 0 ? 1 : -1;  // 屏幕滚动方向，1：向上，-1;向下
      if (direc > 0 && currPage.index < scrollPage.count || direc < 0 && currPage.index > 1) {
        scrollPage.scrolling = true;
        moveFunc(direc);
      }
    };

    function moveFunc(direc) {
      currPage.elem.removeClass('curr').addClass(direc > 0 ? 'up' : 'down');
      scrollPage.parent.find(`.page-${currPage.index + direc}`).removeClass(direc > 0 ? 'down' : 'up').addClass('curr');
      scrollPage.parent.find('.indicator li').removeClass('active').eq(currPage.index + direc - 1).addClass('active');
      currPage.set(`.page-${currPage.index + direc}`);
      setTimeout(() => { scrollPage.scrolling = false; }, 1000);
    };

  }
})