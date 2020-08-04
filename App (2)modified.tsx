/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
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
  Dimensions,
  
} from 'react-native';
import styled from 'styled-components/native';
import Weather from 'Weather';
import Keyword from './Keyword';
import Shopping from './Shopping';
import Geolocation from '@react-native-community/geolocation';

const API_KEY = "b86c474546c60f7c146da98180738950";

// shopping api key
const NAVER_API_KEY = "5JU7NeFVoI4HmS9ZzWnX";
const NAVER_API_SECRET = "Fpj6gmUYjD";

const numColumns = 4;

const Header = styled.Text`
color: #000000;
font-size: 25px;
text-align: center;
align-items: center;
justify-content: center;
margin: 9px;
font-weight: bold;
`;

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
    imageUrl: '',
    imageTitle: null,
    fashion: '바지',
  };

  formatData = (data: any, numColumns: any) => {
    const numberOfFullRows = 3;//Math.floor(this.state.length / numColumns); 11개씩 불러와서 4개씩 보여주면 3줄 나올거같아서
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      this.setState({ key: `blank-${numberOfElementsLastRow}` });
      numberOfElementsLastRow++;
    }
  
    return data;
  };

  //위치 정보 확인
  componentDidMount(){
    Geolocation.getCurrentPosition(
      position =>{
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'error'
        })
      }
    );
    fetch("https://openapi.naver.com/v1/search/shop.json?query=${fashion}&display=10&start=1&sort=sim", 
      {
        method: 'GET',
        headers: {
          'X-Naver-Client-Id': `${NAVER_API_KEY}`,
          'X-Naver-Client-Secret': `${NAVER_API_SECRET}`
        },
        
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
  _getWeather = (lat: any, lon: any) => {
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

  renderItem = (item: any) => { //쇼핑 결과 가져오기
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >
        <Image style={{width: 10}} source={{uri:this.state.imageUrl}} />
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  }

  render(){
    const { isLoaded, city, weatherName, cityTemp, error, feels } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.header}>
          <Header>Today's мода</Header>
        </View>
        
          <View style={styles.weather}>
            {isLoaded ?
            <Weather city={city} weatherName={weatherName} temp={Math.floor((cityTemp-273.15)*10)/10} feels={Math.floor((feels-273.15)*10)/10}/>
            : error?<Text>{error}</Text>: null}
          </View>
          <View style={styles.keyword}>
            {/* 키워드 영역 */}
            <Keyword/>
          </View>
          <View style={styles.shopping}>
            {/* 패션 이미지 영역 */}
            <Shopping/>
            <FlatList
            data={this.formatData(this.state, numColumns)}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={numColumns}
            windowSize={11}
            />
          </View>
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FAFAFA',
    height: 55
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },

  itemInvisible: {

  },

  itemText: {

  },
})