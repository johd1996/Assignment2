import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import AddContact from "../screens/AddContact";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contacts" component={HomeScreen} />
      <Stack.Screen name="AddContact" component={AddContact} />
    </Stack.Navigator>
  );
}
