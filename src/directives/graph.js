import angular from "angular"
import copy from '../../../egraph/src/graph/copy'
import normalize from '../../../egraph/src/layouter/sugiyama/normalize'
import groupLayers from '../../../egraph/src/layouter/sugiyama/misc/group-layers'
import crossAll from '../../../egraph/src/layouter/sugiyama/crossing-reduction/cross-all'

const modName = 'ece.directives.graph';

const graphTemplate = `
<div>
  <div>
    <p>{{graph.numEdges(graph.graph)}}</p>
    <p>{{graph.numCrossings(graph.graph)}}</p>
  </div>
  <div>
    <svg width="800" height="1000">
      <g transform="translate(80,20)">
        <g>
          <path
              fill="none"
              stroke="black"
              ss-d="graph.path(edge.points)"
              ng-repeat="edge in graph.layout.edges track by $index"/>
        </g>
        <g>
          <g
              ss-transform="graph.translate(vertex.x, vertex.y)"
              ng-repeat="vertex in graph.layout.vertices track by $index">
            <circle
                r="5"
                ss-fill="vertex.dummy ? 'red' : 'black'"/>
            <text text-anchor="middle" y="-7">{{vertex.text}}</text>
        </g>
      </g>
    </svg>
  </div>
</div>
`;

angular.module(modName, []).directive('graph', (layout) => {
  const startFrom = ([x, y]) => {
    return `M${x} ${y}`;
  };

  const lineTo = ([x, y]) => {
    return ` L ${x} ${y}`;
  };

  const curveTo = ([x1, y1], [x2, y2]) => {
    const dx = x2 - x1,
          dy = y2 - y1;
    return ` q ${dx / 4} ${0}, ${dx / 2} ${dy / 2} q ${dx / 4} ${dy / 2}, ${dx / 2} ${dy / 2}`;
  };

  return {
    restrict: 'E',
    scope: {
    },
    bindToController: {
      graph: '='
    },
    template: graphTemplate,
    controllerAs: 'graph',
    controller: class {
      constructor(layouter) {
        this.layouter = layouter;
        this.layout = layout(this.graph);
      }

      path(points) {
        let d = `${startFrom(points[0])}${lineTo(points[1])}`;
        for (let i = 3; i < points.length; i += 2) {
          d += curveTo(points[i - 2], points[i - 1]) + lineTo(points[i]);
        }
        return d;
      }

      translate(x, y) {
        return `translate(${x},${y})`;
      }

      numEdges(g) {
        return g.numEdges();
      }

      numCrossings(graph) {
        const g = copy(graph);
        const layerMap = this.layouter.layerAssignment().call(g);
        const layers = groupLayers(g, layerMap);
        normalize(g, layers, layerMap, this.layouter.edgeMargin(), this.layouter.layerMargin());
        this.layouter.crossingReduction().call(g, layers);
        return crossAll(g, layers);
      }
    }
  };
});

export default modName
