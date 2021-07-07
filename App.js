import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Header, LinearProgress } from 'react-native-elements';
import { ValidateCode, EvaluateCode } from './content'



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videoFound: false, videoSource: '', codeInvalid: false, loading: false }

  }

  onTextChange(e) {
    const text = e.toLowerCase();
    if (ValidateCode(text)) {
      this.setState({ 'loading': true, codeInvalid: false })
      EvaluateCode(text).then(src => {
        if (src) {
          this.setState({ codeInvalid: false, videoSource: src, loading: false })
          Keyboard.dismiss()
        } else {
          this.setState({ codeInvalid: true, videoSource: '', loading: false })
        }
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Header containerStyle={{ backgroundColor:'#a8f'}}
          centerComponent={{ text: 'Final Video Çözüm', style: { fontSize: 20, color: '#fff' } }}
        />
        <View style={styles.inputContainer}><Text>Soru kodunu girin</Text>
          <TextInput
            onChangeText={this.onTextChange.bind(this)}
            style={styles.input}
            maxLength={6}
            placeholder="GJI3RC">
          </TextInput>
        </View>

        {this.state.loading ? <LinearProgress color='#a8f' /> : null}

        {this.state.videoSource ?
          <Video
            source={{ uri: this.state.videoSource }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            useNativeControls
            style={styles.video}
          />
          : (this.state.codeInvalid ?
            <Text>Kod hatalı</Text>
            : null)}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: dimensions.width,
    height: dimensions.height,
  },
  input: {
    width: 22 * 6,
    margin: 30,
    marginHorizontal: 'auto',
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 5,
    borderRadius: 1,
    fontSize: 30,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    bottom: 0,
    left: 0,
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 5,
    marginTop: 'auto',
    height: dimensions.width * (3 / 4),
    width: dimensions.width,
  }
});
