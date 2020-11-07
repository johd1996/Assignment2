import {Alert} from "react-native";

export const showAlert = (props = {}, isCancel = true) => {
	const {
		title = 'title',
		message = 'message',
		okText = 'OK',
		cancelText = 'Cancel',
		okPressHandler = () => {},
		cancelPressHandler = () => {},
	} = props || {};
	const buttons = [];
	if (isCancel) {
		buttons.push({
			text: cancelText,
			onPress: cancelPressHandler,
			style: 'cancel',
		});
	}
	buttons.push({text: okText, onPress: okPressHandler});
	Alert.alert(title, message, buttons, {cancelable: false});
};
