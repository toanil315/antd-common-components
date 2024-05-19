import { Button, Input, PlusIcon } from '@/components';
import { useSaveTour, useTour } from '@/hooks/useTour';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

export const Route = createLazyFileRoute('/tour/')({
  component: WebTourCreator,
});

interface Popover {
  title?: string;
  description?: string;
  detailLink?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  showButtons?: ('next' | 'previous' | 'close')[];
  disableButtons?: ('next' | 'previous' | 'close')[];
  nextBtnText?: string;
  prevBtnText?: string;
  doneBtnText?: string;
  showProgress?: boolean;
  progressText?: string;
  popoverClass?: string;
}

interface Step {
  id: string;
  element: string;
  url: string;
  popover: Popover;
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
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const iframeElementRef = useRef<HTMLIFrameElement | null>(null);
  const { data } = useTour();
  const { mutateAsync } = useSaveTour();
  const { steps } = data?.data || { steps: [] };

  const saveChanges = async () => {
    if (selectedStep) {
      const newSteps = steps.map((prevStep: Step) => {
        if (prevStep.id === selectedStep.id) {
          return selectedStep;
        }

        return prevStep;
      });
      await mutateAsync({ ...data?.data, steps: newSteps });
    }
    iframeElementRef.current?.contentWindow?.postMessage({ type: 'end getting element' }, '*');
    iframeElementRef.current?.contentWindow?.postMessage({ type: 'clean up' }, '*');
    setSelectedStep(null);
  };

  const handleAddStep = async () => {
    iframeElementRef.current?.contentWindow?.postMessage({ type: 'clean up' }, '*');
    const newStep = {
      id: String(Date.now()),
      element: '',
      url: '',
      popover: { title: 'Popover Title', description: 'Popover Description' },
    };
    await mutateAsync({ ...data?.data, steps: [...steps, newStep] });
    setSelectedStep(newStep);
  };

  const handleStepChange = (step: Step | null) => {
    setSelectedStep(step);
    if (step) {
      iframeElementRef.current?.contentWindow?.postMessage(
        {
          type: 'highlight element',
          step,
        },
        '*',
      );
    }
  };

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.data.type === 'on loaded') {
        iframeElementRef.current?.contentWindow?.postMessage(
          { type: 'handshake', parentUrl: window.location.origin },
          '*',
        );
      }
    });
  }, []);

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
        onStepChange={handleStepChange}
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
        step,
      },
      '*',
    );
  };

  const handlePreviewTour = () => {
    iframeElement.contentWindow?.postMessage(
      {
        type: 'preview tour',
        steps,
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
      <Button
        className='w-full'
        onClick={handlePreviewTour}
      >
        Preview Tour
      </Button>
    </div>
  );
};

const StepDetailPanel = ({
  step,
  onStepChange,
  saveChanges,
  iframeElement,
}: StepDetailPanelProps) => {
  const [isShowDomHierarChy, setIsShowDomHierarchy] = useState(false);

  useEffect(() => {
    const handleIframeMessages = (e: MessageEvent<any>) => {
      if (e.data.type === 'select element') {
        delete e.data.type;
        onStepChange({
          ...step,
          element: e.data.element,
          url: e.data.url,
        });
      }
    };

    window.addEventListener('message', handleIframeMessages);
    return () => {
      iframeElement.contentWindow?.postMessage({ type: 'end getting element' }, '*');
      iframeElement.contentWindow?.postMessage({ type: 'clean up' }, '*');
      window.removeEventListener('message', handleIframeMessages);
    };
  }, []);

  const handleChangeElement = () => {
    iframeElement.contentWindow?.postMessage({ type: 'start getting element' }, '*');
  };

  const handlePopoverConfigChange =
    (key: 'title' | 'description') => (value: string | number | undefined) => {
      const defaultValues = {
        title: 'Popover Title',
        description: 'Popover Description',
      };

      onStepChange({
        ...step,
        popover: {
          ...step.popover,
          [key]: value || defaultValues[key],
        },
      });
    };

  return (
    <div className='py-4 px-2 flex flex-col items-center gap-6'>
      <h2>Step {step.id}</h2>
      {isShowDomHierarChy ? (
        <>
          <ul>
            {step.element
              ? step.element.split(' > ').map((dom, index) => {
                  return <li key={index}>{dom}</li>;
                })
              : 'No element selected'}
          </ul>
          <p
            className='text-blue-500 cursor-pointer'
            onClick={() => setIsShowDomHierarchy(false)}
          >
            Hide Dom Hierarchy
          </p>
        </>
      ) : (
        <p
          className='text-blue-500 cursor-pointer'
          onClick={() => setIsShowDomHierarchy(true)}
        >
          Show Dom Hierarchy
        </p>
      )}
      <Input
        label='Popover Title'
        placeholder='Enter popover title'
        value={step.popover.title}
        onChange={handlePopoverConfigChange('title')}
      />
      <Input
        label='Popover Description'
        type='textarea'
        placeholder='Enter popover description'
        value={step.popover.description}
        onChange={handlePopoverConfigChange('description')}
      />
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
