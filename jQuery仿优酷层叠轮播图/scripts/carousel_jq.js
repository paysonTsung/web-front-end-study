var $csArr = $('.carousel li'),
    $idxArr = $('.index i'),
    $prev = $('.left_nav'),
    $next = $('.right_nav'),
    posObj = {
        topPosObj: {
            position: 'absolute',
            display: 'block',
            zIndex: 3
        },
        midPosObj: {
            position: 'absolute',
            display: 'block',
            zIndex: 2
        },
        bottomPosObj: {
            position: 'absolute',
            display: 'block',
            zIndex: 0,
        },

        prevOuterDivObj: {
            width: 530,
            height: 100,
            marginTop: 85,
            left: -530,
            opacity: 0
        },
        prevDivObj: {
            width: 530,
            height: 224,
            marginTop: 23,
            left: 0,
            opacity: 1
        },
        mainDivObj: {
            width: 640,
            height: 270,
            marginTop: 0,
            left: 165,
            opacity: 1
        },
        nextDivObj: {
            width: 530,
            height: 224,
            marginTop: 23,
            left: 440,
            opacity: 1
        },
        nextOuterDivObj: {
            width: 530,
            height: 100,
            zIndex: 0,
            marginTop: 85,
            left: 970,
            opacity: 0
        },

        mainImgObj: {
            width: 640,
            height: 270 
        },
        sideImgObj: {
            width: 530,
            height: 224
        },
        outerImgObj: {
            width:  530,
            height: 100
        }
    };
    
