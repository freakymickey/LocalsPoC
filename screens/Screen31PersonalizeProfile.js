import React from 'react';
import {
  Button,
  ExpoImage,
  Picker,
  ScreenContainer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as Supabase from '../custom-files/Supabase';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Screen31PersonalizeProfile = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [areas_list, setAreas_list] = React.useState([
    { label: 'Powiśle', value: 'powisle' },
    { label: 'Czuby', value: 'czuby' },
  ]);
  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [is_disabled, setIs_disabled] = React.useState(false);
  const [pickerValue, setPickerValue] = React.useState('');
  const [signup_email, setSignup_email] = React.useState('');
  const [signup_password, setSignup_password] = React.useState('');
  const GetAreasList = async () => {
    const supabase = Supabase.getSupabase();

    const { data, error } = await supabase.rpc('get_areas_list');

    if (error) {
      console.error('Error fetching areas list:', error);
      return;
    }

    setAreas_list(data);

    console.log('Areas list:', data);
  };

  const UpdateArea = async () => {
    const supabase = Supabase.getSupabase();

    const area = (
      (typeof pickerValue === 'object' ? pickerValue?.value : pickerValue) ?? ''
    )
      .toString()
      .trim();

    const { error } = await supabase.rpc('update_area', { p_area: area });
    if (error) return console.log('update_area error:', error), null;

    console.log('Area updated:', area);

    return true;
  };

  const UpdateName = async Variables => {
    const supabase = Supabase.getSupabase();

    const { error } = await supabase.rpc('update_name', {
      p_name: Variables.ProfileName,
    });
    if (error) return console.log('update_name error:', error), null;

    console.log('Name updated:', Variables.ProfileName);

    return true;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await GetAreasList();
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      {...GlobalStyles.ScreenContainerStyles(theme)['Locals-UI'].props}
      hasSafeArea={true}
      hasTopSafeArea={false}
      scrollable={true}
      style={StyleSheet.applyWidth(
        StyleSheet.compose(
          GlobalStyles.ScreenContainerStyles(theme)['Locals-UI'].style,
          { backgroundColor: theme.colors.background.base, gap: 24 }
        ),
        dimensions.width
      )}
    >
      {/* Name */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'center',
            alignSelf: 'center',
            marginBottom: 10,
            paddingBottom: 16,
            paddingTop: 8,
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Heading */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(theme.typography.headline1, {
              color: theme.colors.text.strong,
              marginBottom: 10,
              textAlign: 'center',
            }),
            dimensions.width
          )}
        >
          {'What is your name?'}
        </Text>
        {/* Name */}
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={true}
          changeTextDelay={500}
          onChangeText={newNameValue => {
            try {
              setGlobalVariableValue({
                key: 'ProfileName',
                value: newNameValue,
              });
            } catch (err) {
              console.error(err);
            }
          }}
          webShowOutline={true}
          editable={true}
          placeholder={'Name'}
          placeholderTextColor={theme.colors.text.light}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(theme.typography.body1, {
              alignSelf: 'center',
              backgroundColor: palettes.App['Custom #ffffff'],
              borderBottomWidth: 1,
              borderColor: palettes['1_Locals'].BrandGreen100,
              borderLeftWidth: 1,
              borderRadius: 12,
              borderRightWidth: 1,
              borderTopWidth: 1,
              color: theme.colors.text.strong,
              height: 48,
              marginTop: 10,
              paddingBottom: 8,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 8,
              width: '65%',
            }),
            dimensions.width
          )}
        />
      </View>
      {/* Picker */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingBottom: 8,
            paddingTop: 8,
            width: '100%',
          },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(theme.typography.headline1, {
              alignSelf: 'center',
              color: theme.colors.text.strong,
              marginBottom: 15,
              textAlign: 'center',
            }),
            dimensions.width
          )}
        >
          {'What is your location?'}
        </Text>
        {/* Pin */}
        <ExpoImage
          allowDownscaling={true}
          cachePolicy={'disk'}
          contentPosition={'center'}
          resizeMode={'cover'}
          transitionDuration={300}
          transitionEffect={'cross-dissolve'}
          transitionTiming={'ease-in-out'}
          source={imageSource(Images['Pin'])}
          style={StyleSheet.applyWidth(
            { height: 60, marginBottom: 8, width: 60 },
            dimensions.width
          )}
        />
        <Picker
          autoDismissKeyboard={true}
          dropDownBorderRadius={8}
          dropDownBorderWidth={1}
          dropDownTextColor={theme.colors.text.strong}
          leftIconMode={'inset'}
          mode={'native'}
          onValueChange={newPickerValue => {
            try {
              setPickerValue(newPickerValue);
              if (newPickerValue) {
                setIs_disabled(false);
              } else {
                setIs_disabled(true);
              }
            } catch (err) {
              console.error(err);
            }
          }}
          placeholder={'Select an option'}
          selectedIconColor={theme.colors.text.strong}
          selectedIconName={'Feather/check'}
          selectedIconSize={20}
          type={'solid'}
          {...GlobalStyles.PickerStyles(theme)['Picker'].props}
          dropDownBackgroundColor={palettes.App['Custom #ffffff']}
          dropDownBorderColor={palettes['1_Locals'].BrandGreen100}
          dropdownOverlayColor={palettes['1_Locals'].Canvas}
          iconColor={palettes['1_Locals'].BrandGreen600}
          iconSize={20}
          options={areas_list}
          placeholderTextColor={palettes['1_Locals'].BrandGreen100}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.PickerStyles(theme)['Picker'].style,
              theme.typography.body1,
              {
                backgroundColor: palettes.App['Custom #ffffff'],
                borderColor: palettes['1_Locals'].BrandGreen100,
                color: theme.colors.text.strong,
                height: 48,
                marginTop: 4,
                textAlign: 'left',
              }
            ),
            dimensions.width
          )}
          value={pickerValue}
        />
      </View>
      {/* Clicks */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, width: '100%' },
          dimensions.width
        )}
      >
        {/* Ready */}
        <Button
          accessible={true}
          iconPosition={'left'}
          onPress={() => {
            const handler = async () => {
              try {
                await UpdateName(Variables);
                await UpdateArea();
                navigation.navigate('BottomTabNavigator', {
                  screen: 'Screen5Profile',
                });
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          disabled={Boolean(is_disabled)}
          disabledOpacity={0.3}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(theme.typography.button, {
              borderRadius: 12,
              color: palettes.App['Custom #ffffff'],
              fontSize: 17,
              height: 52,
              marginBottom: 8,
              marginLeft: 12,
              marginRight: 12,
              marginTop: 12,
            }),
            dimensions.width
          )}
          title={'I am ready!'}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Screen31PersonalizeProfile);
