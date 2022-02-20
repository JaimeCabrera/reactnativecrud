import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {HomeScreen} from './src/screens/HomeScreen';
import {NewClientScreen} from './src/screens/NewClientScreen';
import {ClientDetailsScreen} from './src/screens/ClientDetailsScreen';
// import {TopBar} from './src/components/ui/TopBar';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498DB',
    accent: '#A569BD',
  },
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTitleAlign: 'center',
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontSize: 20,
            },
          }}>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={() => ({
              // headerLeft: props => (
              //   <TopBar {...props} navigation={navigation} route={route} />
              // ),
              title: 'Inicio',
            })}
          />
          <Stack.Screen
            name="client-add"
            component={NewClientScreen}
            options={{title: 'Add New Client'}}
          />
          <Stack.Screen
            name="client-details"
            component={ClientDetailsScreen}
            options={{title: 'Client Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
