
import tool from './tool.js'

function getBaseHref() {
    var oBase = document.getElementsByTagName('base')[0];
    if (!oBase) {
        return '';
    }
    var href = oBase.getAttribute('href');
    return href ? href.replace(/^(https?\:)?\/\/[^\/]*/, '') : '';
}

function cookieWriter(key, value, options) {
    var path, expires, defaultPath = getBaseHref();
    options = options || {};

    path = tool.isDefined(options.path) ? options.path : defaultPath;
    if (tool.isUndefined(value)) {
        expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
    }
    if (tool.isString(expires)) {
        expires = new Date(expires);
    }
    var str = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    str += expires ? ';expires=' + expires.toUTCString() : '';
    str += path ? ';path=' + path : '';
    str += options.domain ? ';domain=' + options.domain : '';
    str += options.secure ? ';secure' : '';
    document.cookie = str;
}

function cookiesReader() {
    var currentCookie = document.cookie || '',
        cookie, index, lastCookies = {}, name;

    var cookieArray = currentCookie.split('; ');

    for (var i = 0; i < cookieArray.length; i++) {
        cookie = cookieArray[i];
        index = cookie.indexOf('=');
        if (index > 0) {
            name = decodeURIComponent(cookie.substring(0, index));
            lastCookies[name] = decodeURIComponent(cookie.substring(index + 1));
        }
    }
    return lastCookies;
}

function getCookieByKey(key) {
    var lastCookies = cookiesReader();
    for (var i in lastCookies) {
        if (i === key) {
            return lastCookies[i];
        }
    }
    return '';
}

function toJson(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

const $cookie={
    //获取cookie
    get: function (key) {
        return getCookieByKey(key);
    },
    //获取cookie对象
    getObject: function (key) {
        if(getCookieByKey(key)){
            return JSON.parse(getCookieByKey(key));
        }else{
            return null;
        }

    },
    //获取全部cookies，allParse 是否完全解析josn
    getAll: function (allParse) {
        if (!allParse) {
            return cookiesReader();
        }
        var lastCookies = cookiesReader();

        for (var i in lastCookies) {
            lastCookies[i] = toJson(lastCookies[i]);
        }
        return lastCookies;
    },
    //设置或者修改cookie，value是字符串
    put: function (key, value, options) {
        cookieWriter(key, value, options);
    },
    //设置或者修改cookie,value是对象
    putObject: function (key, value, options) {
        value = JSON.stringify(value);
        cookieWriter(key, value, options);
    },
    //移除cookie
    remove: function (key) {
        cookieWriter(key);
    },
    //移除全部cookies
    removeAll: function () {
        var cookies = cookiesReader();
        var keys = Object.keys(cookies);
        for (var i in keys) {
            this.remove(keys[i]);
        }
    }
};
export default $cookie;