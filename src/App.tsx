/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 * expo
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  
} from 'react-native';
import Weather from './Weather';
import Keyword from './Keyword';
import Shopping from './Shopping';
import * as Location from 'expo-location';

const API_KEY = "b86c474546c60f7c146da98180738950";

// shopping api key
const NAVER_API_KEY = "5JU7NeFVoI4HmS9ZzWnX";
const NAVER_API_SECRET = "Fpj6gmUYjD";

const numColumns = 4;

interface Props {}
interface State {}

export default class App extends React.Component<Props,State>{
  state= {
    isLoaded: false,
    city: '',
    weatherName: '',
    cityTemp: 0,
    error: null,
    feels: 0,
    imageUrl: [],
    imageTitle: [],
    fashion: 'pants'
  };

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  }
  //위치 정보 확인
  componentDidMount(){
    this.getLocation();
    fetch("https://openapi.naver.com/v1/search/shop.json?query={fashion}&display=24&start=1&sort=sim", 
      {
        method: 'GET',
        headers: {
          "X-Naver-Client-Id": `${NAVER_API_KEY}`,
          "X-Naver-Client-Secret": `${NAVER_API_SECRET}`,
        }
      }
    ).then( (response) => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        imageUrl: json.image,
        imageTitle: json.title
      })
    })
  }
  // _getWeather = (lat, lon) => {
  //   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  //   .then(response => response.json())
  //   .then(json => {
  //     this.setState({
  //       cityTemp: json.main.temp,
  //       weatherName: json.weather[0].main,
  //       isLoaded: true,
  //       city: json.name,
  //       feels: json.main.feels_like
  //     })
  //   });
  // }

  _getWeather = async(lat, lon) =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        cityTemp: json.main.temp,
        weatherName: json.weather[0].main,
        isLoaded: true,
        city: json.name,
        feels: json.main.feels_like
      })
    });
  }

  getLocation = async() => {
    try{
      const response = await Location.requestPermissionsAsync();
      const { coords} = await Location.getCurrentPositionAsync();
      const lat=coords.latitude;
      const lon=coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        cityTemp: json.main.temp,
        weatherName: json.weather[0].main,
        isLoaded: true,
        city: json.name,
        feels: json.main.feels_like
      })
    });
      
    }catch(E){
      console.log(E);
    }
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
  }

  render(){
    const { isLoaded, city, weatherName, cityTemp, error, feels } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.b_header}>
          <Text style={styles.header}>Today's мода</Text>
        </View>
        
          <View style={styles.weather}>
            {isLoaded ?
            <Weather city={city} weatherName={weatherName} temp={Math.floor((cityTemp-273.15)*10)/10} feels={Math.floor((feels-273.15)*10)/10}/>
            : error?<Text>{error}</Text>: null}
          </View>
          <View style={styles.keyword}>
            {/* 키워드 영역 */}
            {/* <Keyword/> */}
          </View>
          <View style={styles.shopping}>
            {/* 패션 이미지 영역 */}
            <Shopping/>
            {/* <FlatList
            data={this.formatData(this.state, numColumns)}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={numColumns}
            /> */}
          </View>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  b_header: {
    backgroundColor: '#FAFAFA',
    height: 55
  },
  header: {
    color: '#000000',
    fontSize: 25,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 9,
    fontWeight: 'bold',
  },
  weather: {
    
  },
  keyword: {
    backgroundColor: '#FAFAFA',
    padding: 5,
    margin: 5,
  },
  shopping: {
    backgroundColor: '#DDDDDD',
    padding: 5,
    margin: 5,
  },
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
})