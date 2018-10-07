import React from "react";
import {serverURL} from "../../App";
import {StyleSheet, Alert, Text, TextInput, View, TouchableOpacity, Image} from "react-native";
import {ImagePicker, Location, Permissions} from "expo";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: undefined,
      fullName: undefined,
      city: undefined,
      phoneNumber: undefined,
      problemTitle: undefined,
      briefExplanation: undefined,
      otherInformation: undefined,
      pictures: {
        picture1: undefined,
        picture2: undefined,
        picture3: undefined
      },
      picturesUploadText: {
        picture1UploadText: "No picture 1 uploaded...",
        picture2UploadText: "No picture 2 uploaded...",
        picture3UploadText: "No picture 3 uploaded..."
      }
    }
  }
  // stack navigator"s page settings
  static navigationOptions = {
  	header: null,
    title: "Report"
  }
  componentDidMount() {
    this.getLocation();
  }
  // get the location of the user submitting the form
  async getLocation() {
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      Location.getCurrentPositionAsync({enableHighAccuracy: true}).then((position) => {
        this.setState({location: {longitude: position.coords.longitude, latitude: position.coords.latitude}});
        return; // cancel the location promise
      }).catch((error) => {
        alert(error + ": " + "Please make sure your location (GPS) is turned on.");
      });
    }
  }
  // open the camera page and handle the picture taken
  async openImagePicker(pictureOption) {
    //ask for camera permissions from the user
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // open the camera
    let imageResult = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.2,
      allowsEditing: true,
      aspect: [4, 3]
    });

    // set the image and upload text to the specified option
    if(imageResult.uri !== undefined) {
      if(pictureOption === "picture1") {
        // picture upload state
        let pictureData = {...this.state.pictures};
        pictureData.picture1 = `${imageResult.base64}`;
        this.setState({pictures: pictureData});
        // picture upload text state
        let picturesUploadText = {...this.state.picturesUploadText};
        picturesUploadText.picture1UploadText = "Uploaded!";
        this.setState({picturesUploadText: picturesUploadText});
      } else if(pictureOption === "picture2") {
        // picture upload state
        let pictureData = {...this.state.pictures};
        pictureData.picture2 = `${imageResult.base64}`;
        this.setState({pictures: pictureData});
        // picture upload text state
        let picturesUploadText = {...this.state.picturesUploadText};
        picturesUploadText.picture2UploadText = "Uploaded!";
        this.setState({picturesUploadText: picturesUploadText});
      } else if(pictureOption === "picture3") {
        // picture upload state
        let pictureData = {...this.state.pictures};
        pictureData.picture3 = `${imageResult.base64}`;
        this.setState({pictures: pictureData});
        // picture upload text state
        let picturesUploadText = {...this.state.picturesUploadText};
        picturesUploadText.picture3UploadText = "Uploaded!";
        this.setState({picturesUploadText: picturesUploadText});
      }
    }

    // the user cancelled taking a camera picture
    if (imageResult.cancelled) {
      return;
    }
  }
  async submitForm() {
    // check if any of mandatory form data is blank
    if(this.state.fullName && this.state.city && this.state.phoneNumber &&
       this.state.problemTitle && this.state.briefExplanation && this.state.location) {
      // create the form data
      let formData = new FormData();
      formData.append("location", JSON.stringify(this.state.location))
      formData.append("fullName", this.state.fullName);
      formData.append("city", this.state.city);
      formData.append("phoneNumber", this.state.phoneNumber);
      formData.append("problemTitle", this.state.problemTitle);
      formData.append("briefExplanation", this.state.briefExplanation);
      formData.append("otherInformation", this.state.otherInformation);
      formData.append("pictureData", JSON.stringify(this.state.pictures));

      // send an HTTP Request to the server to handle the form data
      return await fetch(serverURL + "/mobile/uploadReport.php", {
        method: "POST",
        body: formData,
        header: {
          "content-type": "multipart/form-data",
        },
      }).then((resolved) => {
        // navigate to the Problems page
        var {navigate} = this.props.navigation;
        navigate("Problems");
      }).catch((error) => {
        Alert.alert("Oh no!", error.message);
        return;
      });
    } else {
      Alert.alert("Oh no!", "Some information is missing or you disabled location...");
      return;
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Full Name *"
          style={styles.reportTextInput}
          maxLength={40}
          onChangeText={(text) => this.setState({fullName: text})}
        >
        </TextInput>
        <TextInput
          placeholder="City *"
          style={styles.reportTextInput}
          maxLength={45}
          onChangeText={(text) => this.setState({city: text})}
        >
        </TextInput>
        <TextInput
          placeholder="Phone Number *"
          style={styles.reportTextInput}
          maxLength={16}
          onChangeText={(text) => this.setState({phoneNumber: text})}
        >
        </TextInput>
        <TextInput
          placeholder="Title of Problem *"
          style={styles.reportTextInput}
          maxLength={40}
          onChangeText={(text) => this.setState({problemTitle: text})}
        >
        </TextInput>
        <TextInput
          placeholder="Brief Explanation *"
          multiline={true}
          maxLength={120}
          style={styles.reportTextAreaInput}
          onChangeText={(text) => this.setState({briefExplanation: text})}
        >
        </TextInput>
        <TextInput
          placeholder="Other Information"
          maxLength={50}
          style={styles.reportTextInput}
          onChangeText={(text) => this.setState({otherInformation: text})}
        >
        </TextInput>

        <View style={styles.pictureUploadContainer}>
          <TouchableOpacity
            style={styles.uploadPictureButton}
            activeOpacity={0.70}
            onPress = {() => this.openImagePicker("picture1")}
          >
            <Text style={styles.uploadPictureText}>Upload Picture 1</Text>
          </TouchableOpacity>
          <Text style={styles.pictureText}>
            {this.state.picturesUploadText.picture1UploadText}
          </Text>
        </View>

        <View style={styles.pictureUploadContainer}>
          <TouchableOpacity
            style={styles.uploadPictureButton}
            activeOpacity={0.70}
            onPress = {() => this.openImagePicker("picture2")}
          >
            <Text style={styles.uploadPictureText}>Upload Picture 2</Text>
          </TouchableOpacity>
          <Text style={styles.pictureText}>
            {this.state.picturesUploadText.picture2UploadText}
          </Text>
        </View>

        <View style={styles.pictureUploadContainer}>
          <TouchableOpacity
            style={styles.uploadPictureButton}
            activeOpacity={0.70}
            onPress = {() => this.openImagePicker("picture3")}
          >
            <Text style={styles.uploadPictureText}>Upload Picture 3</Text>
          </TouchableOpacity>
          <Text style={styles.pictureText}>
            {this.state.picturesUploadText.picture3UploadText}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.70}
          onPress = {() => this.submitForm()}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimerText}>
          You must be in the location of the situation when filling this form.
        </Text>
      </View>
    );
  }
}

// style sheet for the Report Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  pictureUploadContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  reportTextInput: {
    height: 62.5,
    width: "75%"
  },
  reportTextAreaInput: {
    height: 75,
    width: "75%",
    textAlignVertical: "top"
  },
  pictureText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  uploadPictureButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12.5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 7.5,
    backgroundColor: "#F6F6F8"
  },
  uploadPictureText: {
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    marginTop: 7.5,
    backgroundColor: "#F6F6F8"
  },
  submitButtonText: {
    fontSize: 12.5,
    fontWeight: "bold",
    color: "#A9A9A9"
  },
  disclaimerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2980CD"
  }
});

export default Report;
