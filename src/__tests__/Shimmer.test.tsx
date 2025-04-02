import React from 'react';
import { render, screen } from '@testing-library/react';
import Shimmer from '../components/BookContainer/Shimmer'; 

describe('Shimmer Component', () => {
  test('renders shimmer card with correct structure', () => {
    render(<Shimmer />);
    
    const shimmerCard = screen.getByTestId('shimmer-card');
    expect(shimmerCard).toBeInTheDocument();
    expect(shimmerCard).toHaveClass('h-[275px] w-[235px] border border-[#E2E2E2] rounded-[3px] overflow-hidden');

    const coverPlaceholder = screen.getByTestId('cover-placeholder');
    expect(coverPlaceholder).toHaveClass('h-[171px] w-full bg-[#F5F5F5] animate-pulse');

    const detailsSection = screen.getByTestId('details-placeholder');
    expect(detailsSection).toHaveClass('h-[102px] w-full pl-[10px] pt-[10px]');
  });

  test('applies correct responsive class for small screens', () => {
    render(<Shimmer />);
    
    const shimmerCard = screen.getByTestId('shimmer-card');
    expect(shimmerCard).toHaveClass('max-[500px]:w-[175px]');
  });

  test('renders all placeholder elements with correct animations', () => {
    render(<Shimmer />);
    
    const animatedElements = screen.getAllByTestId('shimmer-placeholder');
    expect(animatedElements).toHaveLength(7); 
    
    animatedElements.forEach(element => {
      expect(element).toHaveClass('background-animate');
      expect(element).toHaveClass('bg-gradient-to-r');
      expect(element).toHaveClass('from-[#f0f0f0]');
      expect(element).toHaveClass('via-[#e0e0e0]');
      expect(element).toHaveClass('to-[#f0f0f0]');
    });
  });

  
  test('renders placeholder elements with correct dimensions', () => {
    render(<Shimmer />);
    
    const animatedElements = screen.getAllByTestId('shimmer-placeholder');
    
    
    expect(animatedElements[0]).toHaveClass('h-[135px] w-[105px]');
    
    expect(animatedElements[1]).toHaveClass('h-[14px] w-[80%]');
    
    expect(animatedElements[2]).toHaveClass('h-[10px] w-[60%]');
    
    expect(animatedElements[3]).toHaveClass('w-[33px] h-[16px]');
    expect(animatedElements[4]).toHaveClass('w-[40px] h-[10px]');
    
    expect(animatedElements[5]).toHaveClass('w-[50px] h-[12px]');
    expect(animatedElements[6]).toHaveClass('w-[40px] h-[10px]');
  });
});