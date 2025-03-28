import { render, screen } from '@testing-library/react';
import LoginForm from '../Component/Auth/LoginForm';
import React from 'react';


jest.mock('../Component/Auth/Template.tsx', () => {
  return () => <div data-testid="mock-template">Mock Template</div>;
});

describe('LoginForm Component', () => {
  it('renders the login form container', () => {
    render(<LoginForm />);
    const loginElement = screen.getByTestId('login'); 
    expect(loginElement).toBeInTheDocument();
  });

  it('renders the mocked Template component', () => {
    render(<LoginForm />);
    const templateElement = screen.getByTestId('mock-template');
    expect(templateElement).toBeInTheDocument();
  });
});
