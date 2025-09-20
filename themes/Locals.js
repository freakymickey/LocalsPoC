import { systemWeights } from 'react-native-typography';
import palettes from './palettes';
import { createTheme, DefaultTheme } from '@draftbit/ui';
export default createTheme({
  breakpoints: {},
  palettes,
  baseTheme: DefaultTheme,
  theme: {
    name: 'Locals',
    colors: {
      background: { base: palettes['1_Locals'].Canvas },
      border: { base: palettes['1_Locals'].BrandGreen100 },
      branding: {
        accent: palettes['1_Locals']['BrandGreen500 '],
        primary: palettes['1_Locals'].BrandGreen600,
        secondary: palettes['1_Locals'].Sand600,
        tertiary: palettes['1_Locals'].BrandGreen100,
      },
      text: {
        light: palettes['1_Locals'].BrandGreen100,
        medium: palettes['1_Locals'].BrandGreen600,
        normal: palettes['1_Locals']['BrandGreen500 '],
        strong: palettes['1_Locals'].BrandGreen700,
      },
    },
    typography: {
      body1: {
        ...(({ backgroundColor, ...o }) => o)(systemWeights.regular ?? {}),
        fontWeight: '400',
        fontSize: 15,
        fontFamily: 'Inter_400Regular',
      },
      body2: {
        ...(({ backgroundColor, ...o }) => o)(systemWeights.regular ?? {}),
        fontWeight: '400',
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
      },
      button: {
        ...(({ backgroundColor, ...o }) => o)(systemWeights.regular ?? {}),
        fontWeight: '400',
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
      },
      caption: {
        ...(({ backgroundColor, ...o }) => o)(systemWeights.regular ?? {}),
        fontWeight: '400',
        fontSize: 13,
        fontFamily: 'Inter_400Regular',
      },
      headline1: {
        ...(({ backgroundColor, ...o }) => o)(systemWeights.semibold ?? {}),
        fontWeight: '600',
        fontSize: 25,
        fontFamily: 'Poppins_600SemiBold',
      },
      headline2: {
        ...(({ backgroundColor, ...o }) => o)(systemWeights.semibold ?? {}),
        fontWeight: '600',
        fontSize: 20,
        fontFamily: 'Inter_600SemiBold',
      },
      headline3: {
        ...(({ backgroundColor, ...o }) => o)(systemWeights.semibold ?? {}),
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
      },
    },
  },
});
