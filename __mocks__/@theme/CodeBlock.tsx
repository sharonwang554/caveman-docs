import React from 'react';

export default function CodeBlock({ children, language, ...props }: any) {
  return (
    <pre {...props}>
      <code className={`language-${language}`}>{children}</code>
    </pre>
  );
}
