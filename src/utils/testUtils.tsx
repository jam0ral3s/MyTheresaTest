import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {render} from '@testing-library/react-native';
import {LIGHT_THEME} from '../styles/theme';

export const testRender = (ui: React.ReactElement, options = {}) =>
  render(<ThemeProvider theme={LIGHT_THEME}>{ui}</ThemeProvider>, options);

export * from '@testing-library/react-native';
export {testRender as render};
