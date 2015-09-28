import angular from 'angular'
import Graph from '../../../egraph/src/graph'
import graphDirective from "../directives/graph"

const modName = 'ece.directives.example5';

const template = `
<div ng-repeat="graph in example5.graphs">
  <graph graph="graph"/>
</div>
`;

angular.module(modName, [graphDirective]).config(($routeProvider) => {
  $routeProvider.when('/example5', {
    template: template,
    controllerAs: 'example5',
    controller: class {
      constructor(ecNewbery, ecRect) {
        const g = new Graph(),
              u1 = Symbol(),
              u2 = Symbol(),
              u3 = Symbol(),
              u4 = Symbol(),
              v1 = Symbol(),
              v2 = Symbol(),
              v3 = Symbol(),
              v4 = Symbol(),
              v5 = Symbol();
        g.addVertex(u1);
        g.addVertex(u2);
        g.addVertex(u3);
        g.addVertex(u4);
        g.addVertex(v1);
        g.addVertex(v2);
        g.addVertex(v3);
        g.addVertex(v4);
        g.addVertex(v5);
        g.addEdge(u1, v1);
        g.addEdge(u1, v2);
        g.addEdge(u1, v3);
        g.addEdge(u1, v4);
        g.addEdge(u2, v2);
        g.addEdge(u2, v3);
        g.addEdge(u2, v4);
        g.addEdge(u2, v5);
        g.addEdge(u3, v1);
        g.addEdge(u3, v3);
        g.addEdge(u3, v4);
        g.addEdge(u3, v5);
        g.addEdge(u4, v1);
        g.addEdge(u4, v2);
        g.addEdge(u4, v4);
        g.addEdge(u4, v5);
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
