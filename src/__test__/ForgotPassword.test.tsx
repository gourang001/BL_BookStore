import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from '../Component/Common/ForgotPassword'; 
import Header from '../Component/Common/Header';


jest.mock('../Component/Common/Header', () => () => (
  <div data-testid="mock-header">Header</div>
));

describe('ForgotPassword Accessibility', () => {
  test('email input has accessible label', () => {
    render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText('Email Id');
    expect(emailInput).toHaveAccessibleName('Email Id');
  });
});