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
  videoUrl?: string;
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
  const [isSettingUpFinished, setIsSettingUpFinished] = useState(false);
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
      if (e.data.type === 'connection established') {
        setIsSettingUpFinished(true);
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
      <div className='flex-grow h-screen relative'>
        {!isSettingUpFinished && (
          <div className='absolute top-0 left-0 w-full h-full bg-white opacity-80 flex justify-center items-center'>
            We are setting up the tour creator. Please wait...
          </div>
        )}
        <iframe
          className='w-full h-full'
          src='http://localhost:5000'
          ref={iframeElementRef}
        />
      </div>
      <div className='w-[300px] h-screen overflow-y-auto'>{renderPanel()}</div>
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
        disabled={steps.length === 0}
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
  const [isGettingElement, setIsGettingElement] = useState(false);

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
    setIsGettingElement(true);
    iframeElement.contentWindow?.postMessage({ type: 'start getting element' }, '*');
  };

  const handleCancelChangeElement = () => {
    setIsGettingElement(false);
    iframeElement.contentWindow?.postMessage({ type: 'end getting element' }, '*');
  };

  const handlePopoverConfigChange = (key: string) => (value: string | number | undefined) => {
    const defaultValues = {
      title: 'Popover Title',
      description: 'Popover Description',
    };
    let defaultValue = undefined;

    if (key === 'title' || key === 'description') {
      defaultValue = defaultValues[key];
    }

    onStepChange({
      ...step,
      popover: {
        ...step.popover,
        [key]: value || defaultValue,
      },
    });
  };

  const handlePreviewElement = () => {
    iframeElement.contentWindow?.postMessage(
      {
        type: 'highlight element',
        step,
      },
      '*',
    );
  };

  return (
    <div className='py-4 px-2 flex flex-col justify-between min-h-screen gap-10'>
      <div className='flex flex-col items-center gap-6'>
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
        {isGettingElement && (
          <div className='text-xs font-medium text-center p-2 rounded-md bg-gray-100 leading-5'>
            You are in selecting element mode. Right click on the element you want to select
          </div>
        )}
        <Button
          onClick={isGettingElement ? handleCancelChangeElement : handleChangeElement}
          _type='secondary'
          className='w-full'
        >
          {isGettingElement ? 'Save' : 'Select Element'}
        </Button>
        <Button
          onClick={handlePreviewElement}
          _type='secondary'
          className='w-full'
        >
          Highlight Selected Element
        </Button>
        <h2>Popover Config</h2>
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
        <Input
          label='Detail Link'
          placeholder='Enter popover detail link'
          value={step.popover.detailLink}
          onChange={handlePopoverConfigChange('detailLink')}
        />
        <Input
          label='Video Link'
          placeholder='Enter popover video link'
          value={step.popover.videoUrl}
          onChange={handlePopoverConfigChange('videoUrl')}
        />
      </div>
      <div className='flex flex-col items-center gap-6'>
        <Button
          className='w-full mt-4'
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
    </div>
  );
};
