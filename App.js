import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Audio, Video } from 'expo-av';


function qCodeCheck(i) {
  return i.length == 6
}


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videoSource: '' }
    
  }

  onTextChange(e) {
    if (qCodeCheck(e.target.value)) {
      e.target.style.borderColor = 'green'
      fetch('https://cors-anywhere.herokuapp.com/http://interaktif.final.com.tr/ajaxpro/_Default,App_Web_g3is2mij.ashx', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'X-AjaxPro-Method': 'VideoGetir',
          'Set-GPC': '1',
          'Cookie': 'ASP.NET_SessionId=4moopmq1x4ljaodkncrygdix'
        },

        body: JSON.stringify({
          videoSifre: e.target.value,
        })
      })
        .then(response => response.json())
        .then(response => {
          const srcText = response.value
          const dom = new DOMParser().parseFromString('<div>' + srcText + '</div>', "text/html").children[0];
          const src = dom.querySelector('source').attributes.src.value
          this.setState({ 'videoSource': 'http://interaktif.final.com.tr' + src.slice(1) })
        })
        .catch((e) => { console.log(e) })
    }
    else { e.target.style.borderColor = 'red' }
  }

  render() {
    const video = React.createRef()
    console.log(this.state.videoSource)
    return (
      <View style={styles.container}>
        <Text>Final Video Çözüm</Text>
        <TextInput onChange={this.onTextChange.bind(this)} style={styles.input}></TextInput>

        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: this.state.videoSource,
          }}
          useNativeControls
          resizeMode="contain"
          
        />
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
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    borderRadius: 2,
  },
  video: {
    width: dimensions.width
  }
});
