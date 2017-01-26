/**
 * Project Name: ArrowJS
 * Name: Petar Bojinov
 * Github: https://github.com/pbojinov/arrowjs
 */

/* Pass in (window, document, undefined) to have an unmodified version of the variable in our function scope */
window.Arrow = (function (window, document, undefined) {

    'use strict';

    var version = '0.1.9',
        Arrow = {},
        arrowNode,
        browser = '',
        browserVersion = 0,
        visibleHeight = 0,
        visibleWidth = 0;

    /**
     * Other available arrows to use. Planning on adding more colors
     *
     * https://i.imgur.com/aMwoyfN.png // orange arrow
     * https://i.imgur.com/MZRB3eb.png // green arrow 
     */

    /**
     * Determine browser type and browser version
     */
    (function () {
        var N = navigator.appName, ua = navigator.userAgent, tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) {
            M[2] = tem[1];
        }
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        browser = (M[0].toLowerCase()=="netscape")?
			"IE11":
			(ua.toLowerCase().indexOf('edge')!=-1)?
				"edge":
				M[0].toLowerCase();
		
        browserVersion = parseInt(M[1], 10);
    })();

    /**
     * Fade in the arrow
     * Use DXImageTransform.Microsoft.Alpha for IE8
     *
     * @method _increaseOpacity
     * @private
     */
    function _increaseOpacity(milliseconds) {
        var arrow = document.getElementById('arrow-' + browser);
        arrow.style.display = 'block';
        var i = 0.0,
            ieI = 0; //need to use whole numbers for IE filter
        var x = setInterval(function () {
            i += 0.1;
            ieI += 10;
            if ((browser === 'msie') && (browserVersion <= 8)) {
                if (arrow.filters) {
                    arrow.filters.item('DXImageTransform.Microsoft.Alpha').opacity = ieI;
                }
            } else {
                arrow.style.opacity = i;
            }
        }, 50);
        setTimeout(function() {
            clearInterval(x);
        }, 600);
        setTimeout(function() {
            _hide();
        }, milliseconds || 6000);
        // TODO use requestAnimationFrame - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    }

    /**
     * Fade out the arrow
     * Use DXImageTransform.Microsoft.Alpha for IE8
     *
     * @method _decreaseOpacity
     * @private
     */
    function _decreaseOpacity() {
        var arrow = document.getElementById('arrow-' + browser);
        var i = 1.0,
            ieI = 100; //need to use whole numbers for IE filter
        var x = setInterval(function () {
            i -= 0.1;
            ieI -= 10;
            if ((browser === 'msie') && (browserVersion <= 8)) {
                if (arrow.filters) {
                    arrow.filters.item('DXImageTransform.Microsoft.Alpha').opacity = ieI;
                }
            } else {
                arrow.style.opacity = i;
            }
        }, 50);
        setTimeout(function () {
            clearInterval(x);
            arrow.style.display = 'none';
        }, 600);
        // TODO use requestAnimationFrame - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    }

    /*
     * How to access vendor specific properties with JS
     *
     * node.style.webkitTransform = '';
     * node.style.MozTransform = '';
     * node.style.msTransform = '';
     * node.style.OTransform = '';
     * node.style.transform = '';
     */

    /**
     * Apply modern browser style then browser specific styles to arrow
     *
     * @method _applyStyleModern
     * @param node
     * @private
     */
    function _applyStyleModern(node) {
        node.style.position = 'fixed';
        node.style.zIndex = 999;
        node.style.display = 'none';
        node.style.height = '309px';
        node.style.width = '186px';
        node.style.opacity = 0;
        node.style.backgroundImage = 'url(https://i.imgur.com/aMwoyfN.png)';
        node.style.backgroundRepeat = 'no-repeat';
        node.style.backgroundPositionX = '0';
        node.style.backgroundPositionY = '0';
    }

    /**
     * IE 8 specific styles.
     *
     * @method _applyStyleIE8
     * @param node
     * @private
     */
    function _applyStyleIE8(node) {
        node.style.top = '10px';
        node.style.left = '20px';

        // Only one filter style can exist so we concatenate them to one line
        var opacity = 'progid:DXImageTransform.Microsoft.Alpha(opacity=0) ',
            imgSrc = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="https://i.imgur.com/aMwoyfN.png", sizingMethod="scale") ',
            rotation = 'progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=1.2246063538223773e-16, M21=-1.2246063538223773e-16, M22=-1, SizingMethod="auto expand") ';

        node.style.filter = opacity + imgSrc + rotation;

        /*
         * CSS looks like this
         *
         * filter: progid:DXImageTransform.Microsoft.Matrix(
         *    M11 = COS_THETA,
         *    M12 = -SIN_THETA,
         *    M21 = SIN_THETA,
         *    M22 = COS_THETA,
         *    sizingMethod = 'auto expand'
         * );
         *
         * ---
         * How to access IE filters with JS
         *
         * node.filters.item('DXImageTransform.Microsoft.Alpha').opacity = 0;
         * node.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = 'https://i.imgur.com/aMwoyfN.png';
         * node.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').sizingMethod = 'scale';
         * node.filters.item('DXImageTransform.Microsoft.Matrix').M11 = 1;
         * node.filters.item('DXImageTransform.Microsoft.Matrix').M12 = 1.2246063538223773e-16;
         * node.filters.item('DXImageTransform.Microsoft.Matrix').M21 = -1.2246063538223773e-16;
         * node.filters.item('DXImageTransform.Microsoft.Matrix').M22 = -1;
         * node.filters.item('DXImageTransform.Microsoft.Matrix').SizingMethod = 'auto expand';
         *
         */
    }

    /**
     * IE 9 styles (positioning in this case since we need no rotations).
     *
     * @method _applyStyleMs
     * @param node
     * @private
     */
    function _applyStyleMs(node) {
        node.style.bottom = '50px';
        node.style.left = '67%';
    }


    /**
     * Firefox 20+ styles, 20+ is when new download manager was introduced.
     *
     * @method _applyStyleMoz
     * @param node
     * @private
     */
    function _applyStyleMoz(node) {
        node.style.top = '0px';
        node.style.right = '37px';
        node.style.transform = 'rotateX(180deg) rotateY(180deg)';
        node.style.MozTransform = 'rotateX(180deg) rotateY(180deg)';
    }
	
	

    /**
     * Chrome's a simple one
     * P.S. We don't care of Safari or Opera right now
     *
     * @method _applyStyleWebkit
     * @param node
     * @private
     */
    function _applyStyleWebkit(node) {
        node.style.bottom = '50px'; 
        node.style.left = '20px';
    }
	
    /**
     * Safari
     *
     * @method _applyStyleSafari
     * @param node
     * @private
     */
    function _applyStyleSafari(node) {
        node.style.top = '0px';
		node.style.right = '80px';
		node.style.transform = 'rotateX(180deg) rotateY(180deg)';
		node.style.webkitTransform = 'rotateX(180deg) rotateY(180deg)';
    }

    /**
     * Apply vendor specific styles based on the browser and browser version.
     *
     * @method _setStyleType
     * @param node
     * @private
     */
    function _setStyleType(node) {

        //add our basic styles then do vendor prefixes
        _applyStyleModern(node);

        if (browser === 'msie') {
            if (browserVersion === 8) {
                _applyStyleIE8(node);
            } else if ((browserVersion === 9) || (browserVersion === 10)) {
                _applyStyleMs(node);
            }
        } else if (browser === 'chrome' || browser === 'opera' ) {
            _applyStyleWebkit(node);
        } else if (browser === 'safari') {
            _applyStyleSafari(node);
		} else if (browser === 'IE11' || browser === 'edge') {
            _applyStyleMs(node);
        } else if (browser === 'firefox') {
            //New download manager with arrow introducted in version 20
            if (browserVersion >= 20) {
                _applyStyleMoz(node);
            }
        }
    }

    /**
     * Create arrow element and give it an id specific to the browser.
     *
     * @method _buildArrow
     * @returns div {HTMLElement}
     * @private
     */
    function _buildArrow() {
        var div = document.createElement('div');
        div.setAttribute('id', 'arrow-' + browser);
        arrowNode = div; //only used in resizing ie9
        return div;
    }

    /**
     * Add HTML node to the page, in this case our arrow.
     *
     * @method _injectNode
     * @param node
     * @private
     */
    function _injectNode(node) {
        document.body.appendChild(node);
    }

    /**
     * Does our arrow exist on the page?
     *
     * @returns {boolean}
     * @private
     */
    function _isExist() {
        return !!(document.getElementById('arrow-' + browser));
    }

    /**
     * Initialize our arrow internals
     * ---
     * Should only be run once per Arrow instance.
     * In the future would be nice to manage multiple arrows.
     *
     * @method _initArrow
     * @private
     */
    function _initArrow() {
        var arrow = _buildArrow();
        _setStyleType(arrow);
        _calculateArrowPosition();
        _injectNode(arrow);
        _addWindowEvent('resize', _calculateArrowPosition);
        _addWindowEvent('scroll', _calculateArrowPosition);
    }

    /**
     * Attach an event on the window object and a function to fire when it fires
     *
     * @method _addWindowEvent
     * @param event {string}
     * @param functionReference {Object}
     * @private
     */
    function _addWindowEvent(event, functionReference) {
        if (window.addEventListener) {
            window.addEventListener(event, functionReference, false);
        } else if (window.attachEvent) {
            window.attachEvent(event, functionReference);
        }
    }

    _initArrow(); //our constructor, fired when library loads

    /**
     * Calculate current visible height and width of the screen and stores them for library use.
     * Used to make sure IE9 arrow is in the right place.
     * ---
     * !! Possible performance bottleneck for IE/other browser if something is constantly resizing the window.
     *
     * @method _calculateArrowPosition
     * @private
     */
    function _calculateArrowPosition() {
        if (typeof( window.innerWidth ) === 'number') {
            //Non-IE
            visibleWidth = window.innerWidth;
            visibleHeight = window.innerHeight;
        } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight )) {
            //IE 6+ in 'standards compliant mode'
            visibleWidth = document.documentElement.clientWidth;
            visibleHeight = document.documentElement.clientHeight;
        }

        if ((browser === 'msie') && (browserVersion === 9)) {
            if (visibleWidth < 1005) {
                arrowNode.style.bottom = '85px';
            } else if (visibleWidth > 1006) {
                arrowNode.style.bottom = '50px';
            }
        }
    }

    /**
     * Hide the arrow
     * If it doesn't exist it will throw an exception
     *
     * @method _hide
     * @private
     */
    function _hide() {
        if (_isExist()) {
            _decreaseOpacity();
        }
        else {
            throw 'Invalid usage: There are no arrows on the page.';
        }
    }

    /**
     * Public API
     */

    /**
     * Show the arrow.
     * If it doesn't exist it will throw an exception
     *
     * @method show
     * @param seconds {int} optional parameter, length in seconds to fade out after
     * @public
     */
    function show(seconds) {
        if (_isExist()) {
            _increaseOpacity(seconds);
        } else {
            throw 'Invalid usage: arrow does not exist';
        }
    }

    /**
     * Expose Public Data and Functions
     */

    Arrow._version = version;
    Arrow._browser = browser;
    Arrow._browserVersion = browserVersion;
    Arrow.show = show;

    return Arrow;

})(window, window.document);
