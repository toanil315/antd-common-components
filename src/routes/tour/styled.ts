import styled from '@emotion/styled';

export const DomHierarchyItem = styled.li`
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
