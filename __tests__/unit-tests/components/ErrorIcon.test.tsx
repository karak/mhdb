import '../../helpers/setup';
import * as React from 'react';
import ErrorIcon from '../../../src/components/ErrorIcon';
import { shallow } from 'enzyme';
import { default as toJson } from 'enzyme-to-json';

describe('ErrorIcon', () => {
  it('matches with snapshot', () => {
    const tree = toJson(shallow(<ErrorIcon />));

    expect(tree).toMatchSnapshot();
  });
});
