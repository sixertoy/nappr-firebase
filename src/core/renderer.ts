import type { PropsWithChildren } from 'react';
import { Children, cloneElement, isValidElement } from 'react';

interface RenderProps extends Required<PropsWithChildren> {
  props: Record<string, any>;
}

const cloneChildWithProps = ({ children, props }: RenderProps) => {
  const isFunctionType = typeof children.type === 'function';
  // NOTE Throw if child is a DOM Element instead of a React Component
  // Custom Props cannot be passed to DOM Element
  if (!isFunctionType) {
    return children;
  }

  return cloneElement(children, props);
};

export const renderWithProps = ({ children, props }: RenderProps) => {
  if (!children) return null;

  const isFunction = typeof children === 'function';
  if (isFunction) {
    return children(props);
  }

  const isListOfChildrens =
    (Array.isArray(children) && children.length > 0) ||
    Children.count(children) > 0;

  if (isListOfChildrens) {
    // return Children.map((p, child) => cloneChildWithProps(child, props));
    return children;
  }

  const isElement = isValidElement(children);
  if (!isElement) {
    return null;
  }

  return cloneChildWithProps({ children, props });
};
