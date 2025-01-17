import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledDocumentEditor = styled.div`
  width: 800px;
  height: calc(100vh - 120px);
  margin: 0 auto;

  & > div {
    &:first-of-type {
      width: 100%;
      height: 100%;
    }
  }

  .ProseMirror {
    width: 100%;
    height: 100%;
    overflow: auto;

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

      &.ProseMirror-selectednode {
        outline: 3px solid ${({ theme }) => theme.colors.primary_6};
      }
    }

    p {
      display: block;
      font-size: ${({ theme }) => theme.fontSizes.body};
      line-height: ${({ theme }) => theme.lineHeights.h5};

      span > * {
        font-family: inherit;
      }

      a {
        color: ${({ theme }) => theme.colors.primary_6} !important;
        & * {
          color: ${({ theme }) => theme.colors.primary_6} !important;
        }
      }
    }

    p.is-empty:before {
      color: #adb5bd;
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
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

  .drag-handle {
    position: fixed;
    opacity: 1;
    transition: opacity ease-in 0.2s;
    border-radius: 0.25rem;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' style='fill: rgba(0, 0, 0, 0.5)'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
    background-size: calc(0.5em + 0.375rem) calc(0.5em + 0.375rem);
    background-repeat: no-repeat;
    background-position: center;
    width: 1.2rem;
    height: 1.5rem;
    z-index: 50;
    cursor: grab;

    &:hover {
      background-color: var(--novel-stone-100);
      transition: background-color 0.2s;
    }

    &:active {
      background-color: var(--novel-stone-200);
      transition: background-color 0.2s;
      cursor: grabbing;
    }

    &.hide {
      opacity: 0;
      pointer-events: none;
    }

    @media screen and (max-width: 600px) {
      display: none;
      pointer-events: none;
    }
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

export const StyledButtonView = styled.button<{ isActive?: boolean; disabled?: boolean }>`
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

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.colors.grey_4};
      svg {
        fill: ${theme.colors.grey_4};
      }
      pointer-events: none;
    `}
`;

export const MenuBarSeparator = styled.span`
  display: inline-block;
  height: 18px;
  border-right: 2px solid ${({ theme }) => theme.colors.grey_5};
  margin: 0 10px;
`;

export const StyledTableBubbleMenu = styled.div`
  width: 400px;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 6px;
  border-radius: ${({ theme }) => theme.radii.large};

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;
