
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export const IconButton = ({icon, size, color, onPress, children, style}) => (
	<Pressable
		android_ripple={{color: '#ccc'}}
		style={ ({pressed}) => [{backgroundColor: color, flex: 1}, style, styles.buttonContainer, pressed && styles.pressed]}
		onPress={onPress}
	>
		<View style={ styles.buttonContainer }>
			<Ionicons name={ icon } size={ size } color={ '#eee' } />
			<Text style={styles.text}>{ children }</Text>
		</View>
	</Pressable>
);

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 1,
		padding: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	pressed: {
		oppacity: 0.75,
	},
	text: {
		color: '#eee',
		fontWeight: 'bold',
	},
});
