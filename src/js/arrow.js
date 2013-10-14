"use strict"

/**
 * ProjectName: ArrowJS
 * Name: Petar Bojinov
 * Email: petar@ conduit.com
 * Github: https: //github.com/chrisenytc/generator-library
 */

window.Arrow = (function(window, document, undefined) {

    var version = '0.1.0',
        Arrow = {},
        browser,
        browserVersion;

    (function() {
        var ua = navigator.userAgent,
            N = navigator.appName,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
        M = M[2] ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
        browser = M[0];
        browserVersion = M[1];
    })();

    var show = function() {

    };

    var hide = function() {

    };

    /** 
     * Public Functions
     */

    Arrow._version = version;
    Arrow._browser = [browser, browserVersion];
    Arrow.show = show;
    Arrow.hide = hide;

    return Arrow;

})(this, this.document);
