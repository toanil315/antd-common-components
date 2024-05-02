import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';

interface Props {
  defaultData?: string;
}

interface NodeStyle {
  fill: string;
  color: string;
  'stroke-width': number;
  stroke: string;
}

export interface MermaidNode {
  id: string;
  shape: MermaidShape;
  text: string;
  styles?: NodeStyle;
}

export type MermaidShape = 'rect' | 'diamond' | 'circle';

const SHAPE_SYNTAX: Record<MermaidShape, { start: string; end: string }> = {
  rect: {
    start: '[',
    end: ']',
  },
  circle: {
    start: '((',
    end: '))',
  },
  diamond: {
    start: '{',
    end: '}',
  },
};

interface Point {
  x: number;
  y: number;
}

interface PendingEdge {
  sourceId?: string;
  targetId?: string;
  sourcePoint?: Point;
  targetPoint?: Point;
}

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
});

declare global {
  interface Window {
    callback: (e: any) => void;
  }
}

const findAllByRegex = (data: string, regex: RegExp) => {
  let match;
  const matches = [];

  while ((match = regex.exec(data)) !== null) {
    matches.push(match[1].trim());
  }

  return matches;
};

const getNodePropsStr = (data: string, nodeId: string) => {
  const regex = /%%(.*?)%%/g;
  const matches = findAllByRegex(data, regex);
  return matches.find((match) => match.includes(nodeId));
};

const extractNodeStyles = (nodeStyleStr?: string) => {
  const defaultStyle: NodeStyle = {
    fill: '#ECECFF',
    color: '#333',
    stroke: '#9370DB',
    'stroke-width': 1,
  };

  if (!nodeStyleStr) return defaultStyle;

  const styleStrs = nodeStyleStr
    .split(',')
    .map((str) => str.trim())
    .filter(Boolean);

  styleStrs.forEach((str) => {
    const [key, value] = str.split(':');
    if (key && value) {
      if (key === 'stroke-width') {
        defaultStyle[key as 'stroke-width'] = Number(value.replace('px', ''));
      } else {
        defaultStyle[key as 'fill'] = value;
      }
    }
  });

  return defaultStyle;
};

const getNodeStylesStr = (data: string, nodeId: string) => {
  const regex = /style\s(.*?);/g;
  const matches = findAllByRegex(data, regex);
  const styleStr = matches.find((match) => match.includes(nodeId));
  return styleStr ? `style ${styleStr};` : undefined;
};

const getNodeStyles = (data: string, nodeId: string) => {
  const nodeStyleStr = getNodeStylesStr(data, nodeId);
  console.log('nodeStyleStr', nodeStyleStr);
  return extractNodeStyles(
    nodeStyleStr?.replace('style', '').replace(nodeId, '').replace(';', '').replace('\n', ''),
  );
};

const serializeNodeStyles = (styles: NodeStyle, nodeId: string) => {
  const styleStr = Object.entries(styles)
    .map(([key, value]) => {
      if (key === 'stroke-width') {
        return `${key}:${value}px`;
      }
      return `${key}:${value}`;
    })
    .join(',');
  return `style ${nodeId} ${styleStr};\n`;
};

const getNodeContent = ({
  id,
  nodeStr,
  shape,
}: {
  id: string;
  nodeStr: string;
  shape: MermaidShape;
}) => {
  const shapeSyntax = SHAPE_SYNTAX[shape];
  return nodeStr.replace(`${id}${shapeSyntax.start}`, '').replace(shapeSyntax.end, '');
};

const appendNewStyle = (data: string, oldStyle: string, newStyle: string) => {
  let newData = data;
  if (oldStyle) {
    newData = data.replace(oldStyle, '');
  }
  return newData + newStyle;
};

