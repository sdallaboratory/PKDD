window.onload = function () {
    if (window.jQuery) {
        // jQuery is loaded  
        alert("Yeah!");
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}

//var buttons = $(".ajax-confirm");
//buttons.forEach = [].forEach;

//buttons.forEach(function (button) {
    //button.on("click", function () {
    $(".ajax-confirm").on("click", function (e) {
        $(".progress-bar").html("Запрос пошёл");
        $.ajax({
            url: "/Admin/ConfirmUser/" + e.target.getAttribute("userid"),
            success: function (result) {
                $(".progress-bar").html(result);
            }
        });
    })
//});