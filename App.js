import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {AdminScreen} from './screens/Admin';
import {CigarretesScreen} from './screens/CigarretesScreen';

const Stack = createStackNavigator();

const MyStack = () => (
	<Stack.Navigator>
		<Stack.Screen name="CigarretesScreen" component={CigarretesScreen} />
		<Stack.Screen name="AdminScreen" component={AdminScreen} />
	</Stack.Navigator>
);

export default function App() {
	return (
		<NavigationContainer >
			<MyStack />
		</NavigationContainer>
	);
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
