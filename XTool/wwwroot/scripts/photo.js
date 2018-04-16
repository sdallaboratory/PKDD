function getPhoto(photoUrl) {
    while (photoUrl && photoUrl.nodeName.toLowerCase() != "section")
    photoUrl = photoUrl.parentNode;
    return photoUrl.querySelector(".photo");
}

function initPhotoUrl(photoUrl) {
    var photo = getPhoto(photoUrl);
    photoUrl.onblur = function() {
        photo.setAttribute("src", photoUrl.value);
    }
}

elems = document.getElementsByClassName("photo-url");

for (var i = 0; i < elems.length; i++) {
    initPhotoUrl(elems[i])
}