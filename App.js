import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { ValidateCode, EvaluateCode } from './content'




const qCodeCheck = i => i.length == 6 


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videoFound: false, videoSource: '' }
    
  }

  onTextChange(e) {
      if (ValidateCode(e)) {
        EvaluateCode(e).then(src => {
          if (src) {
            this.setState({ videoFound: true, videoSource: src })
            Keyboard.dismiss()
          } else {
            this.setState({ videoFound: false, videoSource: '' })
          }
        })

      }
  }
  

  render() {
    console.log(this.state.videoSource)
    return (
      <View style={styles.container}>
        <Text>Final Video Çözüm</Text>
        <TextInput onChangeText={this.onTextChange.bind(this)} style={styles.input}></TextInput>

        {this.state.videoSource?
        <Video
        source={{ uri: this.state.videoSource }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls
        style={{ width: 300, height: 300 }}
        /> 
        :null}
        <StatusBar style="auto" />
      </View>
    );
  }
}

const dimensions = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: dimensions.width/2,
    marginHorizontal: 'auto',
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  video: {
    borderColor: 'black',
    borderWidth: 1,
    width: dimensions.width,
  }
});
