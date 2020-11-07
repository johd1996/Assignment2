import React, {useEffect, useState} from 'react';
import {Image, Text, Button, FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {auth, database, logout} from '../components/Firebase/firebase';
import AppButton from "../components/AppButton";
import {printLogs} from "../config/ReactotronConfig";
import colors from "../utils/colors";
import {TouchableOpacity} from "react-native";
import {showAlert} from "../utils/uiutilities";
import {ActivityIndicator} from "react-native";


const ContactItem = ({item}) => {
	const {id, name, number, address, note,} = item || {}
	const onDeleteHandler = () => {
		showAlert({
			title: 'Delete',
			message: 'Are you sure you want to delete?',
			okPressHandler: () => {
				const userId = auth.currentUser.uid;
				const contactsRef = database.ref('contacts/' + userId + '/' + id);
				contactsRef.remove()
			}
		},)
	}
	
	return <View style={ styles.itemContainer }>
		<TouchableOpacity style={ styles.deleteButton } onPress={ onDeleteHandler }>
			<Image source={ require('../assets/cross.png') } style={ {width: 20, height: 20} }/>
		</TouchableOpacity>
		<Text style={ styles.textStyle }>{ name }</Text>
		<Text style={ styles.textStyle }>{ number }</Text>
		<Text style={ styles.textStyle }>{ address }</Text>
		<Text style={ styles.textStyle }>{ note }</Text>
	</View>
}
export default function HomeScreen() {
	const navigation = useNavigation();
	const [ dataList, setDataList ] = useState([])
	const [ isLoading, setLoading ] = useState(true)
	
	async function handleSignOut() {
		try {
			
			showAlert({
				title: 'Logout',
				message: 'Are you sure you want to Logout?',
				okPressHandler: async () => {
					await logout();
				}
			},)
		} catch (error) {
			console.log(error);
		}
	}
	
	
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <TouchableOpacity onPress={ handleSignOut } style={ styles.headerRight }>
				<Text>Logout</Text>
			</TouchableOpacity>,
		});
	}, [ navigation ]);
	
	useEffect(() => {
		const userId = auth.currentUser.uid;
		const contactsRef = database.ref('contacts/' + userId);
		contactsRef.on('value', function (snapshot) {
			const updatedDataList = []
			snapshot.forEach((item) => {
				updatedDataList.push({id: item.key, ...item.val()})
			})
			setLoading(false)
			try {
				const sortedList=updatedDataList.sort((b,a)=>(a.createdAt-b.createdAt))
				setDataList(sortedList)
			} catch (e) {
				setDataList(updatedDataList)
			} finally {
			}
		});
		// return contactsRef?.off()
	}, [])
	
	const navigateToCreatNote = () => {
		navigation.push('AddContact')
	}
	
	const renderListEmptyComponent = () => {
		return <View style={ styles.listEmptyComponent }>
			{isLoading?<ActivityIndicator size={'large'} color={colors.primary}/>:<Text>No item is found</Text>}
		</View>
	}
	
	
	return (
		<View style={ styles.container }>
			<FlatList
				data={ dataList }
				contentContainerStyle={ styles.listContainer }
				showsVerticalScrollIndicator={ false }
				renderItem={ (props) => <ContactItem { ...props }/> }
				keyExtractor={ (item) => String(item.id) }
				ListEmptyComponent={ renderListEmptyComponent }/>
			<AppButton title="Add Note" onPress={ navigateToCreatNote }/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 12,
	},
	listContainer: {
		paddingTop: 10
	},
	itemContainer: {
		marginBottom: 10,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: colors.primary,
	},
	textStyle: {
		fontSize: 17,
		color: 'white'
	},
	deleteButton: {
		alignSelf: 'flex-end',
	},
	headerRight: {
		paddingRight: 10,
		fontSize: 15
	},
	listEmptyComponent: {
		alignItems: 'center'
	}
});
