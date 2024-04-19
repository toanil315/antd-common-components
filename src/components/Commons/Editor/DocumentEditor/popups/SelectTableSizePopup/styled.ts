import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledSelectTableSizePopup = styled.div`
  width: 170px;
  overflow: hidden;

  .row {
    display: flex;
    width: 100%;
  }

  .footer {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.body};
    padding-top: 8px;
  }
`;

export const StyledCell = styled.div<{ isActive?: boolean }>`
  width: 17px;
  height: 17px;
  background-color: ${({ theme }) => theme.colors.white};

  border-color: ${({ theme }) => theme.colors.grey_5};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_4};
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.colors.primary_5};
    `}
`;
