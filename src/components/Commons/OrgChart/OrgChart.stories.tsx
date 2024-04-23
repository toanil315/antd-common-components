import type { Meta, StoryObj } from '@storybook/react';
import OrgChart from './OrgChart';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OrgChart> = {
  title: 'Components/OrgChart',
  component: OrgChart,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component:
          'OrgChart component, Please try in another place. Storybook not support to import react-dom/server so this component cause error in storybook',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof OrgChart>;

// const data = [
//   {
//     name: 'Ian Devling',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CTO office',
//     tags: 'Ceo,tag1,manager,cto',
//     isLoggedUser: 'false',
//     positionName: 'Chief Executive Officer ',
//     id: 'O-6066',
//     parentId: '',
//     size: '',
//     _directSubordinates: 4,
//     _totalSubordinates: 1515,
//   },
//   {
//     name: 'Davolio Nancy',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CTO ',
//     id: 'O-6067',
//     parentId: 'O-6066',
//     size: '',
//     _directSubordinates: 9,
//     _totalSubordinates: 812,
//   },
//   {
//     name: ' Leverling Janet',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CTO ',
//     id: 'O-6068',
//     parentId: 'O-6066',
//     size: '',
//     _directSubordinates: 3,
//     _totalSubordinates: 413,
//   },
//   {
//     name: ' Leverling Janet',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CTO ',
//     id: 'O-6069',
//     parentId: 'O-6066',
//     size: '',
//     _directSubordinates: 3,
//     _totalSubordinates: 142,
//   },
//   {
//     name: ' Leverling Janet',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CTO ',
//     id: 'O-6070',
//     parentId: 'O-6066',
//     size: '',
//     _directSubordinates: 3,
//     _totalSubordinates: 144,
//   },
//   {
//     name: ' Leverling Janet',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CTO ',
//     id: 'O-6071',
//     parentId: 'O-6067',
//     size: '',
//     _directSubordinates: 9,
//     _totalSubordinates: 429,
//   },
//   {
//     name: 'Fuller Andrew',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Linear Manager',
//     id: 'O-6072',
//     parentId: 'O-6067',
//     size: '',
//     _directSubordinates: 9,
//     _totalSubordinates: 159,
//   },
//   {
//     name: 'Peacock Margaret',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CEO',
//     id: 'O-6073',
//     parentId: 'O-6067',
//     size: '',
//     _directSubordinates: 9,
//     _totalSubordinates: 24,
//   },
//   {
//     name: 'Buchanan Steven',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Head of direction',
//     id: 'O-6074',
//     parentId: 'O-6067',
//     size: '',
//     _directSubordinates: 9,
//     _totalSubordinates: 136,
//   },
//   {
//     name: 'Suyama Michael',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior sales manager',
//     id: 'O-6075',
//     parentId: 'O-6067',
//     size: '',
//     _directSubordinates: 0,
//     _totalSubordinates: 0,
//   },
//   {
//     name: 'King Robert',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior Sales Manager',
//     id: 'O-6076',
//     parentId: 'O-6067',
//     size: '',
//     _directSubordinates: 2,
//     _totalSubordinates: 26,
//   },
//   {
//     name: 'West Adam',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CTO',
//     id: 'O-6077',
//     parentId: 'O-6067',
//     size: '',
//     _directSubordinates: 0,
//     _totalSubordinates: 0,
//   },
//   {
//     name: 'Charlotte Cooper',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior Trader',
//     id: 'O-6078',
//     parentId: 'O-6067',
//     size: '',
//     _directSubordinates: 1,
//     _totalSubordinates: 25,
//   },
//   {
//     name: 'Yoshi Nagase',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Head of laboratory',
//     id: 'O-6079',
//     parentId: 'O-6067',
//     size: '',
//     _directSubordinates: 4,
//     _totalSubordinates: 4,
//   },
//   {
//     name: 'Peter Wilson',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Head of channels',
//     id: 'O-6080',
//     parentId: 'O-6068',
//     size: '',
//     _directSubordinates: 9,
//     _totalSubordinates: 272,
//   },
//   {
//     name: 'Carlos Diaz',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior Android Developer',
//     id: 'O-6081',
//     parentId: 'O-6068',
//     size: '',
//     _directSubordinates: 9,
//     _totalSubordinates: 136,
//   },
//   {
//     name: 'Sven Petersen',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior Developer',
//     id: 'O-6082',
//     parentId: 'O-6068',
//     size: '',
//     _directSubordinates: 2,
//     _totalSubordinates: 2,
//   },
//   {
//     name: 'Peter Wilson',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Head of channels',
//     id: 'O-6083',
//     parentId: 'O-6069',
//     size: '',
//     _directSubordinates: 1,
//     _totalSubordinates: 1,
//   },
//   {
//     name: 'Carlos Diaz',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior Android Developer',
//     id: 'O-6084',
//     parentId: 'O-6069',
//     size: '',
//     _directSubordinates: 9,
//     _totalSubordinates: 136,
//   },
//   {
//     name: 'Sven Petersen',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior Developer',
//     id: 'O-6085',
//     parentId: 'O-6069',
//     size: '',
//     _directSubordinates: 2,
//     _totalSubordinates: 2,
//   },
//   {
//     name: 'Peter Wilson',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Head of channels',
//     id: 'O-6086',
//     parentId: 'O-6070',
//     size: '',
//     _directSubordinates: 1,
//     _totalSubordinates: 1,
//   },
//   {
//     name: 'Carlos Diaz',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior Android Developer',
//     id: 'O-6087',
//     parentId: 'O-6070',
//     size: '',
//     _directSubordinates: 2,
//     _totalSubordinates: 138,
//   },
//   {
//     name: 'Sven Petersen',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior Developer',
//     id: 'O-6088',
//     parentId: 'O-6070',
//     size: '',
//     _directSubordinates: 2,
//     _totalSubordinates: 2,
//   },
//   {
//     name: ' Leverling Janet',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/female.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CTO ',
//     id: 'O-6089',
//     parentId: 'O-6071',
//     size: '',
//     _directSubordinates: 3,
//     _totalSubordinates: 142,
//   },
//   {
//     name: 'Fuller Andrew',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Linear Manager',
//     id: 'O-6090',
//     parentId: 'O-6071',
//     size: '',
//     _directSubordinates: 0,
//     _totalSubordinates: 0,
//   },
//   {
//     name: 'Peacock Margaret',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CEO',
//     id: 'O-6091',
//     parentId: 'O-6071',
//     size: '',
//     _directSubordinates: 0,
//     _totalSubordinates: 0,
//   },
//   {
//     name: 'Buchanan Steven',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Head of direction',
//     id: 'O-6092',
//     parentId: 'O-6071',
//     size: '',
//     _directSubordinates: 0,
//     _totalSubordinates: 0,
//   },
//   {
//     name: 'Suyama Michael',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior sales manager',
//     id: 'O-6093',
//     parentId: 'O-6071',
//     size: '',
//     _directSubordinates: 0,
//     _totalSubordinates: 0,
//   },
//   {
//     name: 'King Robert',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'Senior Sales Manager',
//     id: 'O-6094',
//     parentId: 'O-6071',
//     size: '',
//     _directSubordinates: 2,
//     _totalSubordinates: 2,
//   },
//   {
//     name: 'West Adam',
//     imageUrl:
//       'https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/general.jpg',
//     area: 'Corporate',
//     profileUrl: 'http://example.com/employee/profile',
//     office: 'CEO office',
//     tags: 'Ceo,tag1, tag2',
//     isLoggedUser: 'false',
//     positionName: 'CTO',
//     id: 'O-6095',
//     parentId: 'O-6071',
//     size: '',
//     _directSubordinates: 9,
//     _totalSubordinates: 136,
//   },
// ];

export const Primary: Story = {
  render: () => {
    return (
      <div className='w-screen h-screen bg-gray-50'>
        {/* <OrgChart
          data={data}
          onNodeClick={(nodeId) => console.log(nodeId)}
          collapseButtonRender={(node) => (
            <div className='text-gray-500 rounded-md px-1 text-sm m-auto bg-white border border-solid border-gray-200'>
              <span className='text-sm'>
                {node.children ? (
                  <ArrowUpIcon
                    width={10}
                    height={10}
                  />
                ) : (
                  <ArrowDownIcon
                    width={10}
                    height={10}
                  />
                )}
              </span>
              {node.data._directSubordinates}
            </div>
          )}
          nodeContentRender={(node) => (
            <div
              className={`font-inter bg-white absolute mt-[-1px] ml-[-1px] w-[200px] h-[120px] rounded-lg border border-[#E4E2E9]`}
            >
              <div className='bg-white absolute mt-[-25px] ml-[15px] rounded-full w-12 h-12'></div>
              <img
                src={node.data.imageUrl}
                className='absolute mt-[-20px] ml-[20px] rounded-full w-10 h-10'
              />
              <div className='text-[#08011E] absolute right-5 top-4 text-xs'>
                <i className='fas fa-ellipsis-h'></i>
              </div>
              <div className='text-lg text-[#08011E] ml-5 mt-8'>{node.data.name}</div>
              <div className='text-[#716E7B] ml-5 mt-1 text-xs'>{node.data.positionName}</div>
            </div>
          )}
        /> */}
      </div>
    );
  },
};
