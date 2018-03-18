//var onBan = function (e) {
//    console.log("ban");
//    startProgressBar();
//    $.ajax({
//        url: e.target.getAttribute("href") + e.target.getAttribute("params"),
//        success: function (result) {
//            endProgressBar();
//            e.target.setAttribute("value", "Разбанить");
//            $(e.target).off();
//            $(e.target).on("click", onUnban);
//        },
//        error: errorProgressBar
//    })
//};

//var onUnban = function (e) {
//    console.log("unban");
//    startProgressBar();
//    $.ajax({
//        url: e.target.getAttribute("href") + e.target.getAttribute("params"),
//        success: function (result) {
//            endProgressBar();
//            e.target.setAttribute("value", "Забанить");
//            $(e.target).off();
//            $(e.target).on("click", onBan);
//        },
//        error: errorProgressBar
//    })
//};

var onBan = function (e) {
    sendAjax({
        url: "/Admin/BanUser/" + e.target.getAttribute("params"),
        success: function (result) {
            e.target.setAttribute("value", "Разбанить");
            $(e.target).off();
            $(e.target).on("click", onUnban);
        },
    });
};

var onUnban = function (e) {
    sendAjax({
        url: "/Admin/UnbanUser/" + e.target.getAttribute("params"),
        success: function (result) {
            e.target.setAttribute("value", "Забанить");
            $(e.target).off();
            $(e.target).on("click", onBan);
        },
    });
};

$(".ajax-ban").on("click", onBan);
$(".ajax-unban").on("click", onUnban);



