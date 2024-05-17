import { Button, PlusIcon } from '@/components';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

export const Route = createLazyFileRoute('/tour/')({
  component: WebTourCreator,
});

interface Step {
  id: string;
  domHierarchy: string[];
  url: string;
}

interface TourPanelProps {
  steps: Step[];
  selectStep: (step: Step) => void;
  addStep: () => void;
  iframeElement: HTMLIFrameElement;
}

interface StepDetailPanelProps {
  step: Step;
  onStepChange: (step: Step | null) => void;
  saveChanges: () => void;
  iframeElement: HTMLIFrameElement;
}

function WebTourCreator() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const iframeElementRef = useRef<HTMLIFrameElement | null>(null);

  const saveChanges = () => {
    if (selectedStep) {
      setSteps((prevSteps) => {
        return prevSteps.map((prevStep) => {
          if (prevStep.id === selectedStep.id) {
            return selectedStep;
          }

          return prevStep;
        });
      });
    }
    iframeElementRef.current?.contentWindow?.postMessage('end getting element', '*');
    iframeElementRef.current?.contentWindow?.postMessage('clean up', '*');
    setSelectedStep(null);
  };

  const handleAddStep = () => {
    iframeElementRef.current?.contentWindow?.postMessage('clean up', '*');
    const newStep = { id: String(Date.now()), domHierarchy: [], url: '' };
    setSteps((prevSteps) => {
      return [...prevSteps, newStep];
    });
    setSelectedStep(newStep);
  };

  const renderPanel = () => {
    if (!selectedStep) {
      return (
        <TourPanel
          steps={steps}
          selectStep={setSelectedStep}
          iframeElement={iframeElementRef.current!}
          addStep={handleAddStep}
        />
      );
    }

    return (
      <StepDetailPanel
        step={selectedStep}
        onStepChange={setSelectedStep}
        saveChanges={saveChanges}
        iframeElement={iframeElementRef.current!}
      />
    );
  };

  return (
    <div className='flex flex-row'>
      <iframe
        className='flex-grow h-screen'
        src='http://localhost:5000'
        ref={iframeElementRef}
      />
      <div className='w-[300px]'>{renderPanel()}</div>
    </div>
  );
}

const TourPanel = ({ steps, selectStep, addStep, iframeElement }: TourPanelProps) => {
  const handlePreviewStep = (step: Step) => {
    iframeElement.contentWindow?.postMessage(
      {
        type: 'highlight element',
        element: step,
      },
      '*',
    );
  };

  return (
    <div className='py-4 px-2 flex flex-col items-center gap-6'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h2>Steps</h2>
        <Button onClick={addStep}>
          <PlusIcon stroke='white' />
        </Button>
      </div>
      <div className='w-full flex flex-col gap-4'>
        {steps.map((step) => {
          return (
            <div
              key={step.id}
              onClick={() => handlePreviewStep(step)}
              className='w-full flex flex-row justify-between p-4 border border-solid rounded-md border-gray-300 cursor-pointer hover:bg-gray-100'
            >
              <h4>Step {step.id}</h4>
              <span
                onClick={() => selectStep(step)}
                className='text-sm text-blue-400 cursor-pointer'
              >
                View detail
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StepDetailPanel = ({
  step,
  onStepChange,
  saveChanges,
  iframeElement,
}: StepDetailPanelProps) => {
  useEffect(() => {
    const handleIframeMessages = (e: MessageEvent<any>) => {
      if (e.data.type === 'selected element') {
        delete e.data.type;
        onStepChange({
          ...step,
          domHierarchy: e.data.domHierarchy,
          url: e.data.url,
        });
        iframeElement.contentWindow?.postMessage(
          {
            type: 'highlight element',
            element: e.data,
          },
          '*',
        );
      }
    };

    window.addEventListener('message', handleIframeMessages);
    return () => {
      iframeElement.contentWindow?.postMessage('end getting element', '*');
      window.removeEventListener('message', handleIframeMessages);
    };
  }, []);

  const handleChangeElement = () => {
    iframeElement.contentWindow?.postMessage('start getting element', '*');
  };

  return (
    <div className='py-4 px-2 flex flex-col items-center gap-6'>
      <h2>Step {step.id}</h2>
      <ul>
        {step.domHierarchy.length
          ? step.domHierarchy.map((dom, index) => {
              return <li key={index}>{dom}</li>;
            })
          : 'No element selected'}
      </ul>
      <Button
        onClick={handleChangeElement}
        _type='secondary'
        className='w-full'
      >
        Change Element
      </Button>
      <Button
        className='w-full'
        onClick={saveChanges}
      >
        Save Changes
      </Button>
      <Button
        onClick={() => onStepChange(null)}
        _type='tertiary'
        className='w-full'
      >
        Back
      </Button>
    </div>
  );
};
