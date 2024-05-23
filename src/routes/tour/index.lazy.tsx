import {
  Accordion,
  Button,
  Input,
  ModalIcon,
  OverflowMenu,
  PencilIcon,
  PlusIcon,
  Popover,
  Select,
  TooltipIcon,
} from '@/components';
import Label from '@/components/Commons/Input/Label';
import { useSaveTour, useTour } from '@/hooks/useTour';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { DomHierarchyItem } from './styled';
import { Tooltip } from 'antd';

export const Route = createLazyFileRoute('/tour/')({
  component: WebTourCreator,
});

interface Popover {
  title?: string;
  description?: string;
  detailLink?: string;
  videoUrl?: string;
  type: 'tooltip' | 'modal';
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
  element: string | null;
  url: string;
  popover: Popover;
}

interface Tour {
  id: string;
  name: string;
  description: string;
  steps: Step[];
  url: string;
  nextTourId?: string;
}

interface TourPanelProps {
  tour: Tour;
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

const POPOVER_TYPES = {
  tooltip: {
    type: 'tooltip',
    Icon: TooltipIcon,
  },
  modal: {
    type: 'modal',
    Icon: ModalIcon,
  },
};

function WebTourCreator() {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [isSettingUpFinished, setIsSettingUpFinished] = useState(false);
  const iframeElementRef = useRef<HTMLIFrameElement | null>(null);
  const { data } = useTour();
  const { mutateAsync } = useSaveTour();
  const tour = data?.data as Tour;

  const saveChanges = async () => {
    if (selectedStep) {
      const stepIndex = tour.steps.findIndex((step) => step.id === selectedStep.id);
      if (stepIndex === -1) {
        tour.steps.push(selectedStep);
      } else {
        tour.steps = tour.steps.map((prevStep: Step) => {
          if (prevStep.id === selectedStep.id) {
            return selectedStep;
          }

          return prevStep;
        });
      }

      await mutateAsync(tour);
    }
    iframeElementRef.current?.contentWindow?.postMessage({ type: 'end getting element' }, '*');
    iframeElementRef.current?.contentWindow?.postMessage({ type: 'clean up' }, '*');
    setSelectedStep(null);
  };

  const handleAddStep = async () => {
    iframeElementRef.current?.contentWindow?.postMessage({ type: 'clean up' }, '*');
    const newStep = {
      id: String(Date.now()),
      element: null,
      url: '',
      popover: { title: 'Popover Title', description: 'Popover Description', type: 'tooltip' },
    } as Step;
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
    if (!selectedStep && tour) {
      return (
        <TourPanel
          tour={tour}
          selectStep={setSelectedStep}
          iframeElement={iframeElementRef.current!}
          addStep={handleAddStep}
        />
      );
    }

    if (selectedStep) {
      return (
        <StepDetailPanel
          step={selectedStep}
          onStepChange={handleStepChange}
          saveChanges={saveChanges}
          iframeElement={iframeElementRef.current!}
        />
      );
    }

    return null;
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
          src='http://localhost:5500'
          ref={iframeElementRef}
        />
      </div>
      <div className='w-[300px] h-screen overflow-y-auto'>{renderPanel()}</div>
    </div>
  );
}

const TourPanel = ({ tour, selectStep, addStep, iframeElement }: TourPanelProps) => {
  const steps = tour.steps || [];

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
      <h4 className='w-full'>Tour</h4>
      <Input
        label='Tour Name'
        placeholder='Enter tour name'
        value={tour.name}
      />
      <Input
        label='Tour Description'
        type='textarea'
        placeholder='Enter tour description'
        value={tour.description}
      />
      <Input
        label='Website url'
        placeholder='enter website url to start tour'
        value={tour.url}
      />
      <Button
        className='w-full'
        onClick={handlePreviewTour}
        disabled={steps.length === 0}
      >
        Preview Tour
      </Button>
      <div className='my-2' />
      <div className='w-full flex flex-row justify-between items-center'>
        <h4>Steps</h4>
        <Button
          size='small'
          onClick={addStep}
        >
          <PlusIcon fill='white' />
        </Button>
      </div>
      <div className='w-full flex flex-col gap-4'>
        {steps.map((step, index) => {
          return (
            <div
              key={step.id}
              onClick={() => handlePreviewStep(step)}
              className='w-full flex flex-row items-center justify-between p-4 border border-solid rounded-md border-gray-300 cursor-pointer hover:bg-gray-100'
            >
              <div>
                <p className='font-bold text-base text-gray-700'>Step {index + 1}</p>
                <span className='text-xs font-medium text-gray-400'>{step.popover.type}</span>
              </div>
              <div className='flex flex-row items-center gap-4'>
                <Tooltip title='Edit step'>
                  <span
                    onClick={() => selectStep(step)}
                    className='text-sm text-blue-400 cursor-pointer p-2'
                  >
                    <PencilIcon
                      width={20}
                      height={20}
                    />
                  </span>
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StepDetailPanel = (props: StepDetailPanelProps) => {
  const { step, onStepChange, saveChanges } = props;

  return (
    <div className='py-4 flex flex-col justify-between min-h-screen gap-10'>
      <div className='flex flex-col items-center gap-6'>
        <div className='w-full px-2 flex flex-col items-center gap-6'>
          <h4 className='w-full'>Step Detail</h4>
          <Select
            label='UI Pattern'
            name='ui-pattern'
            placeholder='Select UI Pattern'
            options={Object.keys(POPOVER_TYPES).map((key) => {
              const popoverConfig = POPOVER_TYPES[key as 'modal'];
              return {
                label: (
                  <div className='flex flex-row items-center gap-3'>
                    <popoverConfig.Icon />
                    <span className='capitalize font-medium'>{popoverConfig.type}</span>
                  </div>
                ),
                value: popoverConfig.type,
              };
            })}
            value={step.popover.type}
            onSelect={(value) => {
              onStepChange({
                ...step,
                element: value === 'modal' ? null : step.element,
                popover: { ...step.popover, type: value as 'modal' },
              });
            }}
          />
        </div>
        <div className='w-full'>
          <Accordion
            items={[
              ...(step.popover.type === 'tooltip'
                ? [
                    {
                      key: 'element-selector',
                      label: 'Element Selector',
                      children: <ElementSelectorSection {...props} />,
                    },
                  ]
                : []),
              {
                key: 'popover-config',
                label: 'UI Content',
                children: <UIContentSection {...props} />,
              },
            ]}
          />
        </div>
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

const ElementSelectorSection = (props: StepDetailPanelProps) => {
  const { step, onStepChange, iframeElement } = props;
  const [isGettingElement, setIsGettingElement] = useState(false);

  useEffect(() => {
    const handleIframeMessages = (e: MessageEvent<any>) => {
      if (e.data.type === 'select element') {
        delete e.data.type;
        onStepChange({
          ...step,
          element: e.data.element,
        });
        handleCancelChangeElement();
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
    <div className='flex flex-col gap-6'>
      <Input
        label='Selected Element'
        value={step.element?.split(' > ').at(-1) || 'No element selected'}
        readOnly
      />
      <DomHierarchyPresenter {...props} />
      {isGettingElement && (
        <div className='text-xs font-medium text-center p-2 rounded-md bg-gray-100 leading-5'>
          You are in selecting element mode. Right click on the element you want to select
        </div>
      )}
      <Button
        onClick={handleChangeElement}
        _type='secondary'
        className='w-full'
      >
        Select Element
      </Button>
      <Button
        onClick={handlePreviewElement}
        _type='secondary'
        className='w-full'
      >
        Highlight Selected Element
      </Button>
    </div>
  );
};

const UIContentSection = ({ step, onStepChange, iframeElement }: StepDetailPanelProps) => {
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
    <div className='flex flex-col gap-6'>
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
      {step.popover.type === 'modal' && (
        <Input
          label='Video Link'
          placeholder='Enter popover video link'
          value={step.popover.videoUrl}
          onChange={handlePopoverConfigChange('videoUrl')}
        />
      )}
      {step.popover.type === 'modal' && (
        <Button
          onClick={handlePreviewElement}
          _type='secondary'
          className='w-full'
        >
          Highlight Selected Element
        </Button>
      )}
    </div>
  );
};

const DomHierarchyPresenter = ({ step, onStepChange, iframeElement }: StepDetailPanelProps) => {
  const [isShowDomHierarChy, setIsShowDomHierarchy] = useState(false);
  const [selectedDomIndex, setSelectedDomIndex] = useState(-1);

  useEffect(() => {
    if (step.element) {
      setSelectedDomIndex(step.element.split(' > ').length - 1);
    } else {
      setSelectedDomIndex(-1);
    }
  }, [step]);

  const cutDomHierarchy = (index: number) => {
    if (step.element) {
      const elements = step.element.split(' > ');
      const newElements = elements.slice(0, index + 1);
      onStepChange({
        ...step,
        element: newElements.join(' > '),
      });
    }
  };

  const highlightElementInDomHierarChy = (index: number) => {
    if (step.element) {
      const elements = step.element.split(' > ');
      const newElements = elements.slice(0, index + 1);
      setSelectedDomIndex(index);
      iframeElement.contentWindow?.postMessage(
        {
          type: 'highlight element',
          step: { ...step, element: newElements.join(' > ') },
        },
        '*',
      );
    }
  };

  if (!isShowDomHierarChy) {
    return (
      <Button
        _type='secondary'
        disabled={!step.element}
        onClick={() => setIsShowDomHierarchy(true)}
      >
        Show Dom Hierarchy
      </Button>
    );
  }

  return (
    <>
      <div>
        <Label label='Dom Hierarchy:' />
        <ul className='pl-5 list-none'>
          {step.element &&
            step.element.split(' > ').map((dom, index) => {
              return (
                <OverflowMenu
                  key={index}
                  trigger={['click']}
                  menu={{
                    items: [
                      {
                        label: 'Highlight this element',
                        key: '1',
                        onClick: () => highlightElementInDomHierarChy(index),
                      },
                      {
                        label: 'Cut dom hierarchy',
                        key: '2',
                        onClick: () => cutDomHierarchy(index),
                      },
                    ],
                  }}
                >
                  <DomHierarchyItem
                    className={`hover:text-gray-700 cursor-pointer ${
                      selectedDomIndex === index ? 'text-blue-500' : ''
                    }`}
                  >
                    {dom}
                  </DomHierarchyItem>
                </OverflowMenu>
              );
            })}
        </ul>
      </div>
      <Button
        _type='secondary'
        onClick={() => setIsShowDomHierarchy(false)}
      >
        Hide Dom Hierarchy
      </Button>
    </>
  );
};
