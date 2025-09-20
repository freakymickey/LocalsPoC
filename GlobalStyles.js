import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

import palettes from './themes/palettes';

export const TextStyles = theme =>
  StyleSheet.create({
    'Feed text 1': {
      style: {
        color: palettes['1_Locals'].BrandGreen700,
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
      },
      props: {},
    },
    Heading: {
      style: { color: theme.colors.text.strong, marginBottom: 10 },
      props: {},
    },
    Text: { style: { color: theme.colors.text.strong }, props: {} },
  });

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({ 'Image Background': { style: { flex: 1 }, props: {} } });

export const PickerStyles = theme =>
  StyleSheet.create({ Picker: { style: {}, props: {} } });

export const ExpoImageStyles = theme =>
  StyleSheet.create({
    Image: { style: { height: 100, width: 100 }, props: {} },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    Email: {
      style: {
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
      },
      props: { placeholderTextColor: theme.colors.text.light },
    },
    'Text Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.base,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const DividerStyles = theme =>
  StyleSheet.create({ Divider: { style: { height: 1 }, props: {} } });

export const CircleStyles = theme =>
  StyleSheet.create({
    Circle: {
      style: {
        alignItems: 'center',
        backgroundColor: theme.colors.branding.primary,
        justifyContent: 'center',
      },
      props: {},
    },
  });

export const ScreenContainerStyles = theme =>
  StyleSheet.create({
    Formula: {
      style: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: palettes['1_Locals'].Canvas,
        gap: 24,
        justifyContent: 'flex-start',
        padding: 16,
      },
      props: {},
    },
    'Locals-UI': {
      style: {
        alignItems: 'center',
        gap: 5,
        justifyContent: 'flex-start',
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 24,
      },
      props: {},
    },
  });

export const SimpleStyleKeyboardAwareScrollViewStyles = theme =>
  StyleSheet.create({
    'Formula 2': {
      style: {
        alignContent: 'center',
        alignSelf: 'stretch',
        maxWidth: 360,
        width: '100%',
      },
      props: {},
    },
  });
