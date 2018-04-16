var EDGE_SIZE = 680;

function linkMobileCss() {
    var style_link = document.createElement('link');
    style_link.rel = 'stylesheet';
    style_link.href = '/css/mobile-base.css'; // здесь указывается URL стилевого файла
    style_link.id = 'mobile-base-css';
    var head = document.getElementsByTagName('head');
    head[0].appendChild(style_link);
}

function unlinkMobileCss() {
    var style_link = document.getElementById("mobile-base-css");
    style_link.remove();
}

function isSmallEnough(width)
{
    return width < EDGE_SIZE;
}

var prev_width = window.innerWidth;

function resize() {
    cur_width = window.innerWidth;
    if (isSmallEnough(cur_width) && !isSmallEnough(prev_width))
        linkMobileCss();
    if (isSmallEnough(prev_width) && !isSmallEnough(cur_width))
        unlinkMobileCss();
    prev_width = cur_width;

}

function initialize() {
    cur_width = window.innerWidth;
    if (isSmallEnough(cur_width))
        linkMobileCss();
}

initialize();
window.onresize = resize;
    
