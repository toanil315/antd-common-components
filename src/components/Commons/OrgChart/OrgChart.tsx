import React, { useLayoutEffect, useRef, useImperativeHandle, forwardRef, ReactNode } from 'react';
import ReactDOMServer from 'react-dom/server';
import { OrgChart as D3OrgChart } from 'd3-org-chart';

type OrgChartNode = Record<string, any> & {
  id: string;
  parentId: string;
};

interface HierarchyNode<T> {
  data: T & { _directSubordinates: number; _totalSubordinates: number };
  children: HierarchyNode<T>[];
  height: number;
  width: number;
}

interface Handle {
  addNode?: (node: OrgChartNode) => D3OrgChart<OrgChartNode>;
}

interface Props {
  data: OrgChartNode[];
  onNodeClick: (nodeId: string) => void;
  collapseButtonRender: (node: HierarchyNode<OrgChartNode>) => ReactNode;
  nodeContentRender: (node: HierarchyNode<OrgChartNode>) => ReactNode;
}

const OrgChart = forwardRef<Handle, Props>(
  ({ data, onNodeClick, collapseButtonRender, nodeContentRender }, ref) => {
    const d3Container = useRef(null);
    const chartRef = useRef<D3OrgChart<OrgChartNode> | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        addNode: chartRef.current?.addNode,
      }),
      [data],
    );

    // We need to manipulate DOM
    useLayoutEffect(() => {
      if (data && d3Container.current) {
        if (!chartRef.current) {
          chartRef.current = new D3OrgChart();
        }
        chartRef.current
          .container(d3Container.current)
          .data(data)
          .nodeWidth(() => 200)
          .nodeHeight(() => 120)
          .childrenMargin(() => 50)
          .compactMarginBetween(() => 25)
          .compactMarginPair(() => 50)
          .neighbourMargin(() => 25)
          .siblingsMargin(() => 25)
          .buttonContent(({ node }) => {
            return ReactDOMServer.renderToStaticMarkup(collapseButtonRender(node as any));
          })
          .nodeContent((node) => {
            console.log(nodeContentRender(node as any));
            return ReactDOMServer.renderToStaticMarkup(nodeContentRender(node as any));
          })
          .onNodeClick((nodeId: any) => {
            onNodeClick(nodeId);
          })
          // =====Edge Styling======
          // .linkUpdate(function (d, i, arr) {
          //   d3.select(this)
          //     .attr('stroke', (d) =>
          //       d.data._upToTheRootHighlighted ? '#152785' : '#E4E2E9'
          //     )
          //     .attr('stroke-width', (d) =>
          //       d.data._upToTheRootHighlighted ? 5 : 1
          //     );

          //   if (d.data._upToTheRootHighlighted) {
          //     d3.select(this).raise();
          //   }
          // })
          .render();
      }
    }, [data, d3Container.current]);

    return (
      <div>
        <div ref={d3Container} />
      </div>
    );
  },
);

export default OrgChart;
