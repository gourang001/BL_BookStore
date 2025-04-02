import { render, screen } from '@testing-library/react';
import RegisterForm from '../components/Auth/RegisterForm'; 
import Template from '../components/Auth/Template'; 


jest.mock('../components/Auth/Template', () => jest.fn(() => <div data-testid="mock-template">Template</div>));

describe('RegisterForm Component', () => {
  beforeEach(() => {
    jest.mocked(Template).mockClear();
  });

  test('renders without crashing', () => {
    render(<RegisterForm />);
    expect(screen.getByTestId('mock-template')).toBeInTheDocument();
  });
});