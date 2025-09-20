import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { ImageBackground } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import * as AuthListener from '../custom-files/AuthListener';
import * as ConsoleLogListener from '../custom-files/ConsoleLogListener';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen1SplashScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

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
      >
        <Utils.CustomCodeErrorBoundary>
          <ConsoleLogListener.ConsoleLogListener />
        </Utils.CustomCodeErrorBoundary>
        <Utils.CustomCodeErrorBoundary>
          <AuthListener.AuthListener navigation={props.navigation} />
        </Utils.CustomCodeErrorBoundary>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(Screen1SplashScreen);
