import '../../helpers/setup';
import * as React from 'react';
import WorkList from '../../../src/components/WorkList';
import Work from '../../../src/api/Work';
import { shallow } from 'enzyme';
import { default as toJson } from 'enzyme-to-json';

describe('ErrorIcon', () => {
  it('matches with snapshot', () => {
    const items: Work[] = [
      {
        id: 'work-1',
        author: 'John',
        body: 'ABC',
      },
      {
        id: 'work-2',
        author: 'Mary',
        body: 'XYZ',
      },
    ];
    const tree = toJson(shallow(<WorkList items={items} />));

    expect(tree).toMatchSnapshot();
  });
});
