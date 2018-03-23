function error(result, errorFunc) {
    errorProgressBar();
    if (errorFunc !== undefined) {
        errorFunc(result);
    }
}

function success(result, successFunc) {
    endProgressBar(result);
    successFunc(result);
}

function sendAjax(ajaxRequest) {
    startProgressBar();
    $.ajax({
        dataType: "json",
        url: ajaxRequest.url,
        data: ajaxRequest.data,
        success: function (result) {
            if (result.status === 0)
            {
                success(result, ajaxRequest.success);
            } else {
                error(result, ajaxRequest.error);
            }
        },
        error: (result) => error(result, ajaxRequest.error)
    });
}

$(".ajax-button").on("click", function (e) {
    var form = $(e).parent("form");
    var button = $(e.target);
    sendAjax({
        url: button.attr("href") + '/' + button.attr("params"),
        data: form.serialize(),
    });
});