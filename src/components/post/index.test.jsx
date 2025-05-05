import { render, screen } from '@testing-library/react';
import Post from './index';

// Mock child components
jest.mock('../feed-form/user-avatar', () => () => <div data-testid="user-avatar" />);
jest.mock('./buttons', () => () => <div data-testid="buttons" />);
jest.mock('./Content', () => () => <div data-testid="content" />);
jest.mock('./dropdown', () => () => <div data-testid="dropdown" />);
jest.mock('./user-info', () => () => <div data-testid="user-info" />);

describe('Post Component', () => {
  const mockTweet = {
    user: {
      photo: 'test-photo.jpg',
      name: 'Test User',
      id: '123'
    },
    context: {
      text: 'Test tweet content',
      image: 'test-image.jpg'
    },
    likes: [],
    id: 'tweet123',
    createdAt: { toDate: () => new Date() }
  };

  it('renders all child components correctly', () => {
    render(<Post tweet={mockTweet} />);

    expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
  });

  it('passes correct props to child components', () => {
    render(<Post tweet={mockTweet} />);

    // Check if UserAvatar receives correct props
    const userAvatar = screen.getByTestId('user-avatar');
    expect(userAvatar).toHaveAttribute('photo', mockTweet.user.photo);
    expect(userAvatar).toHaveAttribute('name', mockTweet.user.name);

    // Check if Content receives correct props
    const content = screen.getByTestId('content');
    expect(content).toHaveAttribute('text', mockTweet.context.text);
    expect(content).toHaveAttribute('image', mockTweet.context.image);
  });
}); 