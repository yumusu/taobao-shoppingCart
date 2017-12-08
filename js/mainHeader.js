function MainHeader( obj ){
    // 循环设置属性
    for( let i in obj){
        this[i] = obj[i];
    }
    this.init();
}

MainHeader.prototype = {
    // 初始方法
    init: function(){
        var mthis = this;

        // 触发下拉弹出下拉框的方法
        mthis.dropPopupDisplay(mthis.userInfo);
        mthis.dropPopupDisplay(mthis.headerMessage);
        mthis.dropPopupDisplay(mthis.myTaobao);
        mthis.dropPopupDisplay(mthis.collectionHeader);
    },
    // 下拉弹出下拉框方法，接收参数：dom元素
    dropPopupDisplay: function( tParent ){
        var mthis = this;
        var t = tParent.find('.mainHeaderListPopup');
        tParent.on('mouseover', function(){
            tParent.css('background-color', '#fff');
            t.show();
        });
        tParent.on('mouseout', function(){
            tParent.css('background-color', '#f5f5f5');
            t.hide();
        })
    }
}

var obj = {
    userInfo: $("#userInfo"),
    headerMessage: $("#headerMessage"),
    myTaobao: $("#myTaobao"),
    collectionHeader: $("#collectionHeader")
}

new MainHeader( obj );