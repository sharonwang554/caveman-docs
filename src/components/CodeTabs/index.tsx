import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

interface CodeSnippet {
  language: string;
  label: string;
  code: string;
}

interface CodeTabsProps {
  snippets: CodeSnippet[];
  title?: string;
  groupId?: string;
  queryString?: boolean;
}

export default function CodeTabs({
  snippets,
  title,
  groupId = 'code-language',
  queryString = false,
}: CodeTabsProps) {
  if (!snippets || snippets.length === 0) {
    return null;
  }

  // If there's only one snippet, we don't need tabs.
  if (snippets.length === 1) {
    const single = snippets[0];
    return (
      <div className="codetabs-single">
        {title && <div className="codetabs-title">{title}</div>}
        <CodeBlock language={single.language}>
          {single.code}
        </CodeBlock>
      </div>
    );
  }

  return (
    <div className="codetabs-container">
      {title && <div className="codetabs-title">{title}</div>}
      <Tabs groupId={groupId} queryString={queryString}>
        {snippets.map((snippet, idx) => (
          <TabItem key={idx} value={snippet.language} label={snippet.label}>
            <CodeBlock language={snippet.language}>
              {snippet.code}
            </CodeBlock>
          </TabItem>
        ))}
      </Tabs>
    </div>
  );
}
