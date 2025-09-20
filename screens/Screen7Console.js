import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import { View } from 'react-native';
import * as InAppPreviewConsole from '../custom-files/InAppPreviewConsole';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen7Console = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
    >
      <View
        style={StyleSheet.applyWidth({ marginTop: '15%' }, dimensions.width)}
      >
        <Utils.CustomCodeErrorBoundary>
          <InAppPreviewConsole.InAppConsole />
        </Utils.CustomCodeErrorBoundary>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Screen7Console);
