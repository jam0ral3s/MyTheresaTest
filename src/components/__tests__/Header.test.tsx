import React from 'react';

import {Header} from '../Header';
import {testRender} from '../../utils/testUtils';

describe('Header Component', () => {
  it('show title', () => {
    const {getByText} = testRender(<Header title="Test Title" />);

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('show subtitle if present', () => {
    const {getByText} = testRender(
      <Header title="Test Title" subtitle="Test Subtitle" />,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Subtitle')).toBeTruthy();
  });

  it('do not show subtitle if not present', () => {
    const {queryByText} = testRender(<Header title="Test Title" />);
    expect(queryByText('Test Subtitle')).toBeNull();
  });
});
