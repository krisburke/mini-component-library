/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import VisuallyHidden from '../VisuallyHidden';

const SIZES = {
  small: {
    '--height': '8px',
    '--borderRadius': '4px',
    '--fillBorderRadius': '4px',
    '--padding': 0,
  },
  medium: {
    '--height': '12px',
    '--borderRadius': '4px',
    '--fillBorderRadius': '4px',
    '--padding': 0,
  },
  large: {
    '--height': '24px',
    '--borderRadius': '8px',
    '--fillBorderRadius': '4px',
    '--padding': '4px',
  },
};

const WIDTH = '370px';

const ProgressBar = ({ value = 0, size = 'medium', className }) => {
  const styles = {
    ...SIZES[size],
    '--width': WIDTH,
  };

  if (value == null) {
    value = 0;
  }

  if (value > 100 || value < 0 || typeof value != 'number') {
    throw new Error('Value must be a number between 0 and 100.');
  }

  let FillBarComponent = size === 'large' ? LargeFillBar : FillBar;

  return (
    <ProgressBarBase
      className={className}
      style={styles}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={value}
    >
      <FillBarComponent style={styles} size={size} value={value}>
        <VisuallyHidden>{value}</VisuallyHidden>
      </FillBarComponent>
    </ProgressBarBase>
  );
};

const ProgressBarBase = styled.strong`
  display: inline-block;
  position: relative;
  height: var(--height);
  width: var(--width);
  padding: var(--padding);
  background-color: ${COLORS.transparentGray15};
  border-radius: var(--borderRadius);
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
`;

const FillBar = styled.span`
  display: inline-block;
  height: var(--height);
  width: ${(p) => `calc(var(--width) * (${p.value} / 100))`};
  background-color: ${COLORS.primary};
  vertical-align: top;
  border-radius: ${(p) =>
    `var(--fillBorderRadius) ${
      p.value === 100 ? 'var(--fillBorderRadius)' : 0
    } ${
      p.value === 100 ? 'var(--fillBorderRadius)' : 0
    } var(--fillBorderRadius)`};
`;

const LargeFillBar = styled(FillBar)`
  height: calc(var(--height) - (var(--padding) * 2));
  width: ${(p) =>
    `calc((var(--width) * (${p.value} / 100)) - (var(--padding) * 2))`};
`;

export default ProgressBar;
