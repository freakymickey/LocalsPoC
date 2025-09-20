import React from 'react';
import { Icon, Touchable, useTheme } from '@draftbit/ui';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DefaultTheme,
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { systemWeights } from 'react-native-typography';
import LinkingConfiguration from './LinkingConfiguration';
import Screen1SplashScreen from './screens/Screen1SplashScreen';
import Screen2SetUpUser from './screens/Screen2SetUpUser';
import Screen31PersonalizeProfile from './screens/Screen31PersonalizeProfile';
import Screen3SignUp from './screens/Screen3SignUp';
import Screen4LogIn from './screens/Screen4LogIn';
import Screen5Profile from './screens/Screen5Profile';
import Screen6Feed from './screens/Screen6Feed';
import Screen7Console from './screens/Screen7Console';
import palettes from './themes/palettes';
import Breakpoints from './utils/Breakpoints';
import useNavigation from './utils/useNavigation';
import useWindowDimensions from './utils/useWindowDimensions';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DefaultAndroidBackIcon({ tintColor }) {
  return (
    <View style={[styles.headerContainer, styles.headerContainerLeft]}>
      <Icon
        name="AntDesign/arrowleft"
        size={24}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </View>
  );
}

function DefaultDrawerIcon({ tintColor }) {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => navigation.toggleDrawer()}
      style={[styles.headerContainer, styles.headerContainerLeft]}
    >
      <Icon
        name="EvilIcons/navicon"
        size={27}
        color={tintColor}
        style={[styles.headerIcon, styles.headerIconLeft]}
      />
    </Touchable>
  );
}

function BottomTabNavigator() {
  const theme = useTheme();

  const tabBarOrDrawerIcons = {
    Screen5Profile: 'FontAwesome/home',
    Screen6Feed: 'MaterialIcons/feed',
    Screen7Console: 'FontAwesome/code',
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.background.base,
          borderBottomColor: 'transparent',
        },
        headerTintColor: theme.colors.text.strong,
        headerTitleStyle: theme.typography.headline5,
        tabBarActiveTintColor: theme.colors.branding.primary,
        tabBarInactiveTintColor: theme.colors.text.light,
        tabBarLabelStyle: theme.typography.caption,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.base,
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen
        name="Screen5Profile"
        component={Screen5Profile}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="FontAwesome/home"
              size={25}
              color={
                focused
                  ? theme.colors.branding.primary
                  : theme.colors.text.light
              }
            />
          ),
          tabBarLabel: 'Profile',
          title: '5_Profile',
        }}
      />
      <Tab.Screen
        name="Screen6Feed"
        component={Screen6Feed}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="MaterialIcons/feed"
              size={25}
              color={
                focused
                  ? theme.colors.branding.primary
                  : theme.colors.text.light
              }
            />
          ),
          tabBarLabel: 'Feed',
          title: '6_Feed',
        }}
      />
      <Tab.Screen
        name="Screen7Console"
        component={Screen7Console}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="FontAwesome/code"
              size={25}
              color={
                focused
                  ? theme.colors.branding.primary
                  : theme.colors.text.light
              }
            />
          ),
          title: '7_Console',
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootAppNavigator() {
  const theme = useTheme();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.background.base,
        },
      }}
      linking={LinkingConfiguration}
      navigationInChildEnabled={true}
    >
      <Stack.Navigator
        screenOptions={{
          cardStyle: { flex: 1 },
          headerBackImage:
            Platform.OS === 'android' ? DefaultAndroidBackIcon : null,
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.background.base,
            borderBottomColor: 'transparent',
          },
          headerTintColor: theme.colors.text.strong,
          headerTitleStyle: theme.typography.headline5,
        }}
      >
        <Stack.Screen
          name="Screen1SplashScreen"
          component={Screen1SplashScreen}
          options={{
            title: '1_SplashScreen',
          }}
        />
        <Stack.Screen
          name="Screen2SetUpUser"
          component={Screen2SetUpUser}
          options={{
            title: '2_SetUpUser',
          }}
        />
        <Stack.Screen
          name="Screen31PersonalizeProfile"
          component={Screen31PersonalizeProfile}
          options={{
            title: '3_1_PersonalizeProfile',
          }}
        />
        <Stack.Screen
          name="Screen3SignUp"
          component={Screen3SignUp}
          options={{
            title: '3_SignUp',
          }}
        />
        <Stack.Screen
          name="Screen4LogIn"
          component={Screen4LogIn}
          options={{
            title: '4_LogIn',
          }}
        />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{
            title: 'Bottom Tab Navigator',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  headerContainerLeft: Platform.select({ ios: { marginLeft: 8 } }),
  headerIcon: Platform.select({
    ios: {
      marginVertical: 12,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      margin: 3,
      resizeMode: 'contain',
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  headerIconLeft: Platform.select({ ios: { marginRight: 6 } }),
});
