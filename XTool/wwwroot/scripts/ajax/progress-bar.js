var STOP_VALUE = 70;
var START_VALUE = 10;

var progress = START_VALUE;
var progressBar = $(".progress-bar");
var intervalId = 0;

function startProgressBar() {
    progress = START_VALUE;

    intervalId = setInterval(function () {
        progressBar.width( progress + "%" );
        progress += (STOP_VALUE - progress) / 100;
    }, 50);
}

function endProgressBar() {
    progressBar.addClass("progress-bar-done");
    function timeout () {
        progressBar.width(progress + "%");
        progress += 10;
        if (progress < 99)
            setTimeout(timeout, 25);
        else
        {
            progressBar.width(100 + "%");
            setTimeout(function () {
                progressBar.width(0);
                progress = 0;
                clearInterval(intervalId);
                progressBar.removeClass("progress-bar-done");
            }, 500)
            
        }
    };
    timeout();
}

function errorProgressBar() {

}