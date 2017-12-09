function MainHeader( obj ){
    // 循环设置属性
    for( let i in obj){
        this[i] = obj[i];
    }
    this.MainHeaderLinks = MainHeaderLinks;
    console.log(this.MainHeaderLinks);
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
        mthis.dropPopupDisplay(mthis.vendorCenter);
        mthis.dropPopupDisplay(mthis.serviceLink);
        mthis.dropPopupDisplay(mthis.siteNav);

        // 执行创建网站导航的方法
        mthis.creatSiteNavPopup();
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
    },
    creatSiteNavPopup: function(){
        var mthis = this;
        // 获取导航面板
        var siteNavPanel = mthis.siteNav.find(".siteNavPanel");
        var siteNavLinks = mthis.MainHeaderLinks.siteNavLinks;  // 网站导航数据
        // 第一层循环，添加子面板
        for( let i in siteNavLinks){
            let linkGather = siteNavLinks[i];  // 单独的链接集合，是一个对象
            let childPanel = $('<div>').addClass("childPanel");
            let linkTitle = $('<h4>').html(linkGather.title).addClass('linkTitle').css('color', linkGather.color);
            linkTitle.appendTo(childPanel);
            // 第二层循环，添加单个链接
            for( let j in linkGather.links){
                let link = linkGather.links[j];
                let linkLi = $('<li>',{})
                                .css({
                                    'width': linkGather.width
                                });
                let linkElement = $('<a>',{
                    href: 'javascript:;'
                })
                    .html(link.name)
                    .hover(function(){
                        $(this).css({
                            'color': '#fff',
                            'background-color': linkGather.colorHover
                        });
                    },function(){
                        $(this).css({
                            'color': '#000',
                            'background-color': '#fff'
                        })
                    });
                if(link.modify){
                    let linkI = $('<i>',{}).addClass(link.modify);
                    linkI.appendTo(linkElement);
                }
                linkElement.appendTo(linkLi)
                linkLi.appendTo(childPanel);
            }
            childPanel.appendTo(siteNavPanel);
        }
    }
}

var obj = {
    userInfo: $("#userInfo"),
    headerMessage: $("#headerMessage"),
    myTaobao: $("#myTaobao"),
    collectionHeader: $("#collectionHeader"),
    vendorCenter: $("#vendorCenter"),
    serviceLink: $("#serviceLink"),
    siteNav: $("#siteNav")
}

new MainHeader( obj );