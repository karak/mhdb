import '../../helpers/setup';
import * as React from 'react';
import ProgressRing from '../../../src/components/ProgressRing';
import { shallow } from 'enzyme';
import { default as toJson } from 'enzyme-to-json';

describe('ProgressRing', () => {
  describe('props loading', () => {
    it('is visible if true', async () => {
      const wrapper = shallow(<ProgressRing loading={true} />);
      const deepWrapper = wrapper.find('RefreshIndicator');

      expect(deepWrapper.prop('status')).toBe('loading');
    });

    it('is visible by default', async () => {
      const wrapper = shallow(<ProgressRing />);
      const deepWrapper = wrapper.find('RefreshIndicator');

      expect(deepWrapper.prop('status')).toBe('loading');
    });

    it('is hidden if false', async () => {
      const wrapper = shallow(<ProgressRing loading={false} />);
      const deepWrapper = wrapper.find('RefreshIndicator');

      expect(deepWrapper.prop('status')).toBe('hide');
    });
  });

  it('matches with snapshot', () => {
    const tree = toJson(shallow(<ProgressRing />));

    expect(tree).toMatchSnapshot();
  });
});
