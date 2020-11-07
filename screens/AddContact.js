import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {auth, database, timestamp} from '../components/Firebase/firebase';
import {AuthUserContext} from "../navigation/AuthUserProvider";
import Form from "../components/Forms/Form";
import FormField from "../components/Forms/FormField";
import FormButton from "../components/Forms/FormButton";
import SafeView from "../components/SafeView";
import * as Yup from "yup";
import {printLogs} from "../config/ReactotronConfig";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {showAlert} from "../utils/uiutilities";
import {useNavigation} from "@react-navigation/native";

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Please enter a Contact Name').label('Contact Name'),
	number: Yup.string().required('Please enter a Contact Number').label('Contact Number'),
	address: Yup.string().required('Please enter a Contact Address').label('Contact Address'),
	note: Yup.string().required('Please enter a Contact Note').label('Contact Note'),
});


export default function AddContact() {
	const {user, setUser} = useContext(AuthUserContext);
	const navigation = useNavigation();
	
	useEffect(() => {
	}, [])
	
	async function addNoteHandler(values) {
		const {name, number, address, note,} = values;
		const userId = auth.currentUser.uid;
		const contactsRef = database.ref('contacts/' + userId);
		contactsRef.push({name, number, address, note,createdAt: timestamp})
		showAlert({
			title: 'Added Successfully',
			message:'Note added successfully',
			okPressHandler:()=>navigation.goBack()
		},false)
		
		try {
		} catch (error) {
		}
	}
	
	
	return (
		<KeyboardAwareScrollView style={ styles.container }>
			<Form
				initialValues={ {
					name: '',
					number: '',
					address: '',
					note: '',
				} }
				validationSchema={ validationSchema }
				onSubmit={ values => addNoteHandler(values) }>
				<FormField name="name" placeholder="Enter Name" autoCapitalize="none" autoFocus={ true }/>
				<FormField name="number" placeholder="Enter Number" autoCapitalize="none"/>
				<FormField name="address" placeholder="Enter Address" autoCapitalize="none"/>
				<FormField name="note" placeholder="Enter Note" autoCapitalize="none"/>
				<FormButton title={ 'Add Note' }/>
			</Form>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15
	}
});
