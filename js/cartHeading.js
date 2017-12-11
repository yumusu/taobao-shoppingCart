function CartHeading( obj ){
    // 循环设置属性
    for( let i in obj){
        this[i] = obj[i];
    }
    this.searchTypeValue = ['宝贝', '天猫', '店铺'];
    this.init();
}

CartHeading.prototype = {
    // 初始方法
    init: function(){
        var mthis = this;
        // 创建搜索类型列表
        mthis.createSearchTypeList();

        // 搜索框聚焦
        mthis.mainHeadingSearchInput.focus();
        mthis.searchInputEvent();
    },
    // 创建搜索类型列表
    createSearchTypeList: function(){
        var mthis = this;
        // 先清空ul内容
        mthis.searchTypeUl.html('');
        var searchTypeValueL = mthis.searchTypeValue.length;
        for(let i = 0; i < searchTypeValueL; i++){
            var searchTypeLi = $('<li>', { 
                                    'class': (i == 0)
                                                ? 'searchTypeLi selected' 
                                                : 'searchTypeLi',
                                    'data-index': i
                                });
            var searchTypeSpan = $('<a>',{ 'href': 'javascript:;'}).html( mthis.searchTypeValue[i] );
            var searchTypeArrow = $('<i>',{ 'class': 'arrow'});
            searchTypeSpan.appendTo(searchTypeLi);
            searchTypeArrow.appendTo(searchTypeLi);

            searchTypeLi.appendTo(mthis.searchTypeUl);
        }

        mthis.searchTypeListEvent();
    },
    // 给搜索类型列表添加点击事件
    searchTypeListEvent: function(){
        var mthis = this;
        var searchTypeList = mthis.searchTypeUl.find('.searchTypeLi');
        searchTypeList.on('click', function(){
            var e = $(this);
            mthis.searchTypeValue.splice(e.attr('data-index'), 1);  // 删除选中的数组元素
            mthis.searchTypeValue.unshift(e.text());                // 然后添加到开头
            console.log(mthis.searchTypeValue);

            mthis.createSearchTypeList();
        })
    },
    // 输入框聚焦和失去焦点方法
    searchInputEvent: function(){
        var mthis = this;
        var searchIcon = mthis.mainHeadingSearchInput.siblings('.searchIcon');
        mthis.mainHeadingSearchInput
            .on({
                'focus': function(){
                    searchIcon.hide();
                },
                'blur': function(){
                    if( $(this).prop('value').trim() ){
                        return;
                    }else{
                        searchIcon.show();
                    }
                }
            })
    }
}

var obj = {
    searchTypeUl: $("#searchTypeUl"),
    mainHeadingSearchInput: $("#mainHeadingSearchInput")
}

new CartHeading( obj );