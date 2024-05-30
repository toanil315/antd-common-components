import { createLazyFileRoute } from '@tanstack/react-router';
import {
  Accordion,
  ActionIcon,
  Button,
  ColorPicker,
  Input,
  ModalIcon,
  OpenDoorIcon,
  OverflowMenu,
  PlusIcon,
  Popover,
  Select,
  TooltipIcon,
} from '@/components';
import Label from '@/components/Commons/Input/Label';
import { useSaveTour, useTour } from '@/hooks/useTour';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

export const Route = createLazyFileRoute('/tours/$tourId/')({
  component: WebTourCreator,
});

type PopoverType = 'tooltip' | 'modal' | 'driven action';
type ActionType = 'click' | 'input';

interface Popover {
  title?: string;
  description?: string;
  detailLink?: string;
  videoUrl?: string;
  type: PopoverType;
  action?: ActionType;
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
  titleColor?: string;
  descriptionColor?: string;
  fontSize?: number;
  tooltipBgColor?: string;
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
  onStepChange: (step: Step | null, option?: { highlight: boolean; debounce: boolean }) => void;
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
  drivenAction: {
    type: 'driven action',
    Icon: ActionIcon,
  },
};

function WebTourCreator() {
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [isSettingUpFinished, setIsSettingUpFinished] = useState(false);
  const iframeElementRef = useRef<HTMLIFrameElement | null>(null);
  const { tourId } = Route.useParams();
  const { data } = useTour(tourId);
  const { mutateAsync } = useSaveTour();
  const tour = data?.data as Tour;
  const debounceHighlightElementRef = useRef<NodeJS.Timeout | null>(null);

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

  const debounceHighlightElement = (step: Step) => {
    if (debounceHighlightElementRef.current) {
      clearTimeout(debounceHighlightElementRef.current);
    }
    debounceHighlightElementRef.current = setTimeout(() => {
      iframeElementRef.current?.contentWindow?.postMessage(
        {
          type: 'highlight element',
          step,
        },
        '*',
      );
    }, 300);
  };

  const handleStepChange = (step: Step | null, option = { highlight: true, debounce: false }) => {
    setSelectedStep(step);
    if (step && option.highlight) {
      if (!option.debounce) {
        return iframeElementRef.current?.contentWindow?.postMessage(
          {
            type: 'highlight element',
            step,
          },
          '*',
        );
      }

      return debounceHighlightElement(step);
    } else {
      iframeElementRef.current?.contentWindow?.postMessage(
        {
          type: 'clean up',
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
        {tour ? (
          <iframe
            className='w-full h-full'
            src={tour.url}
            ref={iframeElementRef}
          />
        ) : (
          <div className='w-full h-full'></div>
        )}
      </div>
      <div className='w-[300px] h-screen overflow-y-auto'>{renderPanel()}</div>
    </div>
  );
}

const TourPanel = (props: TourPanelProps) => {
  const { tour } = props;

  return (
    <div className='py-4 px-2 flex flex-col items-center gap-6'>
      <h4 className='w-full'>Tour</h4>
      <Accordion
        defaultActiveKey={['tour-info']}
        items={[
          {
            key: 'tour-info',
            label: 'Tour Information',
            children: (
              <div className='w-full flex flex-col gap-4'>
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
                  readOnly
                />
              </div>
            ),
          },
          {
            key: 'steps',
            label: 'Steps',
            children: <Steps {...props} />,
          },
        ]}
      />
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
            defaultActiveKey={['element-selector']}
            items={[
              ...(step.popover.type !== 'modal'
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
              ...(step.popover.type !== 'modal'
                ? [
                    {
                      key: 'box-styles',
                      label: 'Box Styles',
                      children: <BoxStylesSection {...props} />,
                    },
                  ]
                : []),
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
    return () => {
      iframeElement.contentWindow?.postMessage({ type: 'end getting element' }, '*');
      iframeElement.contentWindow?.postMessage({ type: 'clean up' }, '*');
    };
  }, []);

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
      window.removeEventListener('message', handleIframeMessages);
    };
  }, [step]);

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
      <Input
        label='Video Link'
        placeholder='Enter popover video link'
        value={step.popover.videoUrl}
        onChange={handlePopoverConfigChange('videoUrl')}
      />
      {step.popover.type === 'driven action' && (
        <Select
          name='action'
          label='Action'
          placeholder='Select action'
          value={step.popover.action}
          onChange={handlePopoverConfigChange('action')}
          options={[
            { label: 'Click', value: 'click' },
            { label: 'Input', value: 'input' },
          ]}
        />
      )}

      {step.popover.type === 'modal' && (
        <Button
          onClick={handlePreviewElement}
          _type='secondary'
          className='w-full'
        >
          Highlight Modal
        </Button>
      )}
    </div>
  );
};

const BoxStylesSection = ({ step, onStepChange }: StepDetailPanelProps) => {
  const handlePopoverConfigChange = (key: string) => (value: string | number | undefined) => {
    onStepChange(
      {
        ...step,
        popover: {
          ...step.popover,
          [key]: value || '',
        },
      },
      {
        highlight: true,
        debounce: true,
      },
    );
  };

  return (
    <div className='flex flex-col gap-6'>
      <Input
        label='Text Size (px)'
        placeholder='Enter text size'
        value={step.popover.fontSize || 16}
        type='number'
        onChange={handlePopoverConfigChange('fontSize')}
      />
      <ColorPicker
        label='Title Color'
        value={step.popover.titleColor || '#ffffff'}
        onChange={handlePopoverConfigChange('titleColor')}
        showText
        presets={[
          {
            label: 'Default',
            colors: ['#ffffff'],
            defaultOpen: true,
          },
        ]}
      />
      <ColorPicker
        label='Description Color'
        value={step.popover.descriptionColor || '#a6aab5'}
        onChange={handlePopoverConfigChange('descriptionColor')}
        showText
        presets={[
          {
            label: 'Default',
            colors: ['#a6aab5'],
            defaultOpen: true,
          },
        ]}
      />
      <ColorPicker
        label='Tooltip Background Color'
        value={step.popover.tooltipBgColor || '#000000'}
        onChange={handlePopoverConfigChange('tooltipBgColor')}
        showText
        presets={[
          {
            label: 'Default',
            colors: ['#000000'],
            defaultOpen: true,
          },
        ]}
      />
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

const DomHierarchyItem = styled.li`
  position: relative;
  padding-left: 15px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary_5};
  }

  &:after {
    content: '';
    position: absolute;
    top: 42%;
    left: -8px;
    width: 1px;
    height: 100%;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary_5};
  }

  &:last-child::after {
    display: none;
  }
`;

const Steps = ({ iframeElement, tour, selectStep, addStep }: TourPanelProps) => {
  const steps = tour.steps || [];
  const [currentActiveStepIndex, setCurrentActiveStepIndex] = useState(-1);

  useEffect(() => {
    const handleActiveIndexChange = (e: MessageEvent<any>) => {
      if (e.data.type === 'current step index') {
        setCurrentActiveStepIndex(e.data.stepIndex);
      }
    };

    window.addEventListener('message', handleActiveIndexChange);

    return () => {
      window.removeEventListener('message', handleActiveIndexChange);
    };
  }, []);

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

  const renderStepIcon = (type: PopoverType) => {
    switch (type) {
      case 'tooltip': {
        return (
          <TooltipIcon
            width={24}
            height={24}
            fill='white'
          />
        );
      }
      case 'modal': {
        return (
          <ModalIcon
            width={24}
            height={24}
            fill='white'
          />
        );
      }
      case 'driven action': {
        return (
          <ActionIcon
            width={24}
            height={24}
            fill='white'
          />
        );
      }
    }
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='w-full flex flex-col items-center gap-10'>
        <div className='pl-4 pr-2 py-2 rounded-3xl border-2 border-gray-300 border-solid flex items-center gap-4'>
          <p className='flex items-center gap-2'>
            <OpenDoorIcon
              width={28}
              height={28}
            />
            <span className='font-bold'>Initiators</span>
          </p>
          <div
            onClick={addStep}
            className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer bg-[#01529d] rounded-full`}
          >
            <PlusIcon fill='white' />
          </div>
        </div>
        {steps.map((step, index) => {
          return (
            <div
              key={step.id}
              onClick={() => handlePreviewStep(step)}
              className='flex flex-col items-center gap-2'
            >
              <div
                onClick={() => selectStep(step)}
                className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer ${
                  currentActiveStepIndex === index ? 'bg-[#01529d]' : 'bg-[#8ec0ee]'
                }`}
              >
                <div className='absolute -top-10 left-1/2 -translate-x-1/2 w-[1.5px] h-10 bg-yellow-200' />
                {renderStepIcon(step.popover.type)}
              </div>
              <div>
                <p
                  className={`text-sm ${
                    currentActiveStepIndex === index
                      ? 'text-[#01529d] font-bold '
                      : 'text-gray-700 font-medium '
                  }`}
                >
                  Step {index + 1}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        className='w-full mt-4'
        onClick={handlePreviewTour}
        disabled={steps.length === 0}
      >
        Preview Tour
      </Button>
    </div>
  );
};
