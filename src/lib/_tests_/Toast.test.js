import React from 'react';
import { mount } from 'enzyme';
import Toast from '../components/Toast';

describe('Toaster Component', () => {
  it('Should render without errors', () => {
    const component = mount(<Toast />);
    expect(component.length).toBe(1);
  });
});
