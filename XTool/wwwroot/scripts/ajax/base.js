function sendAjax(ajaxRequest) {
        alert([ajaxRequest.url]);
    startProgressBar();
    $.ajax({
        dataType: "json",
        url: ajaxRequest.url,
        data: ajaxRequest.data,
        success: function (result) {
            console.log(result.message);
            if (result.status == 0)
                endProgressBar(result);
            else
                errorProgressBar();
            if (result.status == 0)
                ajaxRequest.success(result);
        },
        error: function () {
            errorProgressBar();
            if (ajaxRequest.error !== undefined) {
                ajaxRequest.error();
            }
        }
    });
}

//$(".ajax").on("click", function (e) {
//    sendAjax({
//        url: e.target.getAttribute("href") + e.target.getAttribute("params"),
//        success: function (result) {
        
//    })
//    startProgressBar();
//    $.ajax({
//            endProgressBar();
//        },
//        error: errorProgressBar
//    });
//});