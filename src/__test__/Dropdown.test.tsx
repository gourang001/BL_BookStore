// src/__test__/Dropdown.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dropdown from '../Component/Common/Dropdown';
import * as antd from 'antd';
import { ReactNode } from 'react';


interface MockPopoverProps {
  children: ReactNode;
  content: ReactNode;
}


jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  Popover: ({ children, content }: MockPopoverProps) => (
    <div>
      <div data-testid="popover-trigger">{children}</div>
      <div data-testid="popover-content">{content}</div>
    </div>
  ),
}));

describe('Dropdown Component', () => {
  const renderWithRouter = (props = {}) => {
    return render(
      <BrowserRouter>
        <Dropdown {...props} />
      </BrowserRouter>
    );
  };

  test('renders guest view by default', () => {
    renderWithRouter();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('LOGIN/SIGNUP')).toBeInTheDocument();
  });

  test('renders with username prop', () => {
    renderWithRouter({ username: 'John' });
    expect(screen.getByText('Hello John')).toBeInTheDocument();
  });
});