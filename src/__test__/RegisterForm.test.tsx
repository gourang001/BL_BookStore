import { render, screen } from '@testing-library/react';
import RegisterForm from '../Component/Auth/RegisterForm';
import React from 'react';


jest.mock('../Component/Auth/Template.tsx', () => {
  return () => <div data-testid="mock-template">Mock Template</div>;
});

describe('RegisterForm Component', () => {
  it('renders the register form container', () => {
    render(<RegisterForm />);
    const registerElement = screen.getByTestId('register'); 
    expect(registerElement).toBeInTheDocument();
  });

  it('renders the mocked Template component', () => {
    render(<RegisterForm />);
    const templateElement = screen.getByTestId('mock-template');
    expect(templateElement).toBeInTheDocument();
  });
});
