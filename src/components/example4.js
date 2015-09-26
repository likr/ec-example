import angular from 'angular'
import Graph from '../../../egraph/src/graph'
import graphDirective from "../directives/graph"

const modName = 'ece.directives.example4';

const template = `
<div ng-repeat="graph in example4.graphs">
  <graph graph="graph"/>
</div>
`;

angular.module(modName, [graphDirective]).config(($routeProvider) => {
  $routeProvider.when('/example4', {
    template: template,
    controllerAs: 'example4',
    controller: class {
      constructor(ecNewbery, ecRect) {
        const g = new Graph(),
              u1 = Symbol(),
              u2 = Symbol(),
              u3 = Symbol(),
              u4 = Symbol(),
              u5 = Symbol(),
              u6 = Symbol(),
              u7 = Symbol(),
              v1 = Symbol(),
              v2 = Symbol(),
              v3 = Symbol(),
              v4 = Symbol(),
              v5 = Symbol(),
              v6 = Symbol();
        g.addVertex(u1, {text: 'cmds.h'});
        g.addVertex(u2, {text: '/usr/include/strings.h'});
        g.addVertex(u3, {text: '/usr/include/ctype.h'});
        g.addVertex(u4, {text: '/usr/include/stdio.h'});
        g.addVertex(u5, {text: 'ctools.h'});
        g.addVertex(u6, {text: 'texchk.h'});
        g.addVertex(u7, {text: 'texchars.h'});
        g.addVertex(v1, {text: 'cmds.c'});
        g.addVertex(v2, {text: 'ctools.c'});
        g.addVertex(v3, {text: 'texchk.c'});
        g.addVertex(v4, {text: 'verbatim.c'});
        g.addVertex(v5, {text: 'errors.c'});
        g.addVertex(v6, {text: 'texchars.c'});
        g.addEdge(u1, v1);
        g.addEdge(u1, v3);
        g.addEdge(u2, v2);
        g.addEdge(u2, v3);
        g.addEdge(u3, v2);
        g.addEdge(u3, v3);
        g.addEdge(u3, v4);
        g.addEdge(u4, v2);
        g.addEdge(u4, v3);
        g.addEdge(u4, v4);
        g.addEdge(u4, v5);
        g.addEdge(u5, v2);
        g.addEdge(u5, v3);
        g.addEdge(u5, v4);
        g.addEdge(u5, v5);
        g.addEdge(u6, v3);
        g.addEdge(u6, v4);
        g.addEdge(u6, v5);
        g.addEdge(u7, v3);
        g.addEdge(u7, v6);
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
