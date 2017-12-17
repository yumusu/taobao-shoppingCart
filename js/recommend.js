function RecommendFunc( obj ){
    for(let i in obj){
        this[i] = obj[i]
    }
    this.init();
}

RecommendFunc.prototype = {
    init: function(){
        var mthis = this;
        
        // 标题悬浮
        mthis.titleHover();

        // 生成推荐列表
        mthis.createRecommendDom();

        // 小圆点悬浮事件
        mthis.pointHover();

        // 箭头悬浮以及点击
        mthis.arrowNavEvent();
    },
    // 标题悬浮
    titleHover: function(){
        var mthis = this;
        var titleLi = mthis.recommend.find('.titleUl li');
        var titleLine = mthis.recommend.find('.titleLine');
        titleLi.hover(function(){
            $(this).addClass('selected');
            $(this).siblings().removeClass('selected');
            
            var paddingLeft = Number($(this).css('padding-left').slice(0, -2));
            var paddingRight = Number($(this).css('padding-right').slice(0, -2));
            titleLine.stop().animate({
                'width': ($(this).width() + paddingLeft + paddingRight) + 'px',
                'left': $(this).position().left
            }, 300)
        },function(){
            // mouseout留空
        })
    },
    // 生成推荐列表
    createRecommendDom: function(){
        var mthis = this;
        // var ul = mthis.recommend.find('.recommendGoodsList');
        var recommendGoodsL = RecommendGoods.length;
        // 推荐商品分的页数
        var pageNum = Math.ceil( recommendGoodsL/5 );
        for(let i=0; i<pageNum; i++){
            // 一个page是一页推荐商品
            var page = $('<div>').addClass('page').attr('data-index', i+1);
            var ul = $('<div>').addClass('recommendGoodsList');
            
            for(let j=0; j<5; j++){
                var goodsIndex = (i*5)+j;
                if(goodsIndex >= recommendGoodsL){
                    break;
                }
                var goodsLi = mthis.spliteRecommendGoods(RecommendGoods[goodsIndex], j == 4);
                goodsLi.appendTo(ul);
            }

            ul.appendTo(page);
            page.appendTo(mthis.content);

            // 生成下面的导航小圆点
            var point = $('<span>',{ class: 'point'}).attr('data-index', i+1);
            point.appendTo(mthis.pointNav.find('.pointContainer'));

            if(i == 0){
                page.addClass('current');
                point.addClass('current');
            }
        }
    },
    // 拼接推荐商品
    // 第二个参数 isLast 判断当前商品是不是列表最后一个商品，true就设置右边距为0
    spliteRecommendGoods: function( goods, isLast ){
        var mthis = this;
        var goodsLi = $('<li>', {
                            'class': 'recommendGoodsLi'
                        });
        if(isLast){
            goodsLi.css('margin-right', '0');
        }
        
        var $html = '';
        $html += '<div class="goodsPic">';
        $html += '    <a href="javascript:;">';
        $html += '        <img src="./images/' + goods.id + '_b.jpg">';
        $html += '    </a>';
        $html += '</div>';
        $html += '<div class="goodsPrice">';
        $html += '    <a href="javascript:;">';
        $html += '        <span class="primePrice">￥' + goods.unitPrice + '</span>';
        $html += '        <span class="unitPrice">￥' + goods.primePrice + '</span>';
        $html += '    </a>';
        $html += '    <div class="line"></div>';
        $html += '</div>';
        $html += '<div class="goodsTitle">';
        $html += '    <span>' + goods.title + '</span>';
        $html += '</div>';
        $html += '<div class="goodsInfo">';
        $html += '    <p class="mSales">';
        $html += '        月销';
        $html += '        <span>' + goods.mSales + '</span>';
        if(goods.storeType){
            $html += '        <i class="storeIcon ' + goods.storeType + '"></i>';
        }
        $html += '    </p>';
        $html += '    <p class="accordingTo">';
        $html += '        <span>根据您' + goods.accordingTo + '的"</span>';
        $html += '        <span class="item">' + goods.item + '</span>';
        $html += '        <span>"推荐</span>';
        $html += '    </p>';
        $html += '</div>';
        goodsLi.html($html);

        return goodsLi
    },
    // 小圆点悬浮事件
    pointHover: function(){
        var mthis = this;
        var points = mthis.pointNav.find('.point');
        points.hover(function(){
            var currentIndex = $(this).attr('data-index');  // 当前小圆点的索引号
            $(this).addClass('current');
            $(this).siblings().removeClass('current');

            // 通过索引号获取page
            var currentPage = mthis.content.find('[data-index='+ currentIndex + ']');
            currentPage.addClass('current');
            currentPage.siblings().removeClass('current');
        },function(){})
    },
    // 箭头悬浮以及点击
    arrowNavEvent: function(){
        var mthis = this;
        var leftArrow = mthis.content.find('.leftArrow');
        var rightArrow = mthis.content.find('.rightArrow');

        mthis.content.hover(function(){
            leftArrow.stop().animate({
                left: 0
            }, 300);
            rightArrow.stop().animate({
                right: 0
            }, 300);
        },function(){
            leftArrow.stop().animate({
                left: -50
            }, 300);
            rightArrow.stop().animate({
                right: -50
            }, 300);
        })

        leftArrow.on('click', function(){
            var pageL = mthis.content.find('.page').length;
            var currentIndex = mthis.content.find('.page.current').attr('data-index');
            var nextIndex = Number(currentIndex) - 1;
            if(nextIndex == 0){
                nextIndex = pageL
            }
            var nextPage = mthis.content.find('[data-index='+ nextIndex + ']');
            nextPage.addClass('current').siblings().removeClass('current');
            var nextPoint = mthis.pointNav.find('[data-index='+ nextIndex + ']');
            nextPoint.addClass('current').siblings().removeClass('current');
        })

        rightArrow.on('click', function(){
            var pageL = mthis.content.find('.page').length;
            var currentIndex = mthis.content.find('.page.current').attr('data-index');
            var nextIndex = Number(currentIndex) + 1;
            if(nextIndex > pageL){
                nextIndex = 1
            }
            var nextPage = mthis.content.find('[data-index='+ nextIndex + ']');
            nextPage.addClass('current').siblings().removeClass('current');
            var nextPoint = mthis.pointNav.find('[data-index='+ nextIndex + ']');
            nextPoint.addClass('current').siblings().removeClass('current');
        })
    }
}

new RecommendFunc({
    recommend: $('#recommend'),
    content: $('#content'),
    pointNav: $('#pointNav')
});