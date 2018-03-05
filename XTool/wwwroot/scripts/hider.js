function get_sender(e) {
    if (!e)
        e = window.event;
    return e.srcElement || e.target;
}

function get_section_content(e) {
    var sender = get_sender(e);
    while (sender && sender.nodeName.toLowerCase() != "section")
        sender = sender.parentNode;
    return sender.querySelector(".section-content");
}

function change_section_content_state(e) {
    var sender = get_sender(e);
    var className = get_section_content(e).className;
    if (className.indexOf(' hidden') == -1) {
        className += ' hidden';
        sender.innerHTML = "показать";
    }
    else {
        className = className.replace(' hidden', '');
        sender.innerHTML = "скрыть";
    }
    get_section_content(e).className = className;
//     var elementChildrens = get_section_content(e).children;
//     for (var i=0, child; child=elementChildrens[i]; i++) {
//         child.className += " hidden";
//         window.setTimeout(1000);
//    }
    return false;
};