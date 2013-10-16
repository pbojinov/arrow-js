/**
 * ProjectName: ArrowJS
 * Name: Petar Bojinov
 * Email: petar@conduit.com
 * Github: https: //github.com/chrisenytc/generator-library
 */

window.Arrow = (function (window, document, undefined) {

    "use strict";

    var version = '0.1.0',
        Arrow = {},
        arrowNode,
        browser = '',
        browserVersion = '',
        visibleHeight = 0,
        visibleWidth = 0;

    //http://storage.conduit.com/arrowjs/arrow_orange.png
    //http://storage.conduit.com/arrowjs/arrow_orange.gif
    //http://storage.conduit.com/arrowjs/arrow_green.png
    //http://storage.conduit.com/arrowjs/arrow_green.gif

    //determine browser type and browser version
    (function () {
        var N = navigator.appName, ua = navigator.userAgent, tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        browser = M[0].toLowerCase();
        browserVersion = M[1];
    })();

    /**
     * Apply modern browser style then browser specific styles to arrow
     */

    function _increaseOpacity() {
        var arrow = document.getElementById('arrow-' + browser);
        arrow.style.display = 'block';
        var i = 0.0,
            ieI = 0; //need to use whole numbers for IE filter
        var x = setInterval(function () {
            i += 0.1;
            ieI += 10;
            if ((browser === 'msie') && (browserVersion <= 8)) {
                if (arrow.filters) {
                    arrow.filters.item("DXImageTransform.Microsoft.Alpha").opacity = ieI;
                }
            } else {
                arrow.style.opacity = i;
            }
        }, 50);
        setTimeout(function () {
            clearInterval(x);
        }, 600);
        // TODO use requestAnimationFrame instead
        // see http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    }

    function _decreaseOpacity() {
        var arrow = document.getElementById('arrow-' + browser);
        var i = 1.0,
            ieI = 100; //need to use whole numbers for IE filter
        var x = setInterval(function () {
            i -= 0.1;
            ieI -= 10;
            if ((browser === 'msie') && (browserVersion <= 8)) {
                if (arrow.filters) {
                    arrow.filters.item("DXImageTransform.Microsoft.Alpha").opacity = ieI;
                }
            } else {
                arrow.style.opacity = i;
            }
        }, 50);
        setTimeout(function () {
            clearInterval(x);
            arrow.style.display = 'none';
        }, 600);
        // TODO use requestAnimationFrame instead
        // see http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    }

    /*
     node.style.webkitTransform = "";
     node.style.MozTransform = "";
     node.style.msTransform = "";
     node.style.OTransform = "";
     node.style.transform = "";
     */

    //Always apply all modern browsers first, then vendor specific

    function _applyStyleModern(node) {
        node.style.position = 'absolute';
        //TODO
        //top, left, right, bottom position?
        node.style.zIndex = 999;
        node.style.display = 'none';
        node.style.height = '309px';
        node.style.width = '186px';
        node.style.opacity = 0;
        node.style.backgroundImage = 'url(http://storage.conduit.com/arrowjs/arrow_orange.png)';
        node.style.backgroundRepeat = 'no-repeat';
        node.style.backgroundPositionX = '0';
        node.style.backgroundPositionY = '0';
    }

    //IE 8 styles

    function _applyStyleIE8(node) {
        node.style.bottom = '0px';
        node.style.left = '20px';

        //we never set the filter in the first place...so IE cannot find it
        node.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = 'http://storage.conduit.com/arrowjs/arrow_orange.png';
        node.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').sizingMethod = 'scale';
        node.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 0;
        node.filters.item("DXImageTransform.Microsoft.Matrix").M11 = 1;
        node.filters.item("DXImageTransform.Microsoft.Matrix").M12 = 1.2246063538223773e-16;
        node.filters.item("DXImageTransform.Microsoft.Matrix").M21 = -1.2246063538223773e-16;
        node.filters.item("DXImageTransform.Microsoft.Matrix").M22 = -1;
        node.filters.item("DXImageTransform.Microsoft.Matrix").SizingMethod = 'auto expand';
    }

    //IE 9 styles

    function _applyStyleMs(node) {
        node.style.bottom = '50px';
        node.style.left = '67%';
    }

    //Firefox 20+

    function _applyStyleMoz(node) {
        node.style.top = '0px';
        node.style.right = '40px';
        node.style.transform = 'rotateX(180deg) rotateY(180deg)';
        node.style.MozTransform = 'rotateX(180deg) rotateY(180deg)';
    }

    //Chrome

    function _applyStyleWebkit(node) {
        node.style.bottom = '0px';
        node.style.left = '20px';
    }

    function _setStyleType(node) {

        var versionNum = parseInt(browserVersion, 10) || 0;
        _applyStyleModern(node); //add our basic styles then do vendor prefixes

        if (browser === 'msie') {
            if (versionNum === 8) {
                _applyStyleIE8(node);
            } else if ((versionNum === 9) || (versionNum === 10)) {
                _applyStyleMs(node);
            }
        } else if (browser === 'chrome') {
            _applyStyleWebkit(node);
        } else if (browser === 'firefox') {
            //New download manager with arrow introducted in version 20
            if (versionNum >= 20) {
                _applyStyleMoz(node);
            }
        }
        //TODO windows safari download arrow?
    }

    //Create div container for arrow and set its id to the browser type

    function _buildArrow() {
        var div = document.createElement('div');
        div.setAttribute('id', 'arrow-' + browser);
        arrowNode = div; //only used in resizing ie9
        return div;
    }

    //Add node to the page, in this case our arrow

    function _injectNode(node) {
        document.body.appendChild(node);
    }

    function _isExist() {
        return !!(document.getElementById('arrow-' + browser));
    }

    //should only be run once per Arrow instance
    //in the future would be nice to manage multiple arrows

    function _initArrow() {
        var arrow = _buildArrow();
        _setStyleType(arrow);
        _calculateArrowPosition();
        _injectNode(arrow);
    }

    /**
     * Public API
     */

    function show() {
        if (_isExist()) {
            _increaseOpacity();
        } else {
            throw 'Invalid usage: arrow does not exist';
        }
    }

    function hide() {
        if (_isExist()) {
            _decreaseOpacity();
        } else {
            throw 'Invalid usage: There are no arrows on the page.';
        }
    }

    _initArrow(); //fired when library loads

    window.addEventListener('resize', _calculateArrowPosition);

    //Make sure IE9 arrow is in the right place
    function _calculateArrowPosition () {
        if (typeof( window.innerWidth ) === 'number') {
            //Non-IE
            visibleWidth = window.innerWidth;
            visibleHeight = window.innerHeight;
        } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
            //IE 6+ in 'standards compliant mode'
            visibleWidth = document.documentElement.clientWidth;
            visibleHeight = document.documentElement.clientHeight;
        }

        if ((browser === 'msie') && (browserVersion === '9.0')) {
            if (visibleWidth < 1005) {
                arrowNode.style.bottom = '85px';
            } else if (visibleWidth > 1006) {
                arrowNode.style.bottom = '50px';
            }
        }
    }

    /**
     * Expose Public Data and Functions
     */

    Arrow._version = version;
    Arrow._browser = browser;
    Arrow._browserVersion = browserVersion;
    Arrow.show = show;
    Arrow.hide = hide;

    return Arrow;

})(window, window.document);
