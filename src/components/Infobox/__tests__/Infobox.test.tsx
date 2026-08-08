import React from 'react';
import { render, screen } from '@testing-library/react';
import Infobox from '../index';

describe('Infobox', () => {
  it('renders with variant="tip" and correct ARIA role', () => {
    render(<Infobox variant="tip">This is a tip</Infobox>);
    const box = screen.getByRole('note');
    expect(box).toBeInTheDocument();
    expect(screen.getByText('This is a tip')).toBeInTheDocument();
    
    // Default title for tip
    expect(screen.getByText('Tip')).toBeInTheDocument();
  });

  it('renders with variant="warning" and correct ARIA role', () => {
    render(<Infobox variant="warning">This is a warning</Infobox>);
    const box = screen.getByRole('alert');
    expect(box).toBeInTheDocument();
    expect(screen.getByText('This is a warning')).toBeInTheDocument();
    
    // Default title for warning
    expect(screen.getByText('Warning')).toBeInTheDocument();
  });

  it('renders with variant="security" and correct ARIA role', () => {
    render(<Infobox variant="security">This is a security note</Infobox>);
    const box = screen.getByRole('alert');
    expect(box).toBeInTheDocument();
    expect(screen.getByText('This is a security note')).toBeInTheDocument();
    
    // Default title for security
    expect(screen.getByText('Security Note')).toBeInTheDocument();
  });

  it('displays a custom title when provided', () => {
    render(
      <Infobox variant="tip" title="Custom Tip Title">
        Content
      </Infobox>
    );
    expect(screen.getByText('Custom Tip Title')).toBeInTheDocument();
    expect(screen.queryByText('Tip')).not.toBeInTheDocument();
  });

  it('merges custom className with base styles', () => {
    render(
      <Infobox variant="tip" className="my-custom-class">
        Content
      </Infobox>
    );
    const box = screen.getByRole('note');
    expect(box).toHaveClass('my-custom-class');
    // We expect it to have some base module class too, but since we use CSS modules, 
    // it's tricky to assert the exact hashed class name. We just verify the custom one is applied.
  });

  it('supports custom icon override via prop', () => {
    const CustomIcon = () => <svg data-testid="custom-icon" />;
    render(
      <Infobox variant="tip" icon={<CustomIcon />}>
        Content
      </Infobox>
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
