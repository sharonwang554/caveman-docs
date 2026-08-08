import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CodeTabs from '../index';

describe('CodeTabs', () => {
  const defaultSnippets = [
    { language: 'python', label: 'Python', code: 'print("Python")' },
    { language: 'javascript', label: 'JavaScript', code: 'console.log("JS")' },
    { language: 'go', label: 'Go', code: 'fmt.Println("Go")' },
  ];

  it('renders all provided language tabs', () => {
    render(<CodeTabs snippets={defaultSnippets} />);
    
    // Should render the tabs container (mocked as data-testid="docusaurus-tabs")
    expect(screen.getByTestId('docusaurus-tabs')).toBeInTheDocument();
    
    // Should render all tab labels
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
  });

  it('uses groupId="code-language" by default', () => {
    render(<CodeTabs snippets={defaultSnippets} />);
    const tabs = screen.getByTestId('docusaurus-tabs');
    expect(tabs).toHaveAttribute('data-group', 'code-language');
  });

  it('supports custom groupId override', () => {
    render(<CodeTabs snippets={defaultSnippets} groupId="custom-group" />);
    const tabs = screen.getByTestId('docusaurus-tabs');
    expect(tabs).toHaveAttribute('data-group', 'custom-group');
  });

  it('renders code blocks with correct language class', () => {
    render(<CodeTabs snippets={defaultSnippets} />);
    
    // Check if the mock renders the Python code block correctly
    const codeBlock = screen.getByText('print("Python")');
    expect(codeBlock).toBeInTheDocument();
    expect(codeBlock).toHaveClass('language-python');
  });

  it('supports queryString prop for URL sharing', () => {
    render(<CodeTabs snippets={defaultSnippets} queryString={true} />);
    const tabs = screen.getByTestId('docusaurus-tabs');
    // Using string 'true' because our mock passes it down to data-qs
    expect(tabs).toHaveAttribute('data-qs', 'true');
  });

  it('renders optional title above tabs', () => {
    render(<CodeTabs snippets={defaultSnippets} title="Example Usage" />);
    expect(screen.getByText('Example Usage')).toBeInTheDocument();
  });

  it('handles single-language gracefully by not rendering the tabs wrapper', () => {
    const singleSnippet = [
      { language: 'python', label: 'Python', code: 'print("Single")' },
    ];
    render(<CodeTabs snippets={singleSnippet} />);
    
    // Should NOT render the Tabs wrapper
    expect(screen.queryByTestId('docusaurus-tabs')).not.toBeInTheDocument();
    
    // Should just render the CodeBlock directly
    const codeBlock = screen.getByText('print("Single")');
    expect(codeBlock).toBeInTheDocument();
    expect(codeBlock).toHaveClass('language-python');
  });
});
