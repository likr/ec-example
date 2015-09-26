import angular from 'angular'
import Graph from '../../../egraph/src/graph'
import graphDirective from "../directives/graph"

const modName = 'ece.directives.example1';

const template = `
<div ng-repeat="graph in example1.graphs">
  <graph graph="graph"/>
</div>
`;

angular.module(modName, [graphDirective]).config(($routeProvider) => {
  $routeProvider.when('/example1', {
    template: template,
    controllerAs: 'example1',
    controller: class {
      constructor(ecNewbery, ecRect) {
        const g = new Graph(),
              u1 = Symbol(),
              u2 = Symbol(),
              u3 = Symbol(),
              v1 = Symbol(),
              v2 = Symbol(),
              v3 = Symbol(),
              v4 = Symbol(),
              v5 = Symbol();
        g.addVertex(u1);
        g.addVertex(u2);
        g.addVertex(u3);
        g.addVertex(v1);
        g.addVertex(v2);
        g.addVertex(v3);
        g.addVertex(v4);
        g.addVertex(v5);
        g.addEdge(u1, v1);
        g.addEdge(u1, v2);
        g.addEdge(u1, v3);
        g.addEdge(u1, v5);
        g.addEdge(u2, v1);
        g.addEdge(u2, v2);
        g.addEdge(u2, v3);
        g.addEdge(u2, v4);
        g.addEdge(u3, v2);
        g.addEdge(u3, v3);
        g.addEdge(u3, v4);
        g.addEdge(u3, v5);
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
