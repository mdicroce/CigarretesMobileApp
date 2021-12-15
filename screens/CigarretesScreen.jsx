import React from 'react';

import {
	StyleSheet, Text, View, Image, ScrollView, Alert,
} from 'react-native';
import {FAB, Button} from 'react-native-elements';
import {readCigarretes} from './Admin';
import {images} from '../Images';

async function setCuantity(listOfCigarretes, setListWithCantity) {
	await setListWithCantity(
		listOfCigarretes.map(actualCigarrete => ({...actualCigarrete, cuantity: 0})),
	);
}

export const CigarretesScreen = function (props) {
	const [listOfCigarretes, setListOfCigarretes] = React.useState([]);
	const [showListOfCigarretes, setShowListOfCigarretes] = React.useState([]);
	const [total, setTotal] = React.useState(0);
	const changeTotal = (cuantity, price) => {
		setTotal(prev => prev + (cuantity * price));
	};

	React.useEffect(() => {
		readCigarretes(setListOfCigarretes, listOfCigarretes);
	}, []);
	React.useEffect(() => {
		setShowListOfCigarretes(
			listOfCigarretes.map(actualCigarrete => (
				<CigarreteToShow
					key={actualCigarrete.name}
					photo={actualCigarrete.photo}
					name={actualCigarrete.name}
					changeTotal={changeTotal}
					price={actualCigarrete.price}
				/>
			)),
		);
	}, [listOfCigarretes]);
	return (
		<View style={styles.background}>
			<View>
				<ScrollView>{showListOfCigarretes}</ScrollView>
			</View>
			<View>
				<ShowTotal total={total} navigation={props.navigation} />
			</View>
		</View>

	);
};

const ShowTotal = function ({total, navigation}) {
	return (
		<View style={{flexDirection: 'row', justifyContent: 'center'}}>
			<FAB
				title="Ver Total"
				onPress={() => {
					Alert.alert('Total', `El total de cigarros es ${total}`);
				}}
				titleStyle={{textTransform: 'uppercase'}}
				buttonStyle={{backgroundColor: '#403366'}}
				containerStyle={{borderRadius: 0, width: 300}}
			/>
			<FAB
				title="Admin"
				titleStyle={{textTransform: 'uppercase'}}
				buttonStyle={{backgroundColor: '#c73737'}}
				containerStyle={{borderRadius: 0, width: 300}}
				onPress={() => {
					navigation.navigate('AdminScreen');
				}}
			/>
		</View>
	);
};

const CigarreteToShow = function (props) {
	const [cuantity, setCuantity] = React.useState(0);
	const onPressHandler = plus => {
		if ((cuantity + plus) <= 0) {
			props.changeTotal(-cuantity, props.price);
			setCuantity(0);
		} else {
			props.changeTotal(plus, props.price);
			setCuantity(cuantity + plus);
		}
	};

	return (
		<View style={styles.cigarreteShow}>
			<View>
				<Text style={styles.textTitle}>{props.name}</Text>
			</View>
			<View style={styles.flowRow}>
				<View>
					<Image style={styles.imageCigarrete} source={images.images[props.photo]} />
				</View>
				<View style={styles.buttonAndInfo}>
					<View style={{}}>
						<Text style={{color: '#e7c5ff', ...styles.textInfo}}>Cantidad: {cuantity}</Text>
						<Text style={{color: '#ff89d6', ...styles.textInfo}}>Precio: {props.price}</Text>
						<Text style={{color: '#ffa6a6', ...styles.textInfo}}>Total: {cuantity * props.price}</Text>
					</View>
					<View style={styles.cigarretesShowButtons}>
						<Button
							title="-10"
							onPress={() => {
								onPressHandler(-10);
							}}
							buttonStyle={{backgroundColor: '#5c4a7b'}}
							containerStyle={styles.buttonStyle}
						>
												-10
						</Button>
						<Button
							title="-5"
							onPress={() => {
								onPressHandler(-5);
							}}
							buttonStyle={{backgroundColor: '#4c3f91'}}
							containerStyle={styles.buttonStyle}
						>

						</Button>
						<Button
							title="-1"
							onPress={() => {
								onPressHandler(-1);
							}}
							buttonStyle={{backgroundColor: '#9145b6'}}
							containerStyle={styles.buttonStyle}
						>
						</Button>
						<Button
							title="+1"
							onPress={() => {
								onPressHandler(1);
							}}
							buttonStyle={{backgroundColor: '#af51a3'}}
							containerStyle={styles.buttonStyle}
						>

						</Button>
						<Button
							title="+5"
							onPress={() => {
								onPressHandler(5);
							}}
							buttonStyle={{backgroundColor: '#B958A5'}}
							containerStyle={styles.buttonStyle}
						>
						</Button>
						<Button
							title="+10"
							onPress={() => {
								onPressHandler(10);
							}}
							buttonStyle={{backgroundColor: '#FF5677'}}
							containerStyle={styles.buttonStyle}
						>
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
};

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
		justifyContent: 'space-evenly',
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
		backgroundColor: '#40273a',
		paddingBottom: 100,
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
	},
});
