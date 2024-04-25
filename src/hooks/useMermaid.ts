import mermaid from 'mermaid';
import { useEffect, useRef, useState } from 'react';

interface Props {
  defaultData?: string;
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

export const useMermaid = ({ defaultData }: Props) => {
  const [data, setData] = useState<string>(defaultData || '');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [floatingPoint, setFloatingPoint] = useState<{ x: number; y: number } | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [pendingEdge, setPendingEdge] = useState<PendingEdge | null>(null);
  const mermaidRef = useRef<HTMLDivElement | null>(null);
  const floatingPointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  useEffect(() => {
    mermaidRef.current?.removeAttribute('data-processed');
    mermaid.contentLoaded();
  }, [data]);

  useEffect(() => {
    const handleClickEventInMermaidEditor = (e: MouseEvent) => {
      if (selectedNodeId) setFloatingPoint({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('click', handleClickEventInMermaidEditor);

    return () => {
      window.removeEventListener('click', handleClickEventInMermaidEditor);
    };
  }, [setFloatingPoint, selectedNodeId, isConnecting, setIsConnecting]);

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
    };
  }, [selectedNodeId, isConnecting, pendingEdge]);

  const startCreateEdge = () => {
    if (selectedNodeId && floatingPoint) {
      setIsConnecting(true);
      setPendingEdge({
        sourceId: selectedNodeId,
        sourcePoint: floatingPoint,
      });
      // close dropdown
      setSelectedNodeId(null);
      setFloatingPoint(null);
    }
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

  console.log('floatingPoint', floatingPoint);

  return {
    mermaidData: {
      data,
      isConnecting,
      floatingPoint,
      selectedNodeId,
      pendingEdge,
    },
    actions: {
      setData,
      addShape,
      setFloatingPoint,
      deleteNode,
      addEdge,
      startCreateEdge,
      setSelectedNodeId,
    },
    refs: {
      mermaidRef,
      floatingPointRef,
    },
  };
};
