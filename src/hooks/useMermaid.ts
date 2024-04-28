import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';

interface Props {
  defaultData?: string;
}

export interface MermaidNode {
  id: string;
  shape: MermaidShape;
  text: string;
  bgColor?: string;
  color?: string;
}

export type MermaidShape = 'rect' | 'diamond' | 'circle';

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

const getNodePropsStr = (data: string, nodeId: string) => {
  const regex = /%%(.*?)%%/g;
  let match;
  const matches = [];

  while ((match = regex.exec(data)) !== null) {
    matches.push(match[1].trim());
  }

  return matches.find((match) => match.includes(nodeId));
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

export const useMermaid = ({ defaultData }: Props) => {
  const [data, setData] = useState<string>(defaultData || '');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<MermaidNode | null>(null);
  const [floatingPoint, setFloatingPoint] = useState<{ x: number; y: number } | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [pendingEdge, setPendingEdge] = useState<PendingEdge | null>(null);
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
        setSelectedNode({
          id: selectedNodeId,
          shape: shape as MermaidShape,
          text: getNodeContent({
            id: selectedNodeId,
            nodeStr: nodeContent,
            shape: shape as MermaidShape,
          }),
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
      const cloneEdge = document.querySelector(`#${edge.id}-clone`);
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
      console.log(nodeStr, newNodeContent);
      if (nodeStr) {
        setData((prev) => {
          const newData = prev.replaceAll(nodeStr, newNodeContent);
          console.log('newData', newData);
          return newData;
        });
        setSelectedNodeId(node.id);
      }
    }
  };

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
