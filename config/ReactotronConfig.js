import Reactotron from "reactotron-react-native"

Reactotron
	.configure() // controls connection & communication settings
	.useReactNative() // add all built-in react native plugins
	.connect() // let's connect!

Reactotron.clear();

if (__DEV__) {
	console.tron = Reactotron;
}


export const printLogs = (log) => {
	if (__DEV__) {
		console.tron.warn(log);
	}
};
