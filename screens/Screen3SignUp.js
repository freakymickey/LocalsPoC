import React from 'react';
import {
  Button,
  Divider,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
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

const Screen3SignUp = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [signup_email, setSignup_email] = React.useState('');
  const [signup_password, setSignup_password] = React.useState('');
  const SignUp = async () => {
    const supabase = Supabase.getSupabase();

    const { data, error } = await supabase.auth.signUp({
      email: signup_email,
      password: signup_password,
    });

    if (error) {
      console.log('Error SignUp', error);
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
        GlobalStyles.ScreenContainerStyles(theme)['Formula'].style,
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
            {'Create\nan account'}
          </Text>
          {/* Email */}
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={true}
            changeTextDelay={500}
            onChangeText={newEmailValue => {
              try {
                setSignup_email(newEmailValue);
              } catch (err) {
                console.error(err);
              }
            }}
            webShowOutline={true}
            {...GlobalStyles.TextInputStyles(theme)['Email'].props}
            editable={true}
            placeholder={'Email'}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextInputStyles(theme)['Email'].style,
                theme.typography.body1,
                {}
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
                setSignup_password(newPasswordValue);
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
          {/* Sign up */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              const handler = async () => {
                try {
                  await SignUp();
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(theme.typography.body1, {
                borderRadius: 12,
                fontFamily: null,
                fontSize: 17,
                height: 46,
                marginTop: 35,
              }),
              dimensions.width
            )}
            title={'Sign up'}
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
                navigation.navigate('Screen4LogIn');
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
            title={'Log in'}
          />
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Screen3SignUp);
