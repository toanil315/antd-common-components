import React from 'react';
import './style.css';
import { StyledSkeletonLoader } from './styled';

interface Props {
  children: React.ReactElement;
  animation: 'wave' | 'pulse' | 'none';
  loading: boolean;
}

const Skeleton = ({ loading, animation, children }: Props) => {
  return (
    <StyledSkeletonLoader
      loading={loading}
      animation={animation}
    >
      {children}
    </StyledSkeletonLoader>
  );
};

const Primary = ({ children }: Pick<Props, 'children'>) => {
  return React.cloneElement(children, {
    ...children.props,
    className: `sm-item-primary ${children.props.className || ''}`,
  });
};

const Secondary = ({ children }: Pick<Props, 'children'>) => {
  return React.cloneElement(children, {
    ...children.props,
    className: `sm-item-secondary ${children.props.className || ''}`,
  });
};

export { Skeleton, Primary, Secondary };
