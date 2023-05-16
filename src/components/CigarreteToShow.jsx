/* eslint-disable react/prop-types */
import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {IconButton} from './UI/IconButon';
import {CigarreteImage} from './CigarreteImage';

export function CigarreteToShow({changeTotal, price, name, image}) {
	const [cuantity, setCuantity] = React.useState(0);
	const onPressHandler = plus => {
		if (cuantity + plus <= 0) {
			changeTotal(-cuantity, price);
			setCuantity(0);
		} else {
			changeTotal(plus, price);
			setCuantity(cuantity + plus);
		}
	};

	return (
		<View style={styles.cigarreteShow}>
			<View>
				<Text style={styles.textTitle}>{name}</Text>
			</View>
			<View style={ styles.flowRow }>
				<CigarreteImage image={ image } style={styles.imageCigarrete}/>
				<View style={styles.buttonAndInfo}>
					<View style={{}}>
						<Text style={{color: '#e7c5ff', ...styles.textInfo}}>
              Cantidad: {cuantity}
						</Text>
						<Text style={{color: '#ff89d6', ...styles.textInfo}}>
              Precio: {price}
						</Text>
						<Text style={{color: '#ffa6a6', ...styles.textInfo}}>
              Total: {cuantity * price}
						</Text>
					</View>
					<View style={styles.cigarretesShowButtons}>
						<IconButton
							icon="remove"
							size={16}
							onPress={() => {
								onPressHandler(-10);
							} }
							color="#5c4a7b"
							style={styles.priceButton}
						>
              10
						</IconButton>
						<IconButton
							icon="remove"
							onPress={() => {
								onPressHandler(-5);
							} }
							color="#4c3f91"
							size={ 16 }
							style={styles.priceButton}
						>
              5
						</IconButton>
						<IconButton
							icon="remove"
							onPress={() => {
								onPressHandler(-1);
							}}
							color= "#9145b6"
							size={ 16 }
							style={styles.priceButton}
						>
              1
						</IconButton>
						<IconButton
							icon="add"
							onPress={() => {
								onPressHandler(1);
							}}
							color= "#af51a3"
							size={ 16 }
							style={styles.priceButton}
						>1</IconButton>
						<IconButton
							icon="add"
							onPress={() => {
								onPressHandler(5);
							}}
							color= "#B958A5"
							size={ 16 }
							style={styles.priceButton}
						>5</IconButton>
						<IconButton
							icon="add"
							onPress={() => {
								onPressHandler(10);
							}}
							color= "#FF5677"
							size={ 16 }
							style={styles.priceButton}
						>10</IconButton>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	cigarreteShow: {
		backgroundColor: '#847c85',
		borderRadius: 5,
		padding: 10,
		display: 'flex',
		marginBottom: 10,
		justifyContent: 'flex-start',
	},
	imageCigarrete: {
		overflow: 'hidden',
		height: 100,
		width: 60,
		resizeMode: 'cover',
	},
	cigarretesShowButtons: {
		padding: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textTitle: {
		fontSize: 20,
		textTransform: 'uppercase',
		color: 'white',
	},
	textInfo: {
		fontSize: 16,
		textTransform: 'uppercase',
	},
	background: {

	},
	buttonStyle: {
		width: 45,
		marginRight: 5,
	},
	flowRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',

	},
	buttonAndInfo: {
		justifyContent: 'flex-end',
		flex: 1,
		marginLeft: 20,
	},
	priceButton: {
		marginLeft: 5,
	},

});
