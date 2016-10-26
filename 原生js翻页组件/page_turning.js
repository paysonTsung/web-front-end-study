var curPage = 1;
    itemCount = 155,
    itemOfPage = 8,
    pageCount = Math.ceil(itemCount/itemOfPage),
    lastPageItemCount = itemCount % itemOfPage,
    $pageList = document.getElementById('changePage'),
    $itemList = document.getElementsByClassName('item'),
    forbid = false,
    pageInfo =  function(curPage, pageCount){
        if(curPage === 1){
            return {
                'first': false,
                'last': true,
                'pre': false,
                'next': true,
                'pageBegin': 1,
                'pageEnd': 9,
            }
        }else if(curPage === pageCount){
            return {
                'first': true,
                'last': false,
                'pre': true,
                'next': false,
                'pageBegin': pageCount - 8,
                'pageEnd': pageCount,
            }
        }else if(curPage >= 2 && curPage <= 5){
            return {
                'first': false,
                'last': true,
                'pre': true,
                'next': true,
                'pageBegin': 1,
                'pageEnd': 7,
            }
        }else if(curPage <= pageCount - 1 && curPage >= pageCount - 4){
            return {
                'first': true,
                'last': false,
                'pre': true,
                'next': true,
                'pageBegin': pageCount - 6,
                'pageEnd': pageCount,
            }
        }else{
            return {
                'first': true,
                'last': true,
                'pre': true,
                'next': true,
                'pageBegin': curPage - 2,
                'pageEnd': curPage + 2,
            }
        }
    },
    addPagination = function(parentNode, msgObj){
        while(parentNode.firstElementChild){
            parentNode.removeChild(parentNode.firstElementChild);
        }
        if(msgObj['first']){
            var li = document.createElement('li');
            li.className = 'first-page';
            li.innerText = '⚪首页⚪'
            parentNode.appendChild(li);
        }
        if(msgObj['pre']){
            var li = document.createElement('li');
            li.className = 'pre-page';
            li.innerText = '<上一页'
            parentNode.appendChild(li);
        }
        for(var i = msgObj['pageBegin']; i <= msgObj['pageEnd']; i++){
            var li = document.createElement('li');
            if(curPage === i){
                li.className = 'cur-page';
            }else{
                li.className = 'page-num';
            }
            li.innerText = i;        
            parentNode.appendChild(li);
        }
        if(msgObj['next']){
            var li = document.createElement('li');
            li.className = 'next-page';
            li.innerText = '下一页>'
            parentNode.appendChild(li);
        }
        if(msgObj['last']){
            var li = document.createElement('li');
            li.className = 'last-page';
            li.innerText = '⚪尾页⚪'
            parentNode.appendChild(li);
        }
    },
    itemMove = function(){
         forbid = true;
         var startMove = function(elem, json, func){
             var getStyle = function(ele, style){
                if(window.getComputedStyle){
                    return window.getComputedStyle(ele,null)[style];
                }else{
                    return ele.currentStyle[style];
                }
            };
            clearInterval(elem.timer);
            var iSpeed;
            var iCur;
            var bStop;
            elem.timer = setInterval(function(){
                bStop = true;
                for(var attr in json){
                    iCur = attr === 'opacity' ? parseFloat(getStyle(elem,attr)) * 100 : parseInt(getStyle(elem,attr));
                    iSpeed = attr === 'opacity' ? (parseFloat(json[attr])* 100 - iCur) / 7 : (parseInt(json[attr]) - iCur) / 7;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    elem.style[attr] = attr === "opacity" ? (iCur + iSpeed) / 100 : iCur + iSpeed + 'px';
                    if(iCur !== (attr === 'opacity' ? parseFloat(json[attr]) * 100 : parseInt(json[attr]))){
                        bStop = false;
                    }
                }
                if(bStop){	
                    clearInterval(elem.timer);	
                    if(func){
                        func();
                    }
                }
            },30);
        };
        for(var i = 0; i < itemOfPage; i++){
            (function(n){
                setTimeout(function(){
                    startMove($itemList[n],{'left': '650px', 'opacity': 0}, function(){
                        if(curPage === pageCount){
                            for(var k = lastPageItemCount; k < itemOfPage; k++){
                                $itemList[k].style.display = 'none';
                            }
                        }else{
                            for(var k = lastPageItemCount; k < itemOfPage; k++){
                                $itemList[k].style.display = 'list-item';
                            }
                        }
                        for(j = 0; j < itemOfPage; j ++){
                            startMove($itemList[j],{'left': '0', 'opacity': 1});
                        }
                        forbid = false;
                    });
                },50*n);
            }(i))
        }
    };

addPagination($pageList, pageInfo(1, pageCount));

$pageList.onclick = function(e){
    if(forbid){
        return;
    }
    var event = e || windwo.event,
        src = event.target || event.srcElement,
        infoObj = null;
    itemMove();
    if(src.nodeName.toLowerCase() === 'li' && src.className !== 'cur-page'){
        switch(src.className){
            case 'first-page':
                curPage = 1;
                break;
            case 'last-page':
                curPage = pageCount;
                break;
            case 'pre-page':
                curPage--;                    
                break;
            case 'next-page':
                curPage++;                            
                break;
            default:
                curPage = Number(src.innerText);
        }
        infoObj = pageInfo(curPage, pageCount);
        addPagination($pageList, infoObj);
    }
}
