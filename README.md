---
title: 购物车笔记
date: 2017-12-07 17:10:11
tags:
---

**Demo:** [https://yumusu.github.io/shoppingCart/shoppingCart.html](https://yumusu.github.io/shoppingCart/shoppingCart.html)

## 设置列表横向排列

给`<li>`标签添加`float`

## 给鼠标悬浮状态下的子元素设置css样式

```css
element:hover childElement{
  ...
}

eg:
/* 收藏夹悬浮改变子元素背景图 */
.mainHeaderListContent:hover i.collectionLogo{
    background: url('../widget/headerWidget.png') no-repeat -14px -35px;
}
```

## 在其他样式里定位absolute设置过left之后，想调整为right

```css
left: auto;
right: 0;
```

只要把left设置为`auto`，就可以调整为right了

## jQuery设置hover样式

```javascript
element.hover(function(){
  ...handlerIn方法，规定mouseover事件发生时运行的函数
},function(){
  ...handleOut方法，规定mouseout事件发生时运行的函数
})
```

`hover()`方法规定当鼠标指针悬停在被选元素上时要运行的两个函数，方法触发`mouseenter`和`mouseleave`事件。

注意：**如果只指定一个函数，则mouseenter和mouseleave都执行它。

## jQuery获取点击事件的target

```javascript
searchTypeList.on('click', function(){
  var e = $(this);
})
```

在事件方法中，直接用 `$(this)` 即可获取

## 去除`inline-block`元素之间的间距

在设置购物车筛选标题列表的时候 `全部商品 5` 这几个列表，由于列表是`float:left;`实现的横向排列，里面的文字使用的都是`<span>`，所以出现 `全部商品` 和 `5` 之间默认有间距。

解决方法：

设置 `<li>` 的`font-size: 0;`，然后给`<span>`单独设置字体大小。

```css
li{
  float: left;
  font-size: 0;
  -webkit-text-size-adjust: none;  /* 防止chrome的最小字体限制导致的bug */
}

li span{
  font-size: 16px;
}
```

## `animate()`动画方法

语法： `$(selector).animate(styles,speed,easing,callback)`

- styles  必需，规定产生动画效果的CSS样式和值。（只有数字值可以创建动画。）
- speed  可选。规定动画的速度，默认是“normal”。可以设置为：
    - 毫秒（比如1500）
    - "slow" "normal" "fast"
- easing  可选。
- callback  可选。animate函数执行完之后，要执行的函数。

```javascript
$('#anime').animate({
              left: '200px'
            }, 1000);
```

注意： 

- **styles参数是一个对象，属性名不用加引号，属性值要加引号**

## 设置显示两位小数，整数后面加`.00`

```javascript
goodsPrice.toFixed(2);
```

`toFixed( num )`方法可把Number四舍五入为指定小数位数的数字，`num`参数规定小数的位数。

## 阻止事件冒泡

捕获型事件先发生，然后冒泡型事件再发生。  
默认触发顺序： 

> 根节点 &gt; 父容器 &gt; 子容器 &gt; 父容器 &gt; 根节点

事件默认是在冒泡阶段执行，也就是：

> 子容器 &gt; 父容器 &gt; 根节点

```javascript
document.getElementById('inner').addEventListener('click', function, true);
```

`addEventListener()`函数的第三个参数设置为`true`，则该事件监听会在捕获阶段执行

阻止事件冒泡：

```javascript
function(e){
  // 兼容性写法
  if( e && e.stopPropagation ){
    e.stopPropagation();  // W3C标准
  }else{
    window.event.cancelBubble = true; // ie写法
  }
}
```

## jQuery 自动触发事件

### `trigger()` 方法用来模拟用户操作

```javascript
$('#btn').trigger('click');
// 或者
$('#btn').click();
```

语法：

```javascript
$(selector).trigger(event, [param1, param2, ...])
```

### `triggerHandler()`方法

`triggerHandler()`方法触发被选元素的指定事件类型，但**不会执行浏览器默认动作，也不会产生事件冒泡**

与`trigger()`方法相比的不同之处

- 它不会引起事件（比如表单提交）的默认行为
- `.trigger()` 会操作 jQuery 对象匹配的所有元素，而 **`.triggerHandler()` 只影响第一个匹配元素**。
- 由 `.triggerHandler()` 创建的事件不会在 DOM 树中冒泡；如果目标元素不直接处理它们，则不会发生任何事情。
- 该方法的返回的是事件处理函数的返回值，而不是具有可链性的 jQuery 对象。此外，如果没有处理程序被触发，则这个方法返回 undefined。

## jQuery获取所有同级元素包括自己

`siblings()`获取同级元素，但是不包括选择器自己

`$(selector).parent().children();` 获取包括选择器自己的所有同级元素

## 拼接字符串添加HTML元素会出现的问题

```javascript
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
```

之前判断如果商品是店铺已有商品的情况下，是直接把`<ul>`标签里的html内容变成`原内容+新生成内容`的拼接字符串方式

这样出现的问题是：

**在循环里获取的`原内容`里的html元素会消失，然后生成新的html元素**，这样就无法在循环里给html元素添加内容，比如`data()`

## `$('<div>')`这样生成的html元素可以使用变量名存储，然后附加内容，并且`appendTo()`之后内容还会存在

## CSS禁止选择文字

```css
p{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
```

## 对`<input>`输入数据进行检测的实现方法

```javascript
number.on('focus', function(){
  // 获得焦点之后，获取原value
  var oriValue = $(this).prop('value');

  $(this).on('input', function(){
    // 文字改变之后，获取新value
    var newValue = $(this).prop('value');
    // 对新文本进行数字转换，
    // 如果转换失败，就把原value赋值给value
    if( !Number(newValue) ){
      $(this).prop('value', oriValue);
    }else{
      // 转换成功，把新value赋值给oriValue
      // 这样可以记住这次输入成功的数字，
      // 下次再失败的时候就会替换成最近一次成功的数字
      oriValue = $(this).prop('value');
    }
  })
})
```

## cartFooter底栏根据页面的滚动情况设置position

原本底栏position是`fixed`，当页面滚动至显示全部的商品之后，底栏position变成`static`：

```javascript
$(window).scroll(function(){
  // 浏览器的高度，也就是可视区域的高度
  var visibleH = document.documentElement.clientHeight;
  // 元素相对于浏览器顶部的距离 = 
  // 元素相对于总页面的top值 - 浏览器的滚动高度
  var clientTop = mthis.orderList.offset().top - $(window).scrollTop();
  // 元素底部相对于浏览器底部的距离 = 
  // 浏览器的可视高度 - （元素相对于顶部的距离 + 元素高度）
  var clientBottom = visibleH - (clientTop + mthis.orderList.height());

  // 65是 商品列表和底栏的间距 + 底栏的高度
  // 也就是刚好够容纳底栏的高度，实例中是 15+50
  if(clientBottom >= 65){
    mthis.cartFooter.css('position', 'static');
  }else{
    mthis.cartFooter.css('position', 'fixed');
  }
})
