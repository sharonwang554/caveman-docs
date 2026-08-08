import React from 'react';

export default function TabItem({ children, value, label, ...props }: any) {
  return <div data-testid={`tab-item-${value}`} {...props}>{children}</div>;
}
