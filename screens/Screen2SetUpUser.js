import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { ImageBackground } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { created_at: null };

const Screen2SetUpUser = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const navigateUser = (navigation, created_at) => {
    const newUserDelta = Date.now() - new Date(created_at).getTime();

    if (newUserDelta < 20_000) {
      navigation.navigate('Screen31PersonalizeProfile');
    } else {
      navigation.replace('BottomTabNavigator', {
        screen: 'Screen5Profile',
      });
    }
  };
  React.useEffect(() => {
    try {
      navigateUser(navigation, params?.created_at ?? defaultProps.created_at);
    } catch (err) {
      console.error(err);
    }
  }, []);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      navigateUser(navigation, params?.created_at ?? defaultProps.created_at);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ImageBackground
        resizeMode={'cover'}
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        source={imageSource(Images['localsbackground'])}
        style={StyleSheet.applyWidth(
          GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
          dimensions.width
        )}
      />
    </ScreenContainer>
  );
};

export default withTheme(Screen2SetUpUser);
