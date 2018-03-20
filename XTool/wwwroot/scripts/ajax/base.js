function sendAjax(ajaxRequest) {
    startProgressBar();
    $.ajax({
        dataType: "json",
        url: ajaxRequest.url,
        data: ajaxRequest.data,
        success: function (result) {
            //console.log(result.message);
            if (result.status === 0)
            {
                endProgressBar(result);
                ajaxRequest.success(result);
            }
            else
            {
                errorProgressBar();
                ajaxRequest.error(result);
            }
        },
        error: function (result) {
            errorProgressBar();
            if (ajaxRequest.error !== undefined) {
                ajaxRequest.error(result);
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