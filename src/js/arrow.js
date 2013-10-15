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
        browserVersion,
        arrowColor = 'orange';

    //http://storage.conduit.com/arrowjs/arrow_orange.png
    //http://storage.conduit.com/arrowjs/arrow_green.png

    //determine browser type and browser version
    (function() {
        var ua = navigator.userAgent,
            N = navigator.appName,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
        M = M[2] ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
        browser = M[0].toLowerCase();
        browserVersion = M[1];
    })();


    /**
     * Apply modern browser style then browser specific styles to arrow
     */

    //Always apply all modern browsers first, then vendor specific
    var _applyStyleModern = function(node) {
        node.style.position = 'absolute';
    };

    //IE 8 styles
    var _applyStyleIE8 = function(node) {
        node.style.position = 'absolute';
    };  

    //IE 9 styles
    var _applyStyleMs = function(node) {
        node.style.position = 'absolute';
    };      

    //Firefox
    var _applyStyleMoz= function(node) {
        node.style.position = 'absolute';
    };

    //Chrome, Opera
    var _applyStyleWebkit = function(node) {
        node.style.position = 'absolute';
    };

    //Determine where to place arrow based on browser
    var _caculateArrowPosition = function() {

    };

    var _getStyleType = function() {

        if (browser === 'msie') {
            if (browserVersion === '8.0') {

            } else if ((browserVersion === '9.0') || (browserVersion === '10.0')) {

            } else {
                //we just throw it the full feature set
            }

        } else if (browser === 'chrome') {

        } else if (browser === 'firefox') {

        } else {
            //we just throw it the full feature set
        }

    };

    var _buildArrow = function() {
        var div = document.createElement('div');
            div.setAttribute('id', 'arrow-' + browser);
    };

    var _injectArrow = function() {

    };

    var _applyArrowStyles = function() {

    };

    var show = function() {

    };

    var hide = function() {

    };

    /** 
     * Expose Public Data and Functions
     */

    Arrow._version = version;
    Arrow._browser = [browser, browserVersion];
    Arrow.show = show;
    Arrow.hide = hide;

    return Arrow;

})(this, this.document);
