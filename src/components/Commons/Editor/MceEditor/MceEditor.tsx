import React, { useMemo, useState } from 'react';
import VariablePlugin, { Variable } from './plugins/Variables.plugin';
import { Editor } from '@tinymce/tinymce-react';
import { genList } from './modals/InsertVariable.modal';

interface Props {
  hasVariables?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const defaultData = {
  name: {
    content: 'Enosta',
    type: 'span',
    tag: 'span',
  },
  employeeList: {
    content: ['Nguyen', 'Minh', 'Long', 'Phat'],
    type: 'list',
    tag: 'ul',
  },
};

const MceEditor = ({ hasVariables, value, onChange }: Props) => {
  const [editor, setEditor] = useState<Editor['editor'] | null>(null);

  const variableMap = useMemo(() => {
    const keys = Object.keys(defaultData).map((key) => {
      return `<span class="mceNonEditable" data-variable="${key}">&nbsp;</span>`;
    });

    const values = Object.keys(defaultData).map((key) => {
      const data = defaultData[key as keyof typeof defaultData];
      let body = '';
      switch (data.type) {
        case 'span': {
          body = data.content as string;
          break;
        }

        case 'list': {
          body = genList(data.content as string[]);
          break;
        }
      }

      return `<${data.tag} class="mceNonEditable">${body}</${data.tag}>`;
    });

    return keys.reduce<Record<string, string>>((acc, key) => {
      acc[key] = values[keys.indexOf(key)];
      return acc;
    }, {});
  }, [defaultData]);

  const renderVariables = () => {
    return (
      hasVariables && (
        <div className='flex flex-row flex-wrap gap-2 mb-2'>
          {['name', 'employeeList'].map((variable) => (
            <VariablePlugin
              key={variable}
              editor={editor}
              variable={variable as Variable}
            />
          ))}
        </div>
      )
    );
  };

  const deserialize = (value: string) => {
    let deserializedValue = value;
    Object.keys(variableMap).forEach((key) => {
      deserializedValue = deserializedValue.replace(new RegExp(key, 'g'), variableMap[key]);
    });
    return deserializedValue;
  };

  const serialize = (value: string) => {
    let serializedValue = value;
    Object.keys(variableMap).forEach((key) => {
      serializedValue = serializedValue.replace(new RegExp(variableMap[key], 'g'), key);
    });
    return serializedValue;
  };

  const handleChange = (value: string) => {
    console.log(value);
    onChange && onChange(serialize(value.replace(/\r?\n|\r|/g, '')));
  };

  return (
    <>
      {renderVariables()}
      <Editor
        plugins={[
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ]}
        toolbar={
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help'
        }
        onInit={(_, editor: Editor['editor']) => setEditor(editor)}
        apiKey='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc'
        value={deserialize(value || '')}
        onEditorChange={(value) => handleChange(value)}
      />
    </>
  );
};

export default MceEditor;
