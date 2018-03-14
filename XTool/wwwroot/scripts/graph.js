

var graphs = document.getElementsByClassName('graph');
graphs.forEach = [].forEach;

function initGraph(graph) {

    var vertexes = graph.getElementsByClassName('graph-vertex');
    vertexes.forEach = [].forEach;
    var line = graph.getElementsByClassName('polyline')[0];

    var redrawLine = function () {
        var points = "";
        vertexes.forEach(vertex => {
            points += (vertex.parentNode.offsetLeft + vertex.offsetLeft + vertex.offsetWidth / 2) + ',' + (vertex.offsetTop + vertex.offsetHeight / 2) + ' ';
        });
        line.setAttribute("points", points);
    }

    window.addEventListener("resize", redrawLine);
    
    graph.onresize += redrawLine();

    vertexes.forEach(function (vertex) {


        //vertex.ontouchstart = function () {
        //    function moveAt(e) {
        //        vertex.style.top = (Math.max(Math.min((e.clientY - vertex.parentNode.getBoundingClientRect().top) / vertex.parentNode.offsetHeight, 1), 0) * 100).toFixed(1) + '%';
        //        document.ontouchend = function () {
        //            document.ontouchmove = null;
        //        }
        //    }
        //}

        var vertexValue = vertex.getElementsByClassName("vertex-value")[0];

        function moveAt(clientY) {
            vertexValue.value = 100 - (Math.max(Math.min(((clientY - vertex.offsetHeight / 2) - vertex.parentNode.getBoundingClientRect().top) / vertex.parentNode.offsetHeight, 1), 0) * 100).toFixed(0);
            vertex.style.top = (100 - vertexValue.value) + '%';
            redrawLine();
        }

        vertex.onmousedown = function (e) { // 1. отследить нажатие

            vertex.classList.add("selected-vertex")

            document.onmousemove = function (e) {
                moveAt(e.clientY);
            }

            document.onmouseup = function () {
                vertex.classList.remove("selected-vertex")
                document.onmousemove = null;
                document.onmouseup = null;
               redrawLine();
            };

            vertex.ondragstart = function () {
                return false;
            };

            redrawLine();
        }

        vertex.addEventListener("touchstart", function (e) {
            if (vertex.classList.contains("pre-selected-vertex") === false) {

                vertex.classList.add("pre-selected-vertex")

                var onVertexMoveStart = function (e) {

                    e.cancelable = true;
                    e.preventDefault();

                    vertex.classList.add("selected-vertex")

                    document.ontouchmove = function (e) {
                        moveAt(e.touches[0].clientY);
                    }

                    document.ontouchend = function () {
                        vertex.classList.remove("selected-vertex");
                        document.ontouchmove = null;
                        document.ontouchend = null;
                        redrawLine();
                    };

                    vertex.ondragstart = function () {
                        return false;
                    };
                }

                vertex.addEventListener("touchstart", onVertexMoveStart);

                function onDocumentTouchStart (e) {
                    if (e.target != vertex) {
                        vertex.classList.remove("pre-selected-vertex");
                        document.removeEventListener("touchstart", onDocumentTouchStart);
                        vertex.removeEventListener("touchstart", onVertexMoveStart);
                    }
                }

                document.addEventListener("touchstart", onDocumentTouchStart); 
            }
        });

    });
}


graphs.forEach(initGraph);