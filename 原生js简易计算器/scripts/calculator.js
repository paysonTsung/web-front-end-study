var btn_wrap = document.getElementsByClassName('c_btn_wrapper')[0];
var content = document.getElementsByTagName('p')[0];
var count = 0;
var bDec = false;
var bOneDec = false;
btn_wrap.onclick = function(e){
    var target = e.target;
    if(target.nodeName.toLowerCase() === 'button'){
        var btnType = target.innerText;
        if(content.innerText == 'Math Error' && btnType != 'AC'){
            return;
        }
        if(btnType == 'AC'){
            bOneDec = false;
            content.innerText = '0';
            count = 1;
        }else if(btnType == 'CE'){
            if(content.innerText != ''){
                if(content.innerText.length === 1){
                    content.innerText = '0';
                    count = 1;
                }else{
                    content.innerText = content.innerText.slice(0,-1);
                    count--;
                }
            }  
        }else if(btnType == '='){
            var text = content.innerText;
            if(!text){
                return;
            }else{
                text = text.replace(/x/g,'*');
                var result,
                    hasDec;
                try{
                    result = eval(text) + '';
                    hasDec = result.search(/\./) > 0;
                    if((hasDec && result.split('.')[1].length > 5) || bDec){              
                        result = (+result).toFixed(5);       
                    }
                    if(hasDec){
                        bOneDec = true;
                    }
                    content.innerText = result;
                    count = result.length;
                }catch(e){
                    content.innerText = 'Math Error';
                }
            }
            bDec = false;     
        }else{
            if(isNaN(+btnType) && btnType != '.'){
                bOneDec = false;
            }
            if(btnType == '.'){
                bDec = true;
                if(bOneDec){
                    return;
                }
                bOneDec = true;
            }
            if(content.innerText == '0' && (!isNaN(+btnType) ||
            btnType == '(' || btnType == ')')){
                content.innerText = '';
            }
            content.innerText += btnType;
            if(count++ >= 44){
                alert('输入的字符过多');
            }
        }   
    }
}