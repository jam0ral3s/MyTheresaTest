import React from 'react';
import {TopBar} from '../../../components/TopBar';
import {Images} from '../../../styles/images';
import {Navigate} from '@/screens/navigation/navigationTypes';

export const HomeTopBar = ({
  navigate,
}: {
  navigate?: Navigate;
}): React.JSX.Element => {
  return (
    <TopBar
      showBackButton={false}
      topbarActions={[
        {
          icon: Images.favorite,
          text: 'Favorite',
          onPress: () => {
            navigate?.('Favorite');
          },
        },
      ]}
    />
  );
};
