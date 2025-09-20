import React from 'react';
import {
  Button,
  Circle,
  ExpoImage,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Supabase from '../custom-files/Supabase';
import GetMyProfile from '../global-functions/GetMyProfile';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen5Profile = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [post_description, setPost_description] = React.useState('');
  const LogOut = async setGlobalVariableValue => {
    const supabase = Supabase.getSupabase();

    try {
      console.log('Logging out user...');

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setGlobalVariableValue({ key: 'AvatarImage', value: '' });
      setGlobalVariableValue({ key: 'ProfileId', value: '' });
      setGlobalVariableValue({ key: 'ProfileName', value: '' });

      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);

      return;
    }
  };

  const createPost = async Variables => {
    const supabase = Supabase.getSupabase();

    const { data, error } = await supabase.rpc('create_post', {
      p_profile_id: Variables.ProfileId,
      p_description: post_description,
    });

    if (error) return console.log('Create post error:', error), null;

    console.log('Post created:', data);
    return data;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await GetMyProfile(setGlobalVariableValue);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      hasTopSafeArea={true}
      scrollable={true}
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: palettes['1_Locals'].Canvas,
          gap: 15,
          justifyContent: 'flex-start',
          marginBottom: 24,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
        },
        dimensions.width
      )}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes['1_Locals'].Canvas,
            height: 30,
            justifyContent: 'center',
            width: '100%',
          },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Text'].style,
              theme.typography.body1,
              {}
            ),
            dimensions.width
          )}
        >
          {'Locals'}
        </Text>
      </View>

      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        style={StyleSheet.applyWidth(
          {
            alignSelf: 'stretch',
            backgroundColor: palettes.Brand.Background,
            maxWidth: 360,
            paddingBottom: 24,
            paddingTop: 12,
          },
          dimensions.width
        )}
      >
        {/* Profile */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              alignSelf: 'stretch',
              gap: 16,
              marginBottom: 5,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', overflow: 'hidden' },
              dimensions.width
            )}
          >
            <Circle
              style={StyleSheet.applyWidth(
                {
                  borderBottomWidth: 1,
                  borderColor: palettes['1_Locals']['BrandGreen500 '],
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  height: 96,
                  overflow: 'hidden',
                  width: 96,
                },
                dimensions.width
              )}
            >
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['Image'].props}
                source={imageSource(Constants['AvatarImage'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image'].style,
                    { height: '100%', width: '100%' }
                  ),
                  dimensions.width
                )}
              />
            </Circle>
          </View>
          {/* Name */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(theme.typography.headline2, {
                alignSelf: 'center',
                color: palettes['1_Locals'].BrandGreen700,
                marginTop: 8,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {Constants['ProfileName']}
          </Text>
          {/* Question */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(theme.typography.headline3, {
                alignSelf: 'center',
                color: palettes['1_Locals'].BrandGreen600,
                marginTop: 8,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'What’s happening around you?'}
          </Text>
          {/* Post */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                alignSelf: 'stretch',
                borderRadius: 12,
                gap: 8,
                marginTop: 8,
                minHeight: 140,
                padding: 0,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={true}
              changeTextDelay={500}
              onChangeText={newTextInputValue => {
                try {
                  setPost_description(newTextInputValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              placeholder={'Enter a value...'}
              webShowOutline={true}
              {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
              multiline={true}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                  theme.typography.body1,
                  {
                    alignSelf: 'stretch',
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderColor: palettes['1_Locals'].BrandGreen100,
                    borderRadius: 12,
                    color: palettes['1_Locals'].BrandGreen700,
                    height: 120,
                    paddingBottom: 14,
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 14,
                  }
                ),
                dimensions.width
              )}
              value={post_description}
            />
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    await createPost(Variables);
                    setPost_description('...');
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              disabledOpacity={0.3}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(theme.typography.button, {
                  backgroundColor: palettes['1_Locals'].BrandGreen700,
                  borderRadius: 12,
                  color: palettes.App['Custom #ffffff'],
                  height: 48,
                  marginBottom: 250,
                  marginTop: 8,
                }),
                dimensions.width
              )}
              title={'Send'}
            />
            {/* Button 2 */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    await LogOut(setGlobalVariableValue);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              disabledOpacity={0.3}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(theme.typography.button, {
                  backgroundColor: palettes.App['Custom #f06454'],
                  borderRadius: 12,
                  color: palettes.App['Custom #ffffff'],
                  height: 48,
                  marginTop: 8,
                }),
                dimensions.width
              )}
              title={'Log out'}
            />
          </View>
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Screen5Profile);
