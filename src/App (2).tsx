import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import axios from 'axios'

const NAVER_API_KEY = "Z162CePuTsRagu8ZBIHn";
const NAVER_API_SECRET = "ZhIgU_cS9J";

const numColumns = 4;

class App extends React.Component {

  constructor(props: any) {
    super(props) ;
    this.state = {
      imageUrl: null,
      imageTitle: null,
    }
  }
  
  componentDidMount() {
    return fetch("https://openapi.naver.com/v1/search/shop.xml?query=%EC%A3%BC%EC%8B%9D&display=24&start=1&sort=sim", {
      headers: {
        "X-Naver_client_id": "{API_KEY}",
        "X-Naver-Client-Secret": "API_SECRET}"
      }
        }
    )
    .then( (response) => response.json())
    .then(json => {
      this.setState({
        imageUrl: json.image,
        imageTitle: json.title
      })
    } )
  }

  renderItem = (item, index ) => { //쇼핑 결과 가져오기
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  render() { // 한 화면에 4줄로 출력
    return (
      <FlatList
        imageThumb={formatData(, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {

  },

  itemInvisible: {

  },

  itemText: {

  },
  
});