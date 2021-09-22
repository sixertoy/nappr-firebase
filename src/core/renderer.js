import { Children, cloneElement, isValidElement } from 'react';

const cloneChildWithProps = (child, props) => {
  const isFunctionType = typeof child.type === 'function';
  // NOTE Throw if child is a DOM Element instead of a React Component
  // Custom Props cannot be passed to DOM Element
  if (!isFunctionType) return child;
  return cloneElement(child, props);
};

export const renderWithProps = (children, props) => {
  if (!children) return null;

  const isFunction = typeof children === 'function';
  if (isFunction) return children(props);

  const isListOfChildrens =
    (Array.isArray(children) && children.length > 0) ||
    Children.count(children).length > 0;
  if (isListOfChildrens) {
    // return Children.map((p, child) => cloneChildWithProps(child, props));
    return children;
  }

  const isElement = isValidElement(children);
  if (!isElement) return null;

  return cloneChildWithProps(children, props);
};

export default renderWithProps;
