import { useModal } from '@/hooks';
import { Editor } from '@tinymce/tinymce-react';
import React, { useMemo } from 'react';
import InsertVariableModal from '../modals/InsertVariable.modal';

export type Variable = 'name' | 'employeeList';

interface Props {
  editor?: Editor['editor'] | null;
  variable: Variable;
}

const VariablePlugin = ({ editor, variable }: Props) => {
  const insertVariablesModal = useModal();

  const variableLabels = useMemo(() => {
    return {
      name: 'Name',
      employeeList: 'Employee List',
    };
  }, []);

  const label = variableLabels[variable];

  return (
    <>
      <div
        className='px-4 py-2 rounded-md bg-blue-300 text-gray-600 cursor-pointer'
        onClick={insertVariablesModal.show}
      >
        {label}
      </div>
      <InsertVariableModal
        modal={insertVariablesModal}
        variable={variable}
        editor={editor}
      />
    </>
  );
};

export default VariablePlugin;
