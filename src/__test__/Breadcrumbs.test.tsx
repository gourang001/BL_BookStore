import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Breadcrumbs from '../Component/Common/Breadcrumbs'; 

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }), 
}));

describe('Breadcrumbs Component', () => {

  it('renders Breadcrumbs component without crashing', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );
    const breadcrumbElement = screen.getByTestId('breadcrumbs-container');
    expect(breadcrumbElement).toBeInTheDocument();
  });

  it('renders Home breadcrumb link', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/home');
  });

  it('renders Book breadcrumb when container is "bookPage"', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="bookPage" />
      </MemoryRouter>
    );
    const bookLink = screen.getByText('Book(2)'); 
    expect(bookLink).toBeInTheDocument();
  });

  it('renders My Order breadcrumb when container is "myOrder"', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="myOrder" />
      </MemoryRouter>
    );
    const myOrderLink = screen.getByText('My Order');
    expect(myOrderLink).toBeInTheDocument();
  });

  it('renders My Wishlist breadcrumb when container is "wishlist"', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="wishlist" />
      </MemoryRouter>
    );
    const wishlistLink = screen.getByText('My Wishlist');
    expect(wishlistLink).toBeInTheDocument();
  });

  it('renders My cart breadcrumb when container is "cart"', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="cart" />
      </MemoryRouter>
    );
    const cartLink = screen.getByText('My cart');
    expect(cartLink).toBeInTheDocument();
  });

  it('renders My Profile breadcrumb when container is "profile"', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs container="profile" />
      </MemoryRouter>
    );
    const profileLink = screen.getByText('My Profile');
    expect(profileLink).toBeInTheDocument();
  });
});
