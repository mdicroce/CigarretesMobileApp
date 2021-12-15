import React from 'react';
import PropTypes from 'prop-types';
import {
	StyleSheet, Text, View, Image, ScrollView,
} from 'react-native';
import {FAB, Icon, Input} from 'react-native-elements';
import {
	readAsStringAsync,
	writeAsStringAsync,
	documentDirectory,
	makeDirectoryAsync,
	getInfoAsync,
	StorageAccessFramework,
} from 'expo-file-system';
import data from '../json/cigarretes.json';
import {images} from '../Images';

export const readCigarretes = async (setStore, store) => {
	const folder = `${documentDirectory}cigarretes/`;
	const dirInfo = await getInfoAsync(folder);

	if (dirInfo.exists) {
		const fileInfo = await getInfoAsync(`${folder}cigarretes.json`);
		if (fileInfo.exists && fileInfo.size !== 0) {
			const list = await readAsStringAsync(`${folder}/cigarretes.json`);
			await setStore([...JSON.parse(list)]);
		} else {
			await writeAsStringAsync(
				`${folder}cigarretes.json`,
				JSON.stringify(data),
			);
			await setStore([...data]);
		}
	} else {
		await makeDirectoryAsync(folder, {intermediates: true});
	}
};

export const AdminScreen = (props) => {
	const [cigarretesList, setCigarretesList] = React.useState([]);
	const [cigarretesToShow, setCigarretesToShow] = React.useState([]);
	const onChangeHandler = (index, price) => {
		const newCigarreteList = cigarretesList;
		newCigarreteList[index].price = price;
		setCigarretesList(newCigarreteList);
		console.log(cigarretesList[index]);
	};

	React.useEffect(() => {
		readCigarretes(setCigarretesList, cigarretesList);
	}, []);
	React.useEffect(() => {
		setCigarretesToShow(
			cigarretesList.map((actualCigarrete, index) => (
				<CigarreteChart
					key={actualCigarrete.name}
					photo={actualCigarrete.photo}
					name={actualCigarrete.name}
					price={actualCigarrete.price}
					index={index}
					onChangeHandler={onChangeHandler}
				/>
			)),
		);
	}, [cigarretesList]);
	const submitHandler = async () => {
		const folder = `${documentDirectory}cigarretes/`;
		const dirInfo = await getInfoAsync(folder);
		if (dirInfo.exists) {
			await writeAsStringAsync(
				`${folder}cigarretes.json`,
				JSON.stringify(cigarretesList),
			);
			props.navigation.navigate('CigarretesScreen');
		} else {
			await makeDirectoryAsync(folder, {intermediates: true});
		}
	};

	return (
		<View style={styles.background}>
			<FAB icon={<Icon type="antdesign" name="check" color="white" />}
				buttonStyle={{backgroundColor: '#c73737', width: 400}}
				containerStyle={{borderRadius: 0, width: 400}}
				onPress={submitHandler}
			/>
			<ScrollView>{cigarretesToShow}</ScrollView>
		</View>
	);
};

// eslint-disable-next-line react/prop-types
const CigarreteChart = function ({photo, name, onChangeHandler, price, index}) {
	const [value, setValue] = React.useState(String(price));
	return (
		<View style={styles.cigarreteShow}>
			<Image source={images.images[photo]} style={styles.imageCigarrete} />
			<View style={styles.rowView}>
				<Text style={styles.textTitle}>{name}</Text>
				<Input
					onSubmitEditing={() => {
						onChangeHandler(index, value);
					}}
					value={value}
					onChangeText={e => {
						setValue(e);
					}}
					keyboardType="decimal-pad"
					placeholderTextColor="white"
					inputStyle={{color: 'white', fontSize: 16}}
					inputContainerStyle={{borderBottomColor: 'white', width: 300}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: '#40273a',
	},
	cigarreteShow: {
		backgroundColor: '#847c85',
		borderRadius: 5,
		padding: 5,
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		alignContent: 'space-between',
	},
	imageCigarrete: {
		overflow: 'hidden',
		height: 100,
		width: 60,
		resizeMode: 'cover',
	},
	textTitle: {
		fontSize: 18,
		textTransform: 'uppercase',
		color: 'white',
		marginLeft: 5,
	},
	textInfo: {
		fontSize: 16,
		textTransform: 'uppercase',
	},
	rowView: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		paddingTop: 20,
	},
});
