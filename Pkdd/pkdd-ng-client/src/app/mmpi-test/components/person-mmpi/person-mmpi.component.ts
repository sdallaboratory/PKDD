import { Component, OnInit } from '@angular/core';
import { RouteDataProviderService } from '../../../core/services/route-data-provider.service';
import { Results } from '../../../models/persons/results/results';

@Component({
  selector: 'pkdd-person-mmpi',
  templateUrl: './person-mmpi.component.html',
  styleUrls: ['./person-mmpi.component.scss'],
  providers: [RouteDataProviderService]
})
export class PersonMmpiComponent implements OnInit {

  public results: Results;

  public get scales() {
    return this.results && Object.keys(this.results.mmpi).map(key => ({ name: key, value: this.results.mmpi[key] }));
  }

  constructor(
    private readonly data: RouteDataProviderService
  ) { }

  async ngOnInit() {
    this.results = await this.data.get<Results>('results');
  }

}

// const graphsElems = document.getElementsByClassName('graph');
// const graphsArr = Array.from(graphsElems);

// class Graph {
//   graph: any;
//   graphVertexClass = 'graph-vertex';
//   vertexValueClass = 'vertex-value';
//   graphEditableClass = 'graph-editable';
//   lineClass = 'polyline';
//   preSelectedVertexClass = 'pre-selected-vertex';
//   selectedVertexClass = 'selected-vertex';
//   vertexValues: any;
//   vertexes: any;
//   line: any;

//   constructor(graph) {
//     this.graph = graph;
//     this.initGraph();
//   }

//   initGraph() {
//     this.initClassValues();
//     this.initEvents();
//   }

//   initEvents() {
//     this.vertexValues.forEach((value) => {
//       value.onmousedown = (e) => {
//         e.stopPropagation();
//       };

//       value.oninput = (e) => {
//         const curretnValue = parseInt(value.getAttribute('value'));
//       };
//     });
//     window.addEventListener('resize', this.redrawLine);
//     this.graph.onresize += this.redrawLine();

//     if (this.graph.classList.contains(this.graphEditableClass)) {
//       this.vertexes.forEach((vertex) => {

//         const vertexValue = vertex.getElementsByClassName(this.vertexValueClass)[0];

//         const moveAt = (clientY) => {
//           vertexValue.value = 120 - (Math.max(Math.min(((clientY - vertex.offsetHeight / 2) - vertex.parentNode.getBoundingClientRect().top) / vertex.parentNode.offsetHeight, 1), 0) * 120).toFixed(0);
//           vertex.style.top = ((120 - vertexValue.value) / 120 * 100) + '%';
//           this.redrawLine();
//         };

//         vertex.onmousedown = (e) => { // 1. отследить нажатие

//           vertex.classList.add(this.selectedVertexClass);

//           document.onmousemove = (event) => {
//             moveAt(event.clientY);
//           };

//           document.onmouseup = () => {
//             vertex.classList.remove(this.selectedVertexClass);
//             document.onmousemove = null;
//             document.onmouseup = null;
//             this.redrawLine();
//           };

//           vertex.ondragstart = () => {
//             return false;
//           };

//           this.redrawLine();
//         };

//         vertex.addEventListener('touchstart', (e) => {
//           if (vertex.classList.contains(this.preSelectedVertexClass) === false) {

//             vertex.classList.add(this.preSelectedVertexClass);

//             const onVertexMoveStart = (event) => {

//               event.cancelable = true;
//               event.preventDefault();

//               vertex.classList.add(this.selectedVertexClass);

//               document.ontouchmove = (ev) => {
//                 moveAt(ev.touches[0].clientY);
//               };

//               document.ontouchend = () => {
//                 vertex.classList.remove(this.selectedVertexClass);
//                 document.ontouchmove = null;
//                 document.ontouchend = null;
//                 this.redrawLine();
//               };

//               vertex.ondragstart = () => {
//                 return false;
//               };
//             };

//             vertex.addEventListener('touchstart', onVertexMoveStart);

//             const onDocumentTouchStart = (event) => {
//               if (event.target !== vertex) {
//                 vertex.classList.remove(this.preSelectedVertexClass);
//                 document.removeEventListener('touchstart', onDocumentTouchStart);
//                 vertex.removeEventListener('touchstart', onVertexMoveStart);
//               }
//             };

//             document.addEventListener('touchstart', onDocumentTouchStart);
//           }
//         });

//       });
//     }
//   }

//   initClassValues() {
//     this.vertexValues = Array.from(this.graph.getElementsByClassName(this.vertexValueClass));
//     this.vertexes = Array.from(this.graph.getElementsByClassName(this.graphVertexClass));
//     this.line = this.graph.getElementsByClassName(this.lineClass)[0];
//   }

//   redrawLine() {
//     let points = '';
//     this.vertexes.forEach(vertex => {
//       points += (vertex.parentNode.offsetLeft + vertex.offsetLeft + vertex.offsetWidth / 2) + ',' + (vertex.offsetTop + vertex.offsetHeight / 2) + ' ';
//     });
//     this.line.setAttribute('points', points);
//   }
// }

// const graphs = graphsArr.map(x => new Graph(x));
