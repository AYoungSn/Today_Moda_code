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
  Platform,
  StatusBar
} from 'react-native';
import Weather from './Weather';
import * as Location from 'expo-location';

const API_KEY = "b86c474546c60f7c146da98180738950";

// shopping api key
const NAVER_API_KEY = "5JU7NeFVoI4HmS9ZzWnX";
const NAVER_API_SECRET = "Fpj6gmUYjD";

const numColumns = 4;

export default class App extends React.Component{
  state= {
    isLoaded: false,
    city: '',
    weatherName: '',
    cityTemp: 0,
    error: null,
    feels: 0,
    data: [],//상품 정보 json 배열을 통째로 가져옴
    SimpleBasic: false,
    Lovely: false,
    Campus: false,
    Office: false,
    Modern: false,
  }

  //위치 정보 확인
  componentDidMount(){
    this.getLocation();
  }

  shopping = (fashion) =>{
    fetch(`https://openapi.naver.com/v1/search/shop.json?query=${fashion}&display=24&start=1&sort=sim`, 
      {
        method: 'GET',
        headers: {
          "X-Naver-Client-Id": `${NAVER_API_KEY}`,
          "X-Naver-Client-Secret": `${NAVER_API_SECRET}`,
        }
      }
    ).then( (response) => response.json())
    .then(json => {
        this.setState({
          data: json.items
        })
    })
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
        console.log('weather');
        console.log(json.weather)
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
  _renderItem = ({item}) => { //쇼핑 결과 가져오기
    return (
      <View style={styles.item}>
        <Text style={{color:'black'}}>hi</Text>
        <Image source={{uri:item.image, width:30, height:30}}/>
      </View>
    );
  }
  pickSimple=()=> {
    this.state.SimpleBasic= true;
    console.log("simple basic")
    this.shopping('베이직룩');
    this.setState({
      Lovely: false,
      Campus: false,
      Office: false,
      Modern: false,
    });
  }
  pickLov=()=>{
    this.state.Lovely=true;
    console.log("lovely");
    this.shopping('러블리룩');
    this.setState({
      SimpleBasic:false,
      Campus: false,
      Office: false,
      Modern: false,
    });
  }
  pickCampus=()=>{
    this.state.Campus=true;
    console.log('campus');
    this.shopping('캠퍼스룩');
    this.setState({
      SimpleBasic:false,
      Lovely: false,
      Office: false,
      Modern: false,
    });
  }
  pickOffice=()=>{
    this.state.Office=true;
    console.log('office');
    this.shopping('세미정장');
    this.setState({
      SimpleBasic:false,
      Lovely: false,
      Campus: false,
      Modern: false,
    });
  }
  pickModern=()=>{
    this.state.Modern=true;
    console.log('modern')
    this.setState({
      SimpleBasic:false,
      Lovely: false,
      Campus: false,
      Office: false,
    })
    this.shopping('모던룩');
  }

  render(){
    const { isLoaded, city, weatherName, cityTemp, error, feels } = this.state;
    return (
      <SafeAreaView style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
        <View style={styles.b_header}>
          <Text style={styles.header}>Today's мода</Text>
        </View>

        <View style={styles.weather}>
          {isLoaded ?
          <Weather city={city} weatherName={weatherName} temp={Math.floor((cityTemp-273.15)*10)/10} feels={Math.floor((feels-273.15)*10)/10}/>
          : error?<Text>{error}</Text>: null}
        </View>
        
        <ScrollView style={styles.keyword} horizontal={true}>
          {/* 스타일 키워드 영역 */}
          {this.state.SimpleBasic?
          <Text style={styles.selected} onPress={()=>console.log('onpressed')}>SimpleBasic</Text>
          :<Text onPress={this.pickSimple} style={styles.button}>SimpleBasic</Text>}
          {this.state.Lovely?
          <Text style={styles.selected} onPress={()=>console.log('onpressed')}>Lovely</Text>
          :<Text onPress={this.pickLov} style={styles.button}>Lovely</Text>}
          {this.state.Campus?
          <Text style={styles.selected} onPress={()=>console.log('onpressed')}>Campus</Text>
          :<Text onPress={this.pickCampus} style={styles.button}>Campus</Text>}
          {this.state.Office?
          <Text style={styles.selected} onPress={()=>console.log('onpressed')}>Office</Text>
          :<Text onPress={this.pickOffice} style={styles.button}>Office</Text>}
          {this.state.Modern?
          <Text style={styles.selected} onPress={()=>console.log('onpressed')}>Modern</Text>
          :<Text onPress={this.pickModern} style={styles.button}>Modern</Text>}
        </ScrollView>
        <ScrollView style={styles.keyword} horizontal={true}>
          {/* 옷 종류 키워드 영역 */}
          {/* {this.state.SimpleBasic?
          <Text style={styles.selected} onPress={()=>console.log('onpressed')}>SimpleBasic</Text>
          :<Text onPress={this.pickSimple} style={styles.button}>SimpleBasic</Text>} */}
        </ScrollView>
        
        <View style={styles.shopping}>
          {/* 패션 이미지 영역 */}
          <FlatList
           data = {this.state.data}
           style={styles.container}
           renderItem={this._renderItem}
           numColumns={numColumns}
           keyExtractor={item=> item.productId}
            />
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
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  shopping: {
    backgroundColor: '#DDDDDD',
    padding: 5,
    margin: 5,
  },
  container: {
    margin:5,
  },
  item: {
    margin: 5,
  },
  itemText: {
    color:'black'
  },
  button: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCCCCC',
    padding: 8,
    margin: 5,
    textAlign:'center',
  },
  selected: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCCCCC',
    padding: 8,
    margin: 5,
    fontWeight: 'bold',
    textAlign:'center',
  }
})