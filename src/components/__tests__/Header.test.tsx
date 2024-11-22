import React from 'react';
import {render} from '@testing-library/react-native';
import {Header} from '../../Button/Header';

describe('Header Component', () => {
  it('show title', () => {
    const {getByText} = render(<Header title="Test Title" />);

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('show subtitle if present', () => {
    const {getByText} = render(
      <Header title="Test Title" subtitle="Test Subtitle" />,
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Subtitle')).toBeTruthy();
  });

  it('do not show subtitle if not present', () => {
    const {queryByText} = render(<Header title="Test Title" />);
    expect(queryByText('Test Subtitle')).toBeNull();
  });
});
