

var graphs = document.getElementsByClassName('graph');
graphs.forEach = [].forEach;

function initGraph(graph) {

    var vertexes = graph.getElementsByClassName('graph-vertex');
    vertexes.forEach = [].forEach;
    var line = graph.getElementsByClassName('polyline')[0];

    var redrawLine = function () {
        var points = "";
        vertexes.forEach(vertex => {
            points += (vertex.parentNode.offsetLeft + vertex.offsetWidth / 2) + ',' + (vertex.offsetTop + vertex.offsetHeight / 2) + ' ';
        });
        line.setAttribute("points", points);
    }

    window.addEventListener("resize", redrawLine);

    // window.resize.AddEventListener() (graph, redrawLine);

    graph.onresize += redrawLine();
    vertexes.forEach(function (vertex) {


        vertex.ontouchstart = function () {
            function moveAt(e) {
                vertex.style.top = (Math.max(Math.min((e.clientY - vertex.parentNode.getBoundingClientRect().top) / vertex.parentNode.offsetHeight, 1), 0) * 100).toFixed(1) + '%';
                document.ontouchend = function () {
                    document.ontouchmove = null;
                }
            }
        }

        vertex.onmousedown = function (e) { // 1. отследить нажатие

            vertex.classList.add("selected-vertex")
            vertex.parentNode.classList.add("selected-column");

            function moveAt(e) {
                vertex.style.top = (Math.max(Math.min(((e.clientY - vertex.offsetHeight / 2) - vertex.parentNode.getBoundingClientRect().top) / vertex.parentNode.offsetHeight, 1), 0) * 100).toFixed(0) + '%';
                redrawLine();
            }

            document.onmousemove = function (e) {
                moveAt(e);
            }

            document.onmouseup = function () {
                vertex.classList.remove("selected-vertex")
                vertex.parentNode.classList.remove("selected-column");
                document.onmousemove = null;
                document.onmouseup = null;
               redrawLine();
            };

            vertex.ondragstart = function () {
                return false;
            };

            redrawLine();
        }
    });
}


graphs.forEach(initGraph);