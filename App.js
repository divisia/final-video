import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native';
import { Audio, Video } from 'expo-av';
import DomSelector from 'react-native-dom-parser';


const ProxyServer = 'https://dry-ravine-43926.herokuapp.com/'
const SourceAddress = 'http://interaktif.final.com.tr/ajaxpro/_Default,App_Web_g3is2mij.ashx'


const qCodeCheck = i => i.length == 6 


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { videoSource: '' }
    
  }

  onTextChange(e) {
    if (qCodeCheck(e)) {
      console.log('Fetching for', e)
      fetch(`${ProxyServer}${SourceeAddress}`, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'X-AjaxPro-Method': 'VideoGetir',
          'Set-GPC': '1',
          'Cookie': 'ASP.NET_SessionId=4moopmq1x4ljaodkncrygdix',
          'Origin': 'example.com'
        },

        body: JSON.stringify({
          videoSifre: e,
        })
      })
        .then(response => { console.log(JSON.stringify(response)); return response.json() })
        .then(response => {
          console.log(response)
          const srcText = response.value
          const dom = DomSelector('<div>' + srcText + '</div>');
          const sourceTag = dom.getElementsByTagName('source')[0]
          console.log(sourceTag.attributes.src)
          const src = sourceTag.attributes.src
          this.setState({ 'videoSource': 'http://interaktif.final.com.tr' + src.slice(1) })
        })
        .catch((e) => { console.log(e) })
    }
  }

  render() {
    const video = React.createRef()
    console.log(this.state.videoSource)
    return (
      <View style={styles.container}>
        <Text>Final Video Çözüm</Text>
        <TextInput onChangeText={this.onTextChange.bind(this)} style={styles.input}></TextInput>

        {this.state.videoSource?<Video
          ref={video}
          style={styles.video}
          source={{
            uri: this.state.videoSource,
          }}
          useNativeControls
          resizeMode="contain"
        />:null}
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
