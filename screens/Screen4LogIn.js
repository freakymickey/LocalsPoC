import React from 'react';
import {
  Button,
  Divider,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Supabase from '../custom-files/Supabase';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen4LogIn = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [login_email, setLogin_email] = React.useState('');
  const [login_password, setLogin_password] = React.useState('');
  const LogIn = async () => {
    const supabase = Supabase.getSupabase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: login_email,
      password: login_password,
    });

    if (error) {
      console.log('Error LogIn', error);
      return null;
    }

    return data;
  };

  return (
    <ScreenContainer
      scrollable={false}
      {...GlobalStyles.ScreenContainerStyles(theme)['Formula'].props}
      hasSafeArea={true}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        StyleSheet.compose(
          GlobalStyles.ScreenContainerStyles(theme)['Formula'].style,
          { justifyContent: 'space-between' }
        ),
        dimensions.width
      )}
    >
      <SimpleStyleKeyboardAwareScrollView
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        {...GlobalStyles.SimpleStyleKeyboardAwareScrollViewStyles(theme)[
          'Formula 2'
        ].props}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps={'always'}
        style={StyleSheet.applyWidth(
          GlobalStyles.SimpleStyleKeyboardAwareScrollViewStyles(theme)[
            'Formula 2'
          ].style,
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, paddingLeft: 30, paddingRight: 30, paddingTop: 20 },
            dimensions.width
          )}
        >
          {/* Heading */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Heading'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Heading'].style,
                theme.typography.headline1,
                {}
              ),
              dimensions.width
            )}
          >
            {'Log into\nyour account'}
          </Text>
          {/* Email */}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newEmailValue => {
              try {
                setLogin_email(newEmailValue);
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            {...GlobalStyles.TextInputStyles(theme)['Email'].props}
            editable={true}
            placeholder={'Email'}
            placeholderTextColor={theme.colors.text.light}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Email'].style,
                { fontFamily: 'Poppins_400Regular', fontSize: 15 }
              ),
              dimensions.width
            )}
          />
          {/* Password */}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newPasswordValue => {
              try {
                setLogin_password(newPasswordValue);
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            {...GlobalStyles.TextInputStyles(theme)['Email'].props}
            editable={true}
            placeholder={'Password'}
            placeholderTextColor={theme.colors.text.light}
            secureTextEntry={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Email'].style,
                {
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 15,
                  marginTop: 15,
                }
              ),
              dimensions.width
            )}
          />
          {/* Forgot Password */}
          <Touchable
            style={StyleSheet.applyWidth(
              { marginTop: 30, width: '45%' },
              dimensions.width
            )}
          />
          {/* Login */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              const handler = async () => {
                try {
                  await LogIn();
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(theme.typography.button, {
                backgroundColor: theme.colors.branding.primary,
                borderRadius: 12,
                color: palettes.App['Custom #ffffff'],
                height: 46,
                marginTop: 35,
              }),
              dimensions.width
            )}
            title={'Log in'}
          />
          {/* Or */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 35,
              },
              dimensions.width
            )}
          >
            <Divider
              color={theme.colors.branding.secondary}
              style={StyleSheet.applyWidth(
                { height: 1, width: '40%' },
                dimensions.width
              )}
            />
            {/* or */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(theme.typography.body2, {
                  color: theme.colors.text.strong,
                  fontSize: 17,
                }),
                dimensions.width
              )}
            >
              {'or'}
            </Text>
            <Divider
              color={theme.colors.branding.secondary}
              style={StyleSheet.applyWidth(
                { height: 1, width: '40%' },
                dimensions.width
              )}
            />
          </View>
          {/* Sign Up with Email */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate('Screen3SignUp');
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(theme.typography.button, {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderBottomWidth: 1,
                borderColor: palettes['1_Locals'].BrandGreen600,
                borderLeftWidth: 1,
                borderRadius: 12,
                borderRightWidth: 1,
                borderTopWidth: 1,
                color: theme.colors.text.strong,
                height: 46,
                marginTop: 35,
              }),
              dimensions.width
            )}
            title={'Sign up with email'}
          />
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Screen4LogIn);
