import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Form from './index';

// Mock firebase auth functions
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Form', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Giriş Yap')).toBeInTheDocument();
  });

  it('switches between login and signup modes', () => {
    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    const toggleButton = screen.getByText('Hesabın yok mu? Kaydol');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Kaydol')).toBeInTheDocument();
  });

  it('handles login submission', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({
      user: { emailVerified: true },
    });
    require('firebase/auth').signInWithEmailAndPassword = mockSignIn;

    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.any(Object),
        'test@example.com',
        'password123'
      );
      expect(mockNavigate).toHaveBeenCalledWith('/feed');
      expect(toast.success).toHaveBeenCalledWith('Oturumunuz açıldı');
    });
  });

  it('handles signup submission', async () => {
    const mockCreateUser = jest.fn().mockResolvedValue({
      user: { emailVerified: false },
    });
    require('firebase/auth').createUserWithEmailAndPassword = mockCreateUser;
    require('firebase/auth').sendEmailVerification = jest.fn().mockResolvedValue();

    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    // Switch to signup mode
    fireEvent.click(screen.getByText('Hesabın yok mu? Kaydol'));

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith(
        expect.any(Object),
        'test@example.com',
        'password123'
      );
      expect(toast.info).toHaveBeenCalledWith('Mailinize doğrulama epostası gönderildi');
    });
  });

  it('handles login error', async () => {
    const mockSignIn = jest.fn().mockRejectedValue(new Error('auth/invalid-credential'));
    require('firebase/auth').signInWithEmailAndPassword = mockSignIn;

    render(
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Hata: auth/invalid-credential');
    });
  });
}); 