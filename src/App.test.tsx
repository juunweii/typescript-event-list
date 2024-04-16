import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders App component without crashing', () => {
    render(<App />);
    expect(screen.getByText('Add New Event')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

});
