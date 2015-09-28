import angular from 'angular'
import ngRoute from "angular-route"
import shinsekai from 'shinsekai'
import Graph from '../../egraph/src/graph'
import Sugiyama from '../../egraph/src/layouter/sugiyama'
import copy from '../../egraph/src/graph/copy'
import Transformer from '../../egraph/src/transformer/edge-concentration'
import newbery from '../../egraph/src/transformer/edge-concentration/newbery'
import example1 from "./components/example1"
import example2 from "./components/example2"
import example3 from "./components/example3"
import example4 from "./components/example4"
import example5 from "./components/example5"
import random from "./components/random"

const hasMiddle = (g) => {
  return g.vertices().filter((u) => g.inDegree(u) > 0 && g.outDegree(u) > 0).length > 0;
};

angular.module('app', [
  ngRoute,
  shinsekai,
  example1,
  example2,
  example3,
  example4,
  example5,
  random
])
.factory('genGraph', () => {
  return (n, m, p) => {
    const graph = new Graph(),
          h1 = [],
          h2 = [];
    for (let i = 0; i < n; ++i) {
      const u = Symbol();
      h1.push(u);
      graph.addVertex(u)
    }
    for (let i = 0; i < m; ++i) {
      const u = Symbol();
      h2.push(u);
      graph.addVertex(u)
    }
    for (const u of h1) {
      for (const v of h2) {
        if (Math.random() < p) {
          graph.addEdge(u, v);
        }
      }
    }
    return graph;
  };
})
.factory('layouter', () => {
  return new Sugiyama()
    .ltor(false)
    .vertexWidth(({d}) => d.dummy ? 0 : 10)
    .vertexHeight(({d}) => d.dummy ? 0 : 10)
    .edgeWidth(() => 1)
    .layerMargin(40)
    .edgeMargin(20);
})
.factory('layout', (layouter) => {
  return (graph) => {
    layouter.vertexMargin(hasMiddle(graph) ? 150 : 300);
    const result = layouter.layout(graph),
          vertices = [],
          edges = [];
    for (const u of graph.vertices()) {
      vertices.push(Object.assign({
        dummy: !!graph.vertex(u).dummy
      }, result.vertices[u], graph.vertex(u)));
    }
    for (const [u, v] of graph.edges()) {
      edges.push(result.edges[u][v]);
    }
    return {vertices, edges};
  };
})
.factory('ecNewbery', () => {
  const transformer = new Transformer().method(newbery);
  return (graph) => transformer.transform(copy(graph));
})
.factory('ecRect', () => {
  const transformer = new Transformer();
  return (graph) => transformer.transform(copy(graph));
})
.config(($routeProvider) => {
  $routeProvider.otherwise('/example1');
});
