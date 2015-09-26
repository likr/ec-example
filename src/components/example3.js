import angular from 'angular'
import Graph from '../../../egraph/src/graph'
import graphDirective from "../directives/graph"

const modName = 'ece.directives.example3';

const template = `
<div ng-repeat="graph in example3.graphs">
  <graph graph="graph"/>
</div>
`;

angular.module(modName, [graphDirective]).config(($routeProvider) => {
  $routeProvider.when('/example3', {
    template: template,
    controllerAs: 'example3',
    controller: class {
      constructor(ecNewbery, ecRect) {
        const g = new Graph(),
              u1 = Symbol(),
              u2 = Symbol(),
              u3 = Symbol(),
              u4 = Symbol(),
              u5 = Symbol(),
              u6 = Symbol(),
              v1 = Symbol(),
              v2 = Symbol(),
              v3 = Symbol(),
              v4 = Symbol(),
              v5 = Symbol(),
              v6 = Symbol(),
              v7 = Symbol(),
              v8 = Symbol(),
              v9 = Symbol(),
              v10 = Symbol(),
              v11 = Symbol();
        g.addVertex(u1, {text: '1'});
        g.addVertex(u2, {text: '2'});
        g.addVertex(u3, {text: '3'});
        g.addVertex(u4, {text: '4'});
        g.addVertex(u5, {text: '5'});
        g.addVertex(u6, {text: '6'});
        g.addVertex(v1, {text: 'W'});
        g.addVertex(v2, {text: 'X'});
        g.addVertex(v3, {text: 'C'});
        g.addVertex(v4, {text: 'D'});
        g.addVertex(v5, {text: 'E'});
        g.addVertex(v6, {text: 'Y'});
        g.addVertex(v7, {text: 'A'});
        g.addVertex(v8, {text: 'B'});
        g.addVertex(v9, {text: 'Z'});
        g.addVertex(v10, {text: 'M'});
        g.addVertex(v11, {text: 'N'});
        g.addEdge(u1, v1);
        g.addEdge(u1, v3);
        g.addEdge(u1, v4);
        g.addEdge(u1, v5);
        g.addEdge(u1, v7);
        g.addEdge(u1, v8);
        g.addEdge(u2, v2);
        g.addEdge(u2, v3);
        g.addEdge(u2, v4);
        g.addEdge(u2, v5);
        g.addEdge(u2, v7);
        g.addEdge(u2, v8);
        g.addEdge(u3, v3);
        g.addEdge(u3, v4);
        g.addEdge(u3, v5);
        g.addEdge(u3, v6);
        g.addEdge(u3, v7);
        g.addEdge(u3, v8);
        g.addEdge(u4, v3);
        g.addEdge(u4, v4);
        g.addEdge(u4, v5);
        g.addEdge(u4, v7);
        g.addEdge(u4, v8);
        g.addEdge(u4, v9);
        g.addEdge(u5, v7);
        g.addEdge(u5, v8);
        g.addEdge(u5, v10);
        g.addEdge(u6, v7);
        g.addEdge(u6, v8);
        g.addEdge(u6, v11);
        this.graphs = [
          g,
          ecNewbery(g),
          ecRect(g)
        ];
      }
    }
  });
});

export default modName
