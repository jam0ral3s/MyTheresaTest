import React from 'react';
import {TopBar} from '../../../components/TopBar';
import {Images} from '../../../styles/images';
import {Navigate} from '../../../screens/navigation/navigationTypes';
import {useDarkMode} from '../../../service/DarkModeProvider';

export const HomeTopBar = ({
  navigate,
}: {
  navigate?: Navigate;
  onToggleTheme?: () => void;
}): React.JSX.Element => {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
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
        {
          icon: isDarkMode ? Images.darkMode : Images.lightMode,
          text: 'Favorite',
          onPress: () => {
            toggleDarkMode();
          },
        },
      ]}
    />
  );
};
