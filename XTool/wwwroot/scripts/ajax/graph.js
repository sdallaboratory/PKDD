$(".graph").on("Load", function (e) {
    let graph = $(e.target);

    //function GetData() {
    //    sendAjax({
    //        url: graph.attr("src"),
    //        data: {},
    //        success: function (result) {
    //            location.href = "/Home/Actor/" + result.relatedId;
    //        },
    //        error: function (result) {
    //            $("#form-create-actor .error").text(result.message);
    //        }
    //    })
    //}

    if (graph.attr("type").contains("Total")) {
        
    }
});

$(".graph-wrapper").each((i, graphWrapper) => {
    let graph = $($(graphWrapper).children(".graph")[0]);
    let sets = $($(graphWrapper).children(".graph-settings")[0]);

    function LoadData() {
        sendAjax({
            url: sets.attr("src"),
            data: sets.serialize(),
            success: (res) => {
                updateGraph(graph, res.data);
            },
        })
    }

    function updateGraph(graph, data) {
        for (key in data) {
            let name = key[0].toUpperCase() + key.substr(1);
            $("input[name=" + name + "]").val(data[key]);   
            //console.log(name + " " + $(graph.children('input[name=\"' + name + '\"]')).);
            //graph.children('input[name=\"' + name + '\"]').css("color", "red") // val(data[key]);
        }
    }

    //Object.keys(data).forEach((key) => alert(key));


    if (sets !== undefined)
    {
        LoadData();
        setInterval(() => {
            LoadData();
        }, 7500);
    }
});
