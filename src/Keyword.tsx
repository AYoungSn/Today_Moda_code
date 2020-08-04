import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Pressable,
} from 'react-native';

export default class Keyword extends React.Component{
  state={
    SimpleBasic: false,
    Lovely: false,
    Campus: false,
    Office: false,
    Modern: false
  };
  pickSimple=()=> {
    this.state.SimpleBasic= true;
    console.log("simple basic")
  }
  pickLov=()=>{
    this.state.Lovely=true;
    console.log("lovely");
  }
  render(){
    return (
      <>
      <View style={styles.container}>
        {/* <Text>Keyword</Text> */}
        <Pressable onPress={this.pickSimple}
        style={styles.button}
        >
          <Text>심플베이직</Text>
        </Pressable>
        <Pressable onPress={this.pickLov}
        style={styles.button}>
          <Text>러블리</Text>
        </Pressable>
        <Pressable onPress={this.pickSimple} style={styles.button}>
          <Text>심플베이직</Text>
        </Pressable>
        <Pressable onPress={this.pickLov} 
        style={()=>[
          {
            backgroudColor: (this.state.Lovely?'#CCCCCC' : 'white')
          },
          styles.button
        ]}>
          <Text>러블리</Text>
        </Pressable>
      </View>
      </>
    );
  }
};
const styles=StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  button: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCCCCC',
    padding: 8,
    margin: 5,
  }
})