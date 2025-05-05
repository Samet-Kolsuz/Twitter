import { render, screen, fireEvent } from '@testing-library/react';
import Buttons from './buttons';

// Mock Firebase auth and db
jest.mock('../../firebase', () => ({
  auth: {
    currentUser: {
      uid: 'user123'
    }
  },
  db: {}
}));

// Mock Firebase Firestore functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
  arrayRemove: jest.fn(),
  arrayUnion: jest.fn()
}));

describe('Buttons Component', () => {
  const mockTweet = {
    id: 'tweet123',
    likes: ['user123', 'user456']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all buttons correctly', () => {
    render(<Buttons tweet={mockTweet} />);

    expect(screen.getByRole('button', { name: /comment/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retweet/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('shows filled heart when user has liked the tweet', () => {
    render(<Buttons tweet={mockTweet} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton.querySelector('svg')).toHaveClass('text-pink-500');
  });

  it('shows empty heart when user has not liked the tweet', () => {
    const unlikedTweet = { ...mockTweet, likes: ['user456'] };
    render(<Buttons tweet={unlikedTweet} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton.querySelector('svg')).not.toHaveClass('text-pink-500');
  });

  it('shows correct like count', () => {
    render(<Buttons tweet={mockTweet} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
}); 