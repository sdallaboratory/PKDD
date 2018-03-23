$(".ajax-create-actor").on("click", function (e) {
    sendAjax({
        url: $(".ajax-create-actor").attr("href"),
        data: $("#form-create-actor").serialize(),
        success: function (result) {
            console.log(Object.keys(result));
            console.log(result.message);
            location.href = "/Home/Actor/" + result.relatedId;
        },
        error: function (result) {
            $("#form-create-actor .error").text(result.message);
        }
    })
});

