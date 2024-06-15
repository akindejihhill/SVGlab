import App from '../App.jsx';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('App smoke test', () => {
  it('renders the app', () => {
    render(<App />);
  });
});
