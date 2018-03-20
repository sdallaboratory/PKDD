$(".ajax-confirm").on("click", function (e) {
    sendAjax({
        url: e.target.getAttribute("href") + e.target.getAttribute("params"),
        success: function (result) {
            endProgressBar();
            e.target.remove();
        },
    });
});
