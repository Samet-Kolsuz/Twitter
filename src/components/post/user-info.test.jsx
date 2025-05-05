import { render, screen } from '@testing-library/react';
import UserInfo from './user-info';
import moment from 'moment';

// Mock moment
jest.mock('moment', () => {
  const mMoment = {
    fromNow: jest.fn().mockReturnValue('2 hours ago')
  };
  return jest.fn(() => mMoment);
});

// Mock getUserName
jest.mock('../../utils/helpers', () => ({
  getUserName: jest.fn().mockReturnValue('@testuser')
}));

describe('UserInfo Component', () => {
  const mockTweet = {
    user: {
      name: 'Test User'
    },
    createdAt: { toDate: () => new Date() },
    isEdited: false
  };

  it('renders user information correctly', () => {
    render(<UserInfo tweet={mockTweet} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('shows edit indicator when tweet is edited', () => {
    const editedTweet = { ...mockTweet, isEdited: true };
    render(<UserInfo tweet={editedTweet} />);

    expect(screen.getByText('Duzenlendi')).toBeInTheDocument();
  });

  it('does not show edit indicator when tweet is not edited', () => {
    render(<UserInfo tweet={mockTweet} />);

    expect(screen.queryByText('Duzenlendi')).not.toBeInTheDocument();
  });
}); 