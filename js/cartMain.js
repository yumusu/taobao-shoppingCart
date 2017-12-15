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

        // 创建购物车订单列表
        mthis.createOrderList();

        // 颜色分类悬浮事件
        mthis.goodsTypeHover();
        // 店铺优惠券点击显示
        mthis.couponClickShow();

        // 商品复选框点击事件
        mthis.goodsSelectChb();
        // 店铺复选框点击事件
        mthis.storeSelectChb();
        // 顶部全选点击事件
        mthis.allSelectChb();
        // 点击删除商品
        mthis.deleteGoods();
        // 减号点击事件
        mthis.reduceClick();
        // 加号点击事件
        mthis.increaseClick();
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
    },
    // 创建购物车订单列表
    createOrderList: function(){
        var mthis = this;
        var goodsI = GoodsInformation.goods;  // 商品列表，是一个数组
        var goodsL = goodsI.length;
        for( let i = 0; i < goodsL; i++ ){
            // 判断是否是已有店铺的商品
            var orderItems = mthis.orderList.find('.orderItem');
            var orderItemsL = orderItems.length;
            var isOld = 0;  // isOld为0则是新店铺的商品，为1则是已存在店铺的商品

            for( let j = 0; j < orderItemsL; j++ ){
                if(orderItems.eq(j).attr('data-storeid') == goodsI[i].store.id){
                    // 如果店铺id等于已有的店铺id，则直接拼接商品信息到原ul里，
                    // 并设置isOld为1，阻止外层循环添加信息
                    var previousHtml = orderItems.eq(j).find('.goodsList').children('ul').html();
                    var goodsListUlHtml = mthis.spliceGoodsInfo( goodsI[i] )
                    orderItems.eq(j).find('.goodsList').children('ul').html( previousHtml + goodsListUlHtml );
                    isOld = 1;

                    isOldStoreIndex = j;
                    break;
                }
            }

            if(isOld == 0){
                // orderItem是单个店铺的订单
                var orderItem = $('<div>', { 
                    'class': 'orderItem',
                    'data-storeid': goodsI[i].store.id
                })

                // storeInfo是店铺信息
                var storeInfoHtml = mthis.spliceStoreInfo(goodsI[i].store);
                var storeInfo = $('<div>', {
                                    'class': 'storeInfo'
                                }).html(storeInfoHtml);
                storeInfo.appendTo(orderItem);

                // goodsList是该店铺的所有商品的列表
                var goodsList = $('<div>', { 'class': 'goodsList' });
                var goodsListUlHtml = mthis.spliceGoodsInfo( goodsI[i] )
                var goodsListUl = $('<ul>', {}).html(goodsListUlHtml);

                goodsListUl.appendTo(goodsList);
                goodsList.appendTo(orderItem);

                orderItem.appendTo(mthis.orderList);
            }
        }

        // 给商品的复选框添加数据
        mthis.addDataToChb();
    },
    // 拼接店铺信息
    spliceStoreInfo: function( store ){
        var mthis = this;
        var $html = '';
        $html += '<div class="storeAllSelect" data-storeall="0"></div>';
        $html += '<div class="storeIcon ' + store.type + '"></div>';
        $html += '<div class="storeName">';
        $html += '    <span>店铺：</span>';
        $html += '    <span>' + store.name + '</span>';
        $html += '</div>';
        $html += '<div class="wangwangIcon"></div>';
        if(store.coupon){
            var couponL = store.coupon.length;
            $html += '<div class="coupon" data-show=0>';
            $html += '    <span class="couponText">优惠券</span>';
            $html += '    <i class="arrowSwitch drop"></i>';
            $html += '    <div class="couponDetail">';
            $html += '        <i class="close"></i>';
            $html += '        <i class="horn"></i>';
            $html += '        <div>';
            $html += '            <div class="couponCount">';
            $html += '                <i class="trumpet"></i>';
            $html += '                <span>已领取</span>';
            $html += '                <span>0</span>';
            $html += '                <span>优惠券，有新优惠券可领取</span>';
            $html += '            </div>';
            $html += '            <div class="couponList">';
            $html += '                <ul>';
            for(let i = 0; i<couponL; i++){
                $html += '              <li class="couponListLi">';
                $html += '                  <div class="couponPic">';
                $html += '                      ￥<span class="couponPicNum">' + store.coupon[i].discount + '</span>';
                $html += '                  </div>';
                $html += '                  <div class="couponDiscountInfo">';
                $html += '                      <div class="couponDiscountText">';
                $html += '                          <p class="couponTitle">';
                $html += '                              <span>优惠券&nbsp;满</span>';
                $html += '                              <span class="amount">' + store.coupon[i].amount + '</span>';
                $html += '                              <span>减</span>';
                $html += '                              <span class="discount">' + store.coupon[i].discount + '</span>';
                $html += '                          </p>';
                $html += '                          <p class="couponDate">';
                $html += '                              <span>' + store.coupon[i].beginning + '</span>';
                $html += '                              <span>-</span>';
                $html += '                              <span>' + store.coupon[i].ending + '</span>';
                $html += '                          </p>';
                $html += '                      </div>';
                $html += '                      <div class="couponGet">';
                $html += '                          <div class="couponGetBtn">领取</div>';
                $html += '                      </div>';
                $html += '                  </div>';
                $html += '              </li>';
            }
            $html += '                </ul>';
            $html += '            </div>';
            $html += '        </div>';
            $html += '    </div>';
            $html += '</div>';
        }

        return $html;
    },
    // 拼接商品信息
    spliceGoodsInfo: function( goods ){
        var mthis = this;
        var $html = '';
        $html += '<li class="goodsItem">';
        $html += '    <div class="goodsItemContainer">';
        $html += '        <ul>';
        $html += '            <li class="goodsSelect">';
        $html += '                <div class="container">';
        $html += '                    <div class="goodsSelectIcon" data-selected="0" data-id="' + goods.id + '"></div>';
        $html += '                </div>';
        $html += '            </li>';
        $html += '            <li class="goodsTitle">';
        $html += '                <div class="container">';
        $html += '                    <div class="goodsPic">';
        $html += '                        <a href="https://item.taobao.com/item.htm?id=' + goods.id + '">';
        $html += '                            <img src="./images/'+ goods.id + '_s.jpg">';
        $html += '                        </a>';
        $html += '                    </div>';
        $html += '                    <div class="goodsTitleContainer">';
        $html += '                        <div class="goodsTitleText">';
        $html += '                            <a href="https://item.taobao.com/item.htm?id=' + goods.id + '">';
        $html += '                                ' + goods.title + '';
        $html += '                            </a>';
        $html += '                        </div>';
        $html += '                        <div class="serviceIcon">';

        // 循环添加服务图标
        for( let i = 0; i<goods.services.length; i++ ){
            $html += '<span class="' + goods.services[i] + '">';
            $html += '    <a href="javascript:;">';
            $html += '        <img src="./images/' + goods.services[i] + '.png">';
            $html += '    </a>';
            $html += '</span>';
        };
        $html += '                        </div>';
        $html += '                    </div>';
        $html += '                </div>';
        $html += '            </li>';
        $html += '            <li class="goodsType">';
        $html += '                <div class="container">';
        $html += '                    <div class="goodsTypeText">';

        // 循环添加商品分类
        for( let i = 0; i<goods.type.length; i++ ){
            $html += '<p>';
            $html += '    <span class="typeTitle">' + goods.type[i].title + '：</span>';
            $html += '    <span class="typeValue">' + goods.type[i].value + '</span>';
            $html += '</p>';
        }
        $html += '                        <span class="edit">修改</span>';
        $html += '                    </div>';
        $html += '                </div>';
        $html += '            </li>';
        $html += '            <li class="unitPrice">';
        $html += '                <div class="container">';
        if(goods.primePrice){
            $html += '<p class="primePriceNum">';
            $html += '    ￥<span>' + goods.primePrice.toFixed(2) + '</span>';
            $html += '</p>';
        }
        $html += '                    <p class="unitPriceNum">';
        $html += '                        ￥<span>' + goods.unitPrice.toFixed(2) + '</span>';
        $html += '                    </p>';
        $html += '                </div>';
        $html += '            </li>';
        $html += '            <li class="count">';
        $html += '                <div class="container">';
        $html += '                    <div class="countPanel">';
        $html += '                        <span class="reduce">-</span>';
        $html += '                        <input class="number" type="text" value=1>';
        $html += '                        <span class="increase">+</span>';
        $html += '                    </div>';
        $html += '                    <div class="countWarning ' + (goods.quota ? '' : 'hide') + '">';
        if(goods.quota){
            $html += '限购' + goods.quota + '件';
        }
        $html += '                    </div>';
        $html += '                </div>';
        $html += '            </li>';
        $html += '            <li class="amount">';
        $html += '                <div class="container">';
        $html += '                    <p class="amountNum">';
        $html += '                        ￥<span>' + goods.unitPrice.toFixed(2) + '</span>';
        $html += '                    </p>';
        $html += '                </div>';
        $html += '            </li>';
        $html += '            <li class="operate">';
        $html += '                <div class="container">';
        $html += '                    <p class="collect">移入收藏夹</p>';
        $html += '                    <p class="delete">删除</p>';
        $html += '                </div>';
        $html += '            </li>';
        $html += '        </ul>';
        $html += '    </div>';
        $html += '</li>';

        return $html;
    },
    // 给商品的复选框添加数据
    addDataToChb: function(){
        var mthis = this;
        var goodsList = mthis.orderList.find('.goodsItem');
        var goodsChb = goodsList.find('.goodsSelectIcon')
        var goodsChbL = goodsChb.length;

        var goodsI = GoodsInformation.goods;  // 商品列表，是一个数组
        var goodsL = goodsI.length;

        for(let i=0; i<goodsChbL; i++){
            goodsId = goodsChb.eq(i).attr('data-id');
            var goodsIndex = 0;
            for(let j=0; j<goodsL; j++){
                if(goodsI[j].id !== goodsId){
                    continue;
                }else{
                    goodsIndex = j;
                    break;
                }
            }
            goodsChb
                .eq(i)
                .data({
                    'data-id': goodsI[goodsIndex].id,
                    'data-num': 1,
                    'data-unitPrice': goodsI[goodsIndex].unitPrice
                }
            )
        }
    },
    // 颜色分类悬浮样式
    goodsTypeHover: function(){
        var mthis = this;
        // 商品列表集合
        var goodsItems = mthis.orderList.find('.goodsItem');
        goodsItems.hover(function(){
            $(this).find('.goodsType .container').addClass('hintEdit');
        },function(){
            $(this).find('.goodsType .container').removeClass('hintEdit');
        })

        // 颜色分类container集合
        var typeContainer = goodsItems.find('.goodsType .container');
        typeContainer.hover(function(){
            $(this).addClass('showEdit');
        },function(){
            $(this).removeClass('showEdit');
        })
    },
    // 优惠券点击事件
    couponClickShow: function(){
        var mthis = this;
        var coupons = mthis.orderList.find('.coupon');
        coupons.on('click', function(){
            var couponDetail = $(this).find('.couponDetail');
            if($(this).attr('data-show') == 0){
                couponDetail.show();
                $(this).attr('data-show', 1);
            }else{
                couponDetail.hide();
                $(this).attr('data-show', 0);
            }
        })
        // 获取优惠券详情，阻止事件冒泡，防止点击优惠券详情之后关闭
        var couponDetail = mthis.orderList.find('.couponDetail');
        couponDetail.on('click', function(e){
            // 兼容性写法
            if( e && e.stopPropagation ){
                e.stopPropagation();  // W3C标准
            }else{
                window.event.cancelBubble = true;  // ie写法
            }
        })
    },
    // 商品选中事件
    goodsSelectChb: function(){
        var mthis = this;
        var goodsItems = mthis.orderList.find('.goodsItem');
        var goodsChb = goodsItems.find('.goodsSelectIcon');
        goodsChb.on('click', function(){
            if($(this).attr('data-selected') == 0){
                $(this).addClass('selected')
                $(this).attr('data-selected', 1);
            }else{
                $(this).removeClass('selected')
                $(this).attr('data-selected', 0);
            }

            var goods = $(this).parents('.goodsItem');
            mthis.storeGoodsIsAllS(goods);

            // 计算
            mthis.calcGoods();
        })
    },
    // 判断该店铺商品是否已全部选中
    storeGoodsIsAllS: function( goods ){
        var mthis = this;
        var storeSelectIcon = goods.parents('.orderItem').find('.storeAllSelect');
        // 通过传入的商品，获取该店铺所有商品
        var storeGoods = goods.parent().children('.goodsItem');
        // console.log(storeGoods)
        var storeGoodsL = storeGoods.length;
        for(let i=0; i<storeGoodsL; i++){
            var goodsSelectStatus = storeGoods.eq(i).find('.goodsSelectIcon').attr('data-selected')
            // console.log('status:' + goodsSelectStatus)
            if(goodsSelectStatus == 0){
                storeSelectIcon.removeClass('selected');
                storeSelectIcon.attr('data-storeall', 0);
                
                // 判断店铺是否已全部选中
                mthis.storeIsAllS();
                return false;
            }
        }
        storeSelectIcon.addClass('selected');
        storeSelectIcon.attr('data-storeall', 1);
        
        // 判断店铺是否已全部选中
        mthis.storeIsAllS();
    },
    // 店铺全选点击事件
    storeSelectChb: function(){
        var mthis = this;
        var orderItems = mthis.orderList.find('.orderItem');
        var orderChb = orderItems.find('.storeAllSelect');
        orderChb.on('click', function(){
            if($(this).attr('data-storeall') == 0){
                var storeGoods = $(this).parents('.orderItem').find('.goodsSelectIcon');
                var storeGoodsL = storeGoods.length;
                for(let i=0; i< storeGoodsL; i++){
                    storeGoods.eq(i).addClass('selected');
                    storeGoods.eq(i).attr('data-selected', 1);
                }

                $(this).addClass('selected')
                $(this).attr('data-storeall', 1);

                // 计算商品数量和总价
                mthis.calcGoods();
            }else{
                var storeGoods = $(this).parents('.orderItem').find('.goodsSelectIcon');
                var storeGoodsL = storeGoods.length;
                for(let i=0; i< storeGoodsL; i++){
                    storeGoods.eq(i).removeClass('selected');
                    storeGoods.eq(i).attr('data-selected', 0);
                }

                $(this).removeClass('selected')
                $(this).attr('data-storeall', 0);

                // 计算商品数量和总价
                mthis.calcGoods();
            }

            mthis.storeIsAllS();
        });
    },
    // 判断店铺是否已全部选中
    storeIsAllS: function(){
        var mthis = this;
        // mthis.cartHeadingAllSelectId 顶部全选按钮
        // 底部全选按钮
        var cartFooterAll = mthis.cartFooter.find('.selectAllIcon');

        var stores = mthis.orderList.children('.orderItem');
        var storesL = stores.length;
        if(storesL == 0){
            mthis.cartHeadingAllSelectId.removeClass('selected');
            mthis.cartHeadingAllSelectId.attr('data-all', 0);
            mthis.cartHeadingAllSelectId.css('cursor', 'no-drop');

            cartFooterAll.removeClass('selected');
            cartFooterAll.attr('data-all', 0);
            cartFooterAll.css('cursor', 'no-drop');
            return false;
        }
        for(let i=0; i<storesL; i++){
            var storeStatus = stores.eq(i).find('.storeAllSelect').attr('data-storeall');
            if(storeStatus == 0){
                mthis.cartHeadingAllSelectId.removeClass('selected');
                mthis.cartHeadingAllSelectId.attr('data-all', 0);

                cartFooterAll.removeClass('selected');
                cartFooterAll.attr('data-all', 0);
                return false;
            }
        }
        mthis.cartHeadingAllSelectId.addClass('selected');
        mthis.cartHeadingAllSelectId.attr('data-all', 1)
        
        cartFooterAll.addClass('selected');
        cartFooterAll.attr('data-all', 1);
    },
    // 顶部全选和浮动条全选点击事件
    allSelectChb: function(){
        var mthis = this;
        var orderItems = mthis.orderList.find('.orderItem');
        var orderChb = orderItems.find('.storeAllSelect');
        var orderChbL = orderChb.length;
        mthis.cartHeadingAllSelectId.on('click', function(){
            if($(this).attr('data-all') == 0){
                for(let i=0; i<orderChbL; i++){
                    orderChb.eq(i).addClass('selected').attr('data-storeall', 0).click();
                }
                $(this).attr('data-all', 1);
            }else{
                for(let i=0; i<orderChbL; i++){
                    orderChb.eq(i).removeClass('selected').attr('data-storeall', 1).click();
                }
                $(this).attr('data-all', 0);
            }
        })

        // 下方全选按钮
        var cartFooterAll = mthis.cartFooter.find('.selectAllIcon');
        cartFooterAll.on('click', function(){
            mthis.cartHeadingAllSelectId.trigger('click');
        })
    },
    // 计算商品数量和总价
    calcGoods: function(){
        var mthis = this;
        var count = 0;
        var amount = 0;
        var goodsItems = mthis.orderList.find('.goodsItem');
        var goodsChb = goodsItems.find('.goodsSelectIcon');
        var goodsChbL = goodsChb.length;
        for(let i=0; i<goodsChbL; i++){
            var currentChb = goodsChb.eq(i);
            // 循环复选框，如果当前复选框是选中状态，就添加它的数量和金额
            if(currentChb.attr('data-selected') == 1){
                // console.log(currentChb.data())
                count += currentChb.data('data-num');
                amount += currentChb.data('data-unitPrice') * currentChb.data('data-num');
            }
        }

        mthis.cartHeadingAllSelectId.data('count', count);
        mthis.cartHeadingAllSelectId.data('amount', amount);
        // 将数量放到html里
        mthis.goodsCountNum.html(count);
        mthis.goodsAmountNumber.html(amount.toFixed(2));
        mthis.filterAmount.html(amount.toFixed(2));
    },
    // 删除按钮点击事件
    deleteGoods: function(){
        var mthis = this;
        var orderItems = mthis.orderList.find('.goodsItem');
        var deleteBtn = orderItems.find('.delete');
        var deleteBtnL = deleteBtn.length;
        deleteBtn.on('click', function(){
            var currentGoods = $(this).parents('.goodsItem');   // 当前商品
            var store = currentGoods.parents('.orderItem');     // 当前店铺
            var storeOtherGoods = currentGoods.siblings('.goodsItem');  // 当前店铺其他商品
            currentGoods.remove();
            // 如果没有其他商品，则删除店铺
            if( !storeOtherGoods.length ){
                store.remove();

                // 判断删除后商铺是否被全部选中
                mthis.storeIsAllS();
            }
            
            mthis.storeGoodsIsAllS(storeOtherGoods.eq(0));
            mthis.calcGoods();
        })
    },
    // 减号点击事件
    reduceClick: function(){
        var mthis = this;
        var goods = mthis.orderList.find('.goodsItem');
        var reduce = goods.find('.reduce');
        reduce.on('click', function(){
            var goodsChb = $(this).parents('.count').siblings('.goodsSelect').find('.goodsSelectIcon');
            var inputNumber = $(this).siblings('.number');
            var goodsNum = goodsChb.data('data-num');
            if(goodsNum <= 1){
                return;
            }else{
                goodsChb.data({'data-num': --goodsNum});
            }

            // 获取新的数量
            var newNum = goodsChb.data('data-num');
            if(newNum <= 1){
                $(this).css({
                    'cursor': 'no-drop',
                    'color': '#e5e5e5'
                })
            }
            inputNumber.prop('value', newNum);

            // 计算商品价格
            mthis.calcGoods();
        });
    },
    // 加号点击事件
    increaseClick: function(){
        var mthis = this;
        var goods = mthis.orderList.find('.goodsItem');
        var increase = goods.find('.increase');
        increase.on('click', function(){
            var goodsChb = $(this).parents('.count').siblings('.goodsSelect').find('.goodsSelectIcon');
            var inputNumber = $(this).siblings('.number');      // 中间的数字输入框
            var reduce = $(this).siblings('.reduce');      // 中间的数字输入框
            var goodsNum = goodsChb.data('data-num');

            goodsChb.data({'data-num': ++goodsNum});

            // 获取新的数量
            var newNum = goodsChb.data('data-num');
            // 设置数字输入框的文字
            inputNumber.prop('value', newNum);
            if(newNum > 1){
                reduce.css({
                    'cursor': 'pointer',
                    'color': '#000'
                })
            }

            // 计算商品价格
            mthis.calcGoods();
        });
    }
}

var obj = {
    cartFilterTypeUlId: $("#cartFilterTypeUlId"),
    orderList: $("#orderList"),
    cartHeadingAllSelectId: $('#cartHeadingAllSelectId'),
    cartFooter: $('#cartFooter'),
    goodsCountNum: $('#goodsCountNum'),      // 底栏的商品数量
    goodsAmountNumber: $('#goodsAmountNumber'),      // 底栏的商品总金额
    filterAmount: $('#filterAmount')        // 顶栏的商品总金额
}

new CartMain( obj );