import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Component/Common/Footer'; 

describe('Footer Component', () => {
  it('renders Footer component without crashing', () => {
    render(<Footer />);
    const footerElement = screen.getByTestId('footer-container');
    expect(footerElement).toBeInTheDocument();
  });

  it('displays the correct copyright text', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(/Copyright © 2020, Bookstore Private Limited. All Rights Reserved/i);
    expect(copyrightText).toBeInTheDocument();
  });

  
});
