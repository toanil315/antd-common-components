import type { Meta, StoryObj } from '@storybook/react';
import DocumentEditor from './DocumentEditor';
import { useEffect, useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DocumentEditor> = {
  title: 'Components/DocumentEditor',
  component: DocumentEditor,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'DocumentEditor component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DocumentEditor>;

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState('');
    console.log(value);

    useEffect(() => {
      // test re-initialization
      setTimeout(() => {
        setValue('<p>Hello World!</p>');
      }, 1000);
    }, []);

    return (
      <DocumentEditor
        value={value}
        onChange={setValue}
      />
    );
  },
};
