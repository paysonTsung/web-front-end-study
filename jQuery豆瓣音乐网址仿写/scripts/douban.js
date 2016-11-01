$(function(){
    var $download = $('.download'),
        $appIntro = $('.app-intro'),
        $navSearch = $('.nav-search'),
        $atSearch = $('.at-search'),
        $searchCate = $('.search-cate'),
        $list = $('.rl'),
        $btn = $('.at-submit'),
        $sch = $('.at-search'),
        $topSch = $('.nav-search'),
        $firstMsg = $('.rl-default'),
        $noResult = $('.rl-noresult'),
        $footer = $('.footer'),
        $more = $('.search-more'),
        $head = $('h1'),
        $toTop = $('.top'),
        curPage = 0,
        curKey,
        isFirstLoaded = true;
    //豆瓣app信息显示/消失
    $download.add($appIntro).on('mouseover', function(){
        $appIntro.show();
    }).on('mouseout', function(){
        $appIntro.hide();
    });
    //顶级搜索栏与普通搜索栏聚焦失焦行为
    $navSearch.add($atSearch).on('focus', function(){
        if(this.value === this.defaultValue){
            this.value = '';
            $(this).css('color','black');
        }
    }).on('blur', function(){
        if(this.value === ''){
            this.value = this.defaultValue;
            $(this).css('color','lightgray');
        }
    });
    //菜单栏滚动效果，滚动一定像素后，固定定位
    $(window).on('scroll', function(){
        if($(this).scrollTop() > 212){
            $searchCate.addClass('sp');
        }else {
            $searchCate.removeClass('sp');
        }
    });
    $(window).trigger('scroll');
    //向文档添加单个节点函数
    function addItem(obj, key){
        var title = obj.title,
            score = obj.rating.numRaters >= 10 ? obj.rating.average : '',
            numRaters = obj.rating.numRaters >= 10 ? '(' + obj.rating.numRaters + '评价)': (obj.rating.numRaters == 0 ? '(目前无评价)' : '(少于10评价)'),
            singer = obj.attrs.singer ? obj.attrs.singer[0] : '',
            // type = obj.tags[5].name,
            data = obj.attrs.pubdate ? ' / ' + obj.attrs.pubdate[0].slice(0,4) : '',
            imgURL = obj.image,
            URL = obj.alt,
            posStyle = obj.rating.numRaters >= 10 ? 'style="background-position: 0 ' + (Math.floor(score) + 1)* 11 + 'px"' : '';
        //console.log(title,score,numRaters,singer,type,data,imgURL);
        var $dom = $('<div class="result">\
            <img src="'+ imgURL +'">\
            <div class="music-title">\
                <h5>\
                    <span>[音乐]&nbsp</span>\
                    <a href="javascript:void(0)" onclick="window.open(\'' + URL + '/\')">'+ title +'</a>\
                </h5>\
                <div class="msuic-rating">\
                    <span class="r-star" ' + posStyle + ' ></span>\
                    <span>' + score + '</span>\
                    <span class="r-ev">' + numRaters + '</span>\
                    <span>' + singer + data + '</span>\
                </div>\
            </div>\
            <p class="rating-info">这个地方有评论，但是豆瓣新API不能获取了，(ノಠ益ಠ)ノ彡┻━┻....所以我假装有评论的样子....假装有评论的样子....假装有评论的样子....假装有评论的样子....假装有评论的样子...</p>\
        </div>');
        $dom.appendTo($list);
        if(!posStyle){
            $dom.find('.r-star').remove();
        }//投票人数不足时，删除评分样式
    }
    //JSONP获取音乐数据
    function getMusic(key, page){
        $.ajax({
            type: 'GET',
            url: 'https://api.douban.com/v2/music/search?q=' + key + '&start=' + page*20,
            dataType: 'jsonp',
            success: function(json){
                if(isFirstLoaded){
                    if(curPage == 1 && !json.musics[0]){
                        $noResult.show();
                        $footer.show();
                        $toTop.hide();
                        return;
                    }
                    if(json.count < 5){//条目过少时，footer不再自适应，固定底部定位
                        $footer.css('bottom', '-600px');
                        $toTop.hide();
                    }else{
                        $footer.css('bottom', '-80px');
                        $toTop.show();
                    }
                    isFirstLoaded = false;
                }
                var tempObj;
                for(var i = 0; i < 20; i++){
                    tempObj = json.musics[i];
                    if(tempObj){
                        addItem(json.musics[i], key);       
                    }else{
                        $more.hide();
                        $footer.show();
                        return;
                    }
                }
                $footer.show();
                $more.show().text('显示更多');
            }
        });
    }
    //点击搜索或enter处理函数
    var handler = function(){
        isFirstLoaded = true;
        $list.empty();
        $footer.hide();
        $noResult.hide();
        $more.hide();

        curPage = 0;
        curKey = $sch.val();
        $topSch.val(curKey);//顶级搜索栏与普通导航栏同步
        $topSch.css('color','black');
        var df = $sch[0].defaultValue;
        if(curKey !== df){
            $firstMsg.hide();
            $head.show();
            getMusic(curKey, curPage++);
        }
    };
    $btn.on('click', handler);
    $(document).on('keydown', function(e){
        if(e.which === 13){
            handler();
        }
    });
    //点击加载更多处理函数
    $more.on('click', function(){
        $more.text('加载中...');
        getMusic(curKey, curPage++);
    });
});