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
  Button,
} from 'react-native';
import Weather from './Weather';
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
    SimpleBasic: false,
    Lovely: false,
    Campus: false,
    Office: false,
    Modern: false,
    key:'',
  }

  formatData = (data, numColumns) => {
    const numberOfFullRows = 3;//Math.floor(this.state.length / numColumns); 11개씩 불러와서 4개씩 보여주면 3줄 나올거같아서
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      this.setState({ key: `blank-${numberOfElementsLastRow}` });
      numberOfElementsLastRow++;
    }
  
    return data;
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
      console.log(json)
      this.setState({
        imageUrl: json.image,
        imageTitle: json.title
      })
    })
  }
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
        <Image style={{width: 10}} source={{uri:this.state.imageUrl[0]}} />
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  }
  pickSimple=()=> {
    this.state.SimpleBasic= true;
    console.log("simple basic")
    this.shopping('simplebasic');
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
    this.shopping('lovely');
    this.setState({
      SimpleBasic:false,
      Campus: false,
      Office: false,
      Modern: false,
    });
  }
  pickCampus=()=>{
    this.state.Campus=true;
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
    this.setState({
      SimpleBasic:false,
      Lovely: false,
      Campus: false,
      Office: false,
    })
    this.shopping('모던');
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
        
        <ScrollView style={styles.keyword} horizontal={true}>
          {/* 키워드 영역 */}
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
          <Text style={styles.selected}>Modern</Text>
          :<Text onPress={this.pickModern} style={styles.button}>Modern</Text>}
        </ScrollView>
        
        <View style={styles.shopping}>
          {/* 패션 이미지 영역 */}
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
    flexDirection: 'row',
    flexWrap: 'wrap'
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