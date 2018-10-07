import Index from "./src/index.js";
export var serverURL = "http://35.184.73.14"; // URL must NOT have a slash at the end
export default Index;

/* APP PROPERTIES */
import {TextInput} from "react-native"
TextInput.defaultProps.selectionColor = "#2980CD" // all TextInputs will have a blue cursor
TextInput.defaultProps.underlineColorAndroid = "#F0F0F0"; // all TextInputs will have a gray underline
console.disableYellowBox = true; // disable yellow Expo warning boxes
