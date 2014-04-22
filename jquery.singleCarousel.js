/*
 * @name jquery.singleCarousel.js
 * @author wilee
 * @time 2014-04-16
 * @param {Object} options 选项参数
 * 
 */

(function($){
    $.singleCarousel = function(){
        var singleCarousel = function(cfg){
            this.$ele = $(cfg.ele);
            this.lists = this.$ele.children() || cfg.lists;
            this.width = cfg.width || this.$ele.width();
            this.intervalTime = cfg.intervalTime || 3000;
            this.moveTime = cfg.moveTime || 300;
            this.preNum = this.lists.length-1,
            this.curNum = 0;
            this.init();
        }
        singleCarousel.prototype = {
            _slide : function(from,to,callback,time){
                var frequence = 10;
                var totalTime = time || 200;
                var changeTimes =  totalTime/frequence;
                var singleChange =  (to-from)/changeTimes;
                var interval = setInterval(function(){
                    from = from + singleChange;
                    changeTimes--
                    if(changeTimes<0 || singleChange == 0){
                        clearInterval(interval)
                        callback(to)
                    }else{
                        callback(from)
                    }        
                },frequence)
            },
            moveTo:function(num){
                var me = this;

                if(num == me.curNum){
                    return;
                }

                var changeWidth = me.width;
                
                me._slide(0,changeWidth,function(curNum){
                    if(curNum<changeWidth){
                        me.lists[me.curNum].style.left = -curNum +'px';
                        me.lists[num].style.left = changeWidth-curNum + 'px';
                    }else{
                        me.lists[me.curNum].style.left = (0-curNum) + 'px';
                        me.lists[num].style.left = '0px';
                        me.preNum = me.curNum;
                        me.curNum = num;
                    }
                },me.moveTime)
            },
            stop:function(){
                clearInterval(this.carousel)
            },
            start:function(){
                var me = this;
                me.carousel = setInterval(function(){
                    var $ele = me.$ele,
                        length = me.lists.length,
                        changeTo;

                    if(me.curNum + 1 >= length){
                        changeTo = 0
                    }else{
                        changeTo = me.curNum + 1; 
                    }

                    me.moveTo(changeTo)
                },me.intervalTime)                
            },
            init : function(){
                this.start();
            }
        }
        return singleCarousel;
    }()
})(jQuery)