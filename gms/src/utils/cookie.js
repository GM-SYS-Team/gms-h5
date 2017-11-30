/**
 * 获取cookie的值
 * @param name
 * @return {null}
 */
export const getCookie =(name)=> {
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) {
        return unescape(arr[2]);
    }
    return null;
}

/**
 * 设置cookie的值
 * 禁止写入中文
 * @param name
 * @param value
 * @param minutes
 */
export const setCookie =(name,value,minutes)=> {
    var exp  = new Date();
    exp.setTime(exp.getTime() + minutes*60*1000);
    if((typeof value == "string")&&(value.length > 0)){
        document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
    }else{
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if(cval!=null){
            document.cookie=name +"="+escape(cval)+";expires="+exp.toGMTString();
        }
    }
}

/**
 * 删除cookie
 * @param name
 */
export const delCookie =(name)=> {
    setCookie(name, "", -1);
}

/**
 * 重置过期时间
 * @param name
 * @param value
 * @param minutes
 */
export const resetCookieExpireDate =(name,minutes)=> {
    var exp  = new Date();
    exp.setTime(exp.getTime() + minutes*60*1000);

    var cval = getCookie(name);
    if(cval != null){
        document.cookie=name +"="+cval+";expires="+exp.toGMTString();
    }
}