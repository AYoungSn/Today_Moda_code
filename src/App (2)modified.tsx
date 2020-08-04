import React, {Component} from 'react';
import { 
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

const NAVER_API_KEY = "Z162CePuTsRagu8ZBIHn";
const NAVER_API_SECRET = "9PLuvAA8Cr";


const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 4;

export class App extends React.Component {
  state = {
    imageUrl: [],
    imageTitle: []
  }
  
  componentDidMount() {
    return fetch("https://openapi.naver.com/v1/search/shop.json?query=%EC%A3%BC%EC%8B%9D&display=24&start=1&sort=sim", 
      {
        headers: {
          "X-Naver_client_id": "{NAVER_API_KEY}",
          "X-Naver-Client-Secret": "{NAVER_API_SECRET}"
        }
      }
    ).then( (response) => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        imageUrl: json.image,
        imageTitle: json.title
      })
    } )
  }

  renderItem = ({item, index} ) => { //쇼핑 결과 가져오기
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Image style={{width: 10}} source={{uri:this.state.imageUrl}} /> //source가 어디에서 나온건지 모르겠어..!
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  render() { // 한 화면에 4줄로 출력
    return (
      <SafeAreaView>
        <FlatList
          data={formatData(this.state, numColumns)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
    width: 100,
  },

  item: {

  },

  itemInvisible: {

  },

  itemText: {

  },
  
});