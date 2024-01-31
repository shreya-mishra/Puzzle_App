import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../src/App';

test('renders correctly', () => {
  const {getByText} = render(<App />);
  const linkElement = getByText(/Water Tank Simulation/i);
  expect(linkElement).toBeTruthy();
});
