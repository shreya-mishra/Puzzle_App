import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import App from '../src/App';
import renderer from 'react-test-renderer';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
