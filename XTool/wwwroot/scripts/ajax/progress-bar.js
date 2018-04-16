var STOP_VALUE = 70;
var START_VALUE = 10;

var progress = START_VALUE;
var progressBar = $(".progress-bar");
var intervalId = 0;

function startProgressBar() {
    setProgress(START_VALUE);
        clearInterval(intervalId);
        intervalId = setInterval(function () {
            setProgress(progress + (STOP_VALUE - progress) / 150)
    }, 50);
}

function endProgressBar() {
    progressBar.addClass("progress-bar-done");
    clearInterval(intervalId);
    function timeout () {
        setProgress(progress + 8);
        if (progress < 99.9)
            setTimeout(timeout, 25);
        else
        {
            setProgress(100);
            setTimeout(function () {
                setProgress(0);
                setTimeout(() => {
                    progressBar.removeClass("progress-bar-done");
                }, 500);
            }, 500)
        }
    };
    timeout();
}

function errorProgressBar() {
    progressBar.addClass("progress-bar-error");
    clearInterval(intervalId);
    setProgress(10);
    setTimeout(() => {
        setProgress(0);
        setTimeout(() => {
            progressBar.removeClass("progress-bar-error");
        }, 500);
    }, 500);
}

function setProgress(progressValue) {
    progress = Math.min(Math.max(0, progressValue), 100);
    progressBar.width(progress.toFixed(3) + "%");

}