import angular from 'angular'
import graphDirective from "../directives/graph"

const modName = 'ece.directives.random';

const template = `
<div>
  <p>n={{random.n}}, m={{random.m}}, p={{random.p}}</p>
</div>
<div ng-repeat="graph in random.graphs">
  <graph graph="graph"/>
</div>
`;

angular.module(modName, [graphDirective]).config(($routeProvider) => {
  $routeProvider.when('/random', {
    template: template,
    controllerAs: 'random',
    controller: class {
      constructor($routeParams, genGraph, ecNewbery, ecRect) {
        this.n = $routeParams.n || 5;
        this.m = $routeParams.m || 10;
        this.p = $routeParams.p || 0.7;
        const g = genGraph(this.n, this.m, this.p);
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
