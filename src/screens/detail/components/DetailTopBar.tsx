import React from 'react';
import {TopBar} from '../../../components/TopBar';

export const DetailTopBar = ({
  onBackPress,
}: {
  onBackPress?: () => void;
}): React.JSX.Element => {
  return (
    <TopBar
      showBackButton={true}
      onBackPress={onBackPress}
      topbarActions={[]}
    />
  );
};
