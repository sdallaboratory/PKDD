$(".ajax-create-user").on("click", function (e) {
    sendAjax({
        url: $("#form-create-user")[0].getAttribute("href"),
        data: $("#form-create-user").serialize(),
        success: function() {
            $("#form-create-user")[0].reset();
        }
    })
});

