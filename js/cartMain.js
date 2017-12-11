function CartMain( obj ){
    // 循环设置属性
    for( let i in obj){
        this[i] = obj[i];
    }
    this.init();
}

CartMain.prototype = {
    // 初始方法
    init: function(){
        var mthis = this;

        // 筛选类型悬浮事件
        mthis.filterTypeHover();
    },
    // 筛选类型悬浮，下面的线的动画效果
    filterTypeHover: function(){
        var mthis = this;
        var cartFilterTypeLi = mthis.cartFilterTypeUlId.find('.cartFilterTypeLi');
        var filterLine = mthis.cartFilterTypeUlId.siblings('.filterBottomLine').find('.filterLine');
        // console.log(filterLine);
        cartFilterTypeLi.hover(function(){
            filterLine.stop().animate({ left: $(this).index() * 123 + 'px' }, 300);
        },function(){
            filterLine.stop().animate({ left: '0px' }, 300);
        })
    }
}

var obj = {
    cartFilterTypeUlId: $("#cartFilterTypeUlId")
}

new CartMain( obj );