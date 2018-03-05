

function initTextarea(textarea) {
    setTextareaHeight = function () {
        textarea.style.height = textarea.scrollHeight + 'px';
    }
    textarea.style.overflow = "hidden";
    textarea.onkeydown = setTextareaHeight;
    textarea.onkeyup = setTextareaHeight;
}

elems = document.getElementsByTagName("textarea")

for (var i = 0; i < elems.length; i++) {
    initTextarea(elems[i])
}
