function sto(){
    this.set = function( name, value ){
        sessionStorage.setItem( name, value );
    }
    this.get = function( name ){
        sessionStorage.getItem( name );
    }
}
function CartMain( obj ){
    // 循环设置属性
    for( let i in obj){
        this[i] = obj[i];
    }
    this.sto = new sto();
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
                    var previousHtml = orderItems.eq(j).find('.goodsList').find('ul').html();
                    var goodsListUlHtml = mthis.spliceGoodsInfo( goodsI[i] )
                    orderItems.eq(j).find('.goodsList').find('ul').html( previousHtml + goodsListUlHtml );
                    isOld = 1;
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
        $html += '                    <div class="goodsSelectIcon" data-selected="0"></div>';
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
        $html += '                        ￥<span>99222222.00</span>';
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

            mthis.storeGoodsIsAllS($(this).parents('.goodsItem'));
        })
    },
    // 判断该店铺商品是否已全部选中
    storeGoodsIsAllS: function( goods ){
        var storeSelectIcon = goods.parents('.orderItem').find('.storeAllSelect');
        // 通过传入的商品，获取该店铺所有商品
        var storeGoods = goods.parent().children('.goodsItem');
        var storeGoodsL = storeGoods.length;
        for(let i=0; i<storeGoodsL; i++){
            var goodsSelectStatus = storeGoods.eq(i).find('.goodsSelectIcon').attr('data-selected')
            // console.log('status:' + goodsSelectStatus)
            if(goodsSelectStatus == 0){
                storeSelectIcon.removeClass('selected');
                storeSelectIcon.attr('data-storeall', 0);
                return false;
            }
        }
        storeSelectIcon.addClass('selected');
        storeSelectIcon.attr('data-storeall', 1);
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
            }else{
                var storeGoods = $(this).parents('.orderItem').find('.goodsSelectIcon');
                var storeGoodsL = storeGoods.length;
                for(let i=0; i< storeGoodsL; i++){
                    storeGoods.eq(i).removeClass('selected');
                    storeGoods.eq(i).attr('data-selected', 0);
                }

                $(this).removeClass('selected')
                $(this).attr('data-storeall', 0);
            }

            mthis.storeIsAllS();
        })
    },
    // 判断店铺是否已全部选中
    storeIsAllS: function(){
        var mthis = this;
        // mthis.cartHeadingAllSelectId 顶部全选按钮
        var stores = mthis.orderList.children('.orderItem');
        var storesL = stores.length;
        for(let i=0; i<storesL; i++){
            var storeStatus = stores.eq(i).find('.storeAllSelect').attr('data-storeall');
            if(storeStatus == 0){
                mthis.cartHeadingAllSelectId.removeClass('selected');
                mthis.cartHeadingAllSelectId.attr('data-all', 0);
                return false;
            }
        }
        mthis.cartHeadingAllSelectId.addClass('selected');
        mthis.cartHeadingAllSelectId.attr('data-all', 1)
    }
}

var obj = {
    cartFilterTypeUlId: $("#cartFilterTypeUlId"),
    orderList: $("#orderList"),
    cartHeadingAllSelectId: $('#cartHeadingAllSelectId')
}

new CartMain( obj );