var Carousel = function(imgAmount, csArr, idxArr, posObj){
    this.imgAmount = imgAmount;
    this.curMain = 0;
    this.curLeft = imgAmount - 1;
    this.curRight = 1;
    this.curLeftOuter = imgAmount - 2;
    this.curRightOuter = 2;
    this.csArr = csArr;
    this.idxArr = idxArr;
    this.posObj = posObj;
    this.csTimer = null;
    this.init();
};
Carousel.prototype.setTimer = function(){
    var self = this;    
    this.csTimer = setInterval(function(){
        self.nextNav();
    },3000);
}
Carousel.prototype.init = function(){
    this.csArr.css(this.posObj.nextOuterDivObj);

    this.csArr.eq(this.curMain)
                               .css(this.posObj.mainDivObj)
                               .css(this.posObj.topPosObj);
    this.csArr.eq(this.curMain).find('img')
                                           .css(this.posObj.mainImgObj);
    this.csArr.eq(this.curLeft)
                               .css(this.posObj.prevDivObj)
                               .css(this.posObj.midPosObj);
    this.csArr.eq(this.curLeft).find('img').css(this.posObj.sideImgObj);
    this.csArr.eq(this.curRight)
                                .css(this.posObj.nextDivObj)
                                .css(this.posObj.midPosObj);
    this.csArr.eq(this.curRight).find('img')
                                            .css(this.posObj.sideImgObj);
    this.csArr.eq(this.curLeftOuter)
                                    .css(this.posObj.prevOuterDivObj)
                                    .css(this.posObj.bottomPosObj);
    this.csArr.eq(this.curLeftOuter).find('img').css(this.posObj.outerImgObj);
    this.csArr.eq(this.curRightOuter)
                                     .css(this.posObj.nextOuterDivObj)
                                     .css(this.posObj.bottomPosObj);
    this.csArr.eq(this.curRightOuter).find('img')
                                                 .css(this.posObj.outerImgObj);
    this.setTimer();
};
Carousel.prototype.prevNav = function(){
    this.curRightOuter = this.curRight;
    this.curRight = this.curMain;
    this.curMain = this.curLeft;
    this.curLeft = this.curLeftOuter;
    this.curLeftOuter = (this.curLeftOuter === 0) ?
                            this.imgAmount - 1 :
                            this.curLeftOuter - 1;
    this.update();
};
Carousel.prototype.nextNav = function(){
    this.curLeftOuter = this.curLeft;
    this.curLeft = this.curMain;
    this.curMain = this.curRight;
    this.curRight = this.curRightOuter;
    this.curRightOuter = (this.curRightOuter === this.imgAmount - 1) ?
                            0 :
                            this.curRightOuter + 1;
    this.update();
};
Carousel.prototype.selectNav = function(index){
    this.chooseUpdate();    
    this.curMain = index;
    this.curLeft = (index === 0) ? this.imgAmount - 1 : index - 1;
    this.curRight = (index === this.imgAmount - 1) ? 0 : index + 1;
    this.curLeftOuter = (this.curLeft === 0) ? this.imgAmount - 1 : this.curLeft - 1;
    this.curRightOuter = (this.curRight === this.imgAmount - 1) ? 0 : this.curRight + 1;
    this.update();
};
Carousel.prototype.update = function(){
    var self = this;
    var cnt = 0;
    this.csArr.removeClass();
    this.csArr.eq(this.curLeftOuter)
                                    .css(this.posObj.bottomPosObj)
                                    .animate(this.posObj.prevOuterDivObj, 500, 
                                    function(){
                                        cnt++;
                                        if(cnt === 2){
                                            self.csArr.eq(self.curMain).addClass('cs_main');
                                        }
                                    });
    this.csArr.eq(this.curLeftOuter).find('img')
                                                .animate(this.posObj.outerImgObj, 500);
    this.csArr.eq(this.curLeft)
                               .css(this.posObj.midPosObj)
                               .animate(this.posObj.prevDivObj, 500);
    this.csArr.eq(this.curLeft).find('img')
                                           .animate(this.posObj.sideImgObj, 500);
    this.csArr.eq(this.curMain)
                               .css(this.posObj.topPosObj)
                               .animate(this.posObj.mainDivObj, 500);
    this.csArr.eq(this.curMain).find('img')
                                           .animate(this.posObj.mainImgObj, 500);
    this.csArr.eq(this.curRight)
                                .css(this.posObj.midPosObj)
                                .animate(this.posObj.nextDivObj, 500);
    this.csArr.eq(this.curRight).find('img')
                                            .animate(this.posObj.sideImgObj, 500);
    this.csArr.eq(this.curRightOuter)
                                     .css(this.posObj.bottomPosObj)
                                     .animate(this.posObj.nextOuterDivObj, 500, 
                                     function(){
                                         cnt++;
                                         if(cnt === 2){
                                             self.csArr.eq(self.curMain).addClass('cs_main');
                                         }
                                     });
    this.csArr.eq(this.curRightOuter).find('img')
                                                 .animate(this.posObj.outerImgObj, 500);
   
    //this.csArr.eq(this.curMain).addClass('cs_main');

    $idxArr.removeClass();
    $idxArr.eq(this.curMain).addClass('choose');

    clearInterval(this.csTimer);
    this.setTimer();
};
Carousel.prototype.chooseUpdate = function(){
    this.csArr.eq(this.curLeft).animate({width:0,height:0,left:300,opacity:0},500);
    this.csArr.eq(this.curMain).animate({width:0,height:0,left:485,opacity:0},500);
    this.csArr.eq(this.curRight).animate({width:0,height:0,left:670,opacity:0},500);
}

var cs = new Carousel(11, $csArr, $idxArr, posObj);
$prev.click(function(){
    if(!$csArr.is(':animated')){
        cs.prevNav();        
    }
});
$next.click(function(){
    if(!$csArr.is(':animated')){
        cs.nextNav();        
    }
});
$idxArr.click(function(e){
    if(!$csArr.is(':animated')){
        if($(e.target).index() === cs.curLeft){
            cs.prevNav();
        }else if($(e.target).index() === cs.curRight){
            cs.nextNav();
        }else if($(e.target).index() !== cs.curMain){
            cs.selectNav($(e.target).index());
        }
    }
});