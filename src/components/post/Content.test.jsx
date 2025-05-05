import { render, screen } from '@testing-library/react';
import Content from './Content';

describe('Content Component', () => {
  it('renders text content when provided', () => {
    const text = 'Test tweet content';
    render(<Content text={text} />);
    
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    const imageUrl = 'test-image.jpg';
    render(<Content image={imageUrl} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', imageUrl);
    expect(image).toHaveClass('rounded-xl');
  });

  it('renders both text and image when both are provided', () => {
    const text = 'Test tweet content';
    const imageUrl = 'test-image.jpg';
    
    render(<Content text={text} image={imageUrl} />);
    
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl);
  });

  it('does not render text or image when neither is provided', () => {
    render(<Content />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });
}); 