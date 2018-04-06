$(".graph").on("Load", function (e) {
    let graph = $(e.target);

    function GetData() {
        sendAjax({
            url: graph.attr("src"),
            data: ,
            success: function (result) {
                location.href = "/Home/Actor/" + result.relatedId;
            },
            error: function (result) {
                $("#form-create-actor .error").text(result.message);
            }
        })
    }

    if (graph.attr("type").contains("Total")) {
        
    }
});