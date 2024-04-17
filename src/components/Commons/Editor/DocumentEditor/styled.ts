import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledDocumentEditor = styled.div`
  height: calc(100vh - 120px);
  width: 800px;
  margin: 0 auto;

  & > div {
    width: 100%;
    height: 100%;
  }

  .ProseMirror {
    width: 100%;
    height: 100%;
    padding: 20px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background-color: #f7fafc;

    &-focused {
      outline: none;
    }
  }

  .tiptap {
    > * + * {
      margin-top: 0.75em;
    }

    img {
      max-width: 100%;
      height: auto;

      &.ProseMirror-selectednode {
        outline: 3px solid ${({ theme }) => theme.colors.primary_6};
      }
    }

    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      margin: 0;
      overflow: hidden;

      td,
      th {
        min-width: 1em;
        border: 2px solid #ced4da;
        padding: 8px;
        vertical-align: top;
        box-sizing: border-box;
        position: relative;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        font-weight: bold;
        text-align: left;
        background-color: #f1f3f5;
      }

      .selectedCell:after {
        z-index: 2;
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }

      .column-resize-handle {
        position: absolute;
        right: -2px;
        top: 0;
        bottom: -2px;
        width: 4px;
        background-color: #adf;
        pointer-events: none;
      }
    }
  }

  .tableWrapper {
    overflow-x: auto;
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
`;

export const StyledMenuBar = styled.nav`
  padding: 15px 0;
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey_2};

  display: flex;
  flex-flow: column nowrap;
  gap: 10px;

  .top,
  .bottom {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 2px;
  }

  .top {
    gap: 20px;
    margin: 0 6px 6px;

    & button {
      font-size: ${({ theme }) => theme.fontSizes.body};
    }
  }
`;

export const StyledButtonView = styled.button<{ isActive?: boolean }>`
  padding: 6px;
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: ${({ theme }) => theme.radii.small};
  transition: all 0.2s ease-out;
  cursor: pointer;

  font-size: ${({ theme }) => theme.fontSizes.h5};

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 14px;

  &:hover {
    background: ${({ theme }) => theme.colors.grey_4};
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background: ${theme.colors.grey_4};
    `}
`;

export const MenuBarSeparator = styled.span`
  display: inline-block;
  height: 18px;
  border-right: 2px solid ${({ theme }) => theme.colors.grey_5};
  margin: 0 10px;
`;
