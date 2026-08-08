import React, { useState } from 'react';

export default function Tabs({ children, groupId, queryString, className, ...props }: any) {
  const [active, setActive] = useState(0);
  
  const childArray = React.Children.toArray(children).filter(React.isValidElement);
  
  return (
    <div data-testid="docusaurus-tabs" data-group={groupId} data-qs={queryString} className={className} {...props}>
      <ul role="tablist">
        {childArray.map((child: any, idx) => (
          <li 
            key={idx} 
            role="tab" 
            aria-selected={active === idx}
            onClick={() => setActive(idx)}
            data-value={child.props.value}
          >
            {child.props.label}
          </li>
        ))}
      </ul>
      <div role="tabpanel">
        {childArray[active]}
      </div>
    </div>
  );
}
