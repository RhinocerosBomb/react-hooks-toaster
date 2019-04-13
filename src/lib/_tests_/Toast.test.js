import React from 'react';
import { shallow } from 'enzyme';
import Toast from '../components/Toast';

describe('Toaster Component', () => {
  it('Should render without errors', () => {
    const component = shallow(<Toast />);
    expect(component.length).toBe(1);
  });
});