export const useMermaid = ({ defaultData }: Props) => {
  const [data, setData] = useState<string>(defaultData || '');
  const [floatingPoint, setFloatingPoint] = useState<{ x: number; y: number } | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [pendingEdge, setPendingEdge] = useState<PendingEdge | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<MermaidNode | null>(null);

  const mermaidRef = useRef<HTMLDivElement | null>(null);
  const floatingPointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setData(defaultData || '');
  }, [defaultData]);

  useEffect(() => {
    loadFlowChart();

    return () => {
      removeListenerToEdges();
    };
  }, [data]);

  useEffect(() => {
    const previewEdge = (e: MouseEvent) => {
      if (isConnecting && pendingEdge && pendingEdge.sourcePoint) {
        setPendingEdge((prev) => {
          return {
            ...prev,
            targetPoint: { x: e.clientX, y: e.clientY },
          };
        });
      }
    };
    window.addEventListener('mousemove', previewEdge);
    return () => {
      window.removeEventListener('mousemove', previewEdge);
    };
  }, [pendingEdge, setPendingEdge]);

  useEffect(() => {
    window.callback = (nodeId: string) => {
      if (isConnecting && pendingEdge && pendingEdge.sourceId) {
        addEdge(pendingEdge.sourceId, nodeId);
        return;
      }
      setSelectedNodeId(nodeId);
      const nodeDom = document.querySelector(`g.node[data-id=${nodeId}]`);
      if (nodeDom) {
        const { left, top, height } = nodeDom.getBoundingClientRect();
        setFloatingPoint({ x: left, y: top + height });
      }
    };
  }, [selectedNodeId, isConnecting, pendingEdge]);

  useEffect(() => {
    if (selectedNodeId) {
      const nodeContent = getNodePropsStr(data, selectedNodeId);
      if (nodeContent) {
        const shape = Object.keys(SHAPE_SYNTAX).find(
          (key) =>
            nodeContent.includes(SHAPE_SYNTAX[key as 'rect'].start) &&
            nodeContent.includes(SHAPE_SYNTAX[key as 'rect'].end),
        ) as MermaidShape;
        console.log(
          `getNodeStyles(data, selectedNodeId)`,
          selectedNodeId,
          getNodeStyles(data, selectedNodeId),
        );

        setSelectedNode({
          id: selectedNodeId,
          shape: shape as MermaidShape,
          text: getNodeContent({
            id: selectedNodeId,
            nodeStr: nodeContent,
            shape: shape as MermaidShape,
          }),
          styles: getNodeStyles(data, selectedNodeId),
        });
      }
    }
  }, [selectedNodeId, data]);

  const loadFlowChart = async () => {
    mermaidRef.current?.removeAttribute('data-processed');
    await mermaid.run();
    addListenerToEdges();
  };

  const handleEdgeClick = (e: MouseEvent) => {
    if (!isConnecting) {
      console.log('edge clicked', (e.target as Element)?.id.replace('[clone]', ''));
    }
  };

  const addListenerToEdges = () => {
    const edges = window.document.querySelectorAll('.edgePaths path.flowchart-link');
    edges.forEach((edge) => {
      // because default mermaid edge is a thin line so hard to clickable, we clone it and make it thicker for better UX
      const cloneEdge = edge.cloneNode(true) as SVGAElement;
      cloneEdge.id = `${edge.id}[clone]`;
      cloneEdge.style.cursor = 'pointer';
      cloneEdge.style.strokeWidth = '20px';
      cloneEdge.style.opacity = '0';
      window.document.querySelector('.edgePaths')?.appendChild(cloneEdge);
      cloneEdge.addEventListener('click', handleEdgeClick);
    });
  };

  const removeListenerToEdges = () => {
    const edges = window.document.querySelectorAll('.edgePaths path.flowchart-link');
    edges.forEach((edge) => {
      const cloneEdge = document.querySelector(`#${edge.id}[clone]`);
      (cloneEdge as any)?.removeEventListener('click', handleEdgeClick);
    });
  };

  const startCreateEdge = () => {
    if (selectedNodeId && floatingPoint) {
      setIsConnecting(true);
      setPendingEdge({
        sourceId: selectedNodeId,
        sourcePoint: {
          x: floatingPoint.x,
          y: floatingPoint.y,
        },
      });
      // close dropdown
      setSelectedNodeId(null);
      setFloatingPoint(null);
    }
  };

  const cancelCreateEdge = () => {
    setIsConnecting(false);
    setPendingEdge(null);
  };

  const addEdge = (sourceId: string, targetId: string) => {
    setData((prev) => {
      return prev + `${sourceId} --> ${targetId};\n`;
    });
    setPendingEdge(null);
  };

  const addShape = (shape: MermaidShape) => {
    setData((prev) => {
      const shapeSyntax = SHAPE_SYNTAX[shape];
      const id = `node-${Date.now()}`;
      const nodeContent = `${id}${shapeSyntax.start}Text${shapeSyntax.end}`;
      return `
        ${prev}
        %%${nodeContent}%%;
        ${nodeContent};
        ${serializeNodeStyles(
          {
            fill: '#ECECFF',
            color: '#333',
            stroke: '#9370DB',
            'stroke-width': 1,
          },
          id,
        )}
        click ${id} callback;\n
      `;
    });
  };

  const deleteNode = (id: string) => {
    setData((prev) => {
      return prev
        .split(';')
        .filter((statement) => !statement.includes(id))
        .join(';');
    });
    // close dropdown
    setSelectedNodeId(null);
    setFloatingPoint(null);
  };

  const setNodeProps = (node: MermaidNode) => {
    if (node.id) {
      const nodeStr = getNodePropsStr(data, node.id as string);
      const newNodeContent = `${node.id}${SHAPE_SYNTAX[node.shape].start}${node.text}${
        SHAPE_SYNTAX[node.shape].end
      }`;
      const oldNodeStyles = getNodeStylesStr(data, node.id as string);
      const newNodeStyles = serializeNodeStyles(node.styles as NodeStyle, node.id as string);
      if (nodeStr) {
        setData((prev) => {
          let newData = String(prev.replaceAll(nodeStr, newNodeContent));
          newData = appendNewStyle(newData, oldNodeStyles || '', newNodeStyles);

          return newData.split('\n').filter(Boolean).join('\n') + '\n';
        });
        setSelectedNodeId(node.id);
      }
    }
  };

  console.log('selectedNode', selectedNodeId, selectedNode);

  return {
    mermaidData: {
      data,
      isConnecting,
      floatingPoint,
      selectedNodeId,
      pendingEdge,
      selectedNode,
    },
    actions: {
      setData,
      addShape,
      setFloatingPoint,
      deleteNode,
      addEdge,
      startCreateEdge,
      setSelectedNodeId,
      cancelCreateEdge,
      setNodeProps,
    },
    refs: {
      mermaidRef,
      floatingPointRef,
    },
  };
};
