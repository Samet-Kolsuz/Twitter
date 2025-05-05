import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './dropdown';

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
  deleteDoc: jest.fn()
}));

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn()
  }
}));

// Mock EditModal
jest.mock('../modal/edit-modal', () => () => <div data-testid="edit-modal" />);

describe('Dropdown Component', () => {
  const mockTweet = {
    id: 'tweet123',
    user: {
      id: 'user123'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.confirm
    window.confirm = jest.fn(() => true);
  });

  it('renders dropdown menu for own tweets', () => {
    render(<Dropdown tweet={mockTweet} />);
    
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText('Eylemler')).toBeInTheDocument();
    expect(screen.getByText('Düzenle')).toBeInTheDocument();
    expect(screen.getByText('Kaldır')).toBeInTheDocument();
  });

  it('does not render for other users tweets', () => {
    const otherUserTweet = {
      ...mockTweet,
      user: { id: 'otherUser' }
    };
    render(<Dropdown tweet={otherUserTweet} />);
    
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  it('opens edit modal when edit button is clicked', () => {
    render(<Dropdown tweet={mockTweet} />);
    
    fireEvent.click(screen.getByText('Düzenle'));
    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
  });

  it('calls deleteDoc when delete is confirmed', async () => {
    const { deleteDoc } = require('firebase/firestore');
    render(<Dropdown tweet={mockTweet} />);
    
    fireEvent.click(screen.getByText('Kaldır'));
    
    expect(window.confirm).toHaveBeenCalled();
    expect(deleteDoc).toHaveBeenCalled();
  });

  it('does not delete when confirmation is cancelled', () => {
    window.confirm = jest.fn(() => false);
    const { deleteDoc } = require('firebase/firestore');
    
    render(<Dropdown tweet={mockTweet} />);
    fireEvent.click(screen.getByText('Kaldır'));
    
    expect(window.confirm).toHaveBeenCalled();
    expect(deleteDoc).not.toHaveBeenCalled();
  });
}); 