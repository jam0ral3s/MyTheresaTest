import React from 'react';
import {TopBar} from '../../../components/TopBar';
import {Images} from '../../../styles/images';

export const HomeTopBar = (): React.JSX.Element => {
  return (
    <TopBar
      showBackButton={false}
      topbarActions={[
        {
          icon: Images.favorite,
          text: 'Favorite',
          onPress: () => console.log('Action Pressed'),
        },
      ]}
    />
  );
};
