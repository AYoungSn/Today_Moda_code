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
  StatusBar,
  Dimensions
} from 'react-native';
import Weather from './Weather';
import * as Location from 'expo-location';

const API_KEY = "b86c474546c60f7c146da98180738950";

// shopping api key
const NAVER_API_KEY = "5JU7NeFVoI4HmS9ZzWnX";
const NAVER_API_SECRET = "Fpj6gmUYjD";

const numColumns = 3;

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
    width: 100,
    //옷 종류 키워드
    Slacks: false,
    Pants: false,
    Sleeveless: false,
    Linen: false,
    ShortPants: false,
    Cottonpants: false,
    Shirts: false,
    LongSleeve: false,
    ShortSleeve: false,
    Cardigan: false,
    Jacket: false,
    Jeans: false,
    Coat: false,
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
    });
  }

  //위치 정보 얻어서 날씨 데이터 받아옴
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
  _renderItem = ({item}) => { //쇼핑 결과 가져오기
    return (
      <View style={styles.item}>
        <Image source={{uri:item.image, width:this.state.width/3.5, height:this.state.width/3}}/>
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
  pickSleeveless=()=> {
    this.state.Sleeveless= true;
    console.log("Sleeveless")
    this.shopping('나시');
    this.setState({
     Linen:false,
     ShortPants: false,
     Cottonpants: false,
    });
  }
  pickLinen=()=> {
    this.state.Linen= true;
    console.log("Linen")
    this.shopping('린넨');
    this.setState({
      Sleeveless:false,
      ShortPants: false,
      Cottonpants: false,
    });
  }
  pickShortPants=()=> {
    this.state.ShortPants= true;
    console.log("Short Pants")
    this.shopping('반바지');
    this.setState({
     
    });
  }
  pickSlacks=()=> {
    this.state.Slacks= true;
    console.log("slacks")
    this.shopping('슬랙스');
    this.setState({
     
    });
  }
  pickCottonpants=()=> {
    this.state.Cottonpants= true;
    console.log("Cottonpants")
    this.shopping('면바지');
    this.setState({
     
    });
  }
  pickShirts=()=> {
    this.state.Shirts= true;
    console.log("Shrits")
    this.shopping('셔츠');
    this.setState({
     
    });
  }
  pickLongSleeve=()=> {
    this.state.LongSleeve= true;
    console.log("LongSleeve")
    this.shopping('롱슬리브');
    this.setState({
     
    });
  }
  pickCardigan=()=> {
    this.state.Cardigan= true;
    console.log("Cardigan")
    this.shopping('가디건');
    this.setState({
     
    });
  }
  pickJacket=()=> {
    this.state.Jacket= true;
    console.log("Jacket")
    this.shopping('자켓');
    this.setState({
     
    });
  }
  pickJeans=()=> {
    this.state.Jeans= true;
    console.log("Jeans")
    this.shopping('청바지');
    this.setState({
     
    });
  }
  pickCoat=()=> {
    this.state.Coat= true;
    console.log("Coat")
    this.shopping('코트');
    this.setState({
     
    });
  }
  pickShortSleeve=()=> {
    this.state.ShortSleeve= true;
    console.log("ShortSleeve")
    this.shopping('숏슬리브');
    this.setState({
     
    });
  }
  render(){
    const { isLoaded, city, weatherName, cityTemp, error } = this.state;
    const feels=Math.floor((this.state.feels-273.15)*10)/10;
    this.state.width= Dimensions.get('screen').width;
    return (
      <SafeAreaView style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
        <View style={styles.b_header}>
          <Text style={styles.header}>Today's мода</Text>
        </View>
        <ScrollView>
        <View style={styles.weather}>
          {isLoaded ?
          <Weather 
          city={city} weatherName={weatherName} 
          temp={Math.floor((cityTemp-273.15)*10)/10} feels={feels}
          width={this.state.width}
          />
          : error?<Text>{error}</Text>: null}
        </View>
        <View>
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
        </View>
        <View>
          <ScrollView style={styles.keyword} horizontal={true}>
            {this.state.feels>30?
            [this.state.Sleeveless?
              <Text style={styles.selected} onPress={()=>console.log('onpressed')}>Sleeveless</Text>
              :<Text onPress={this.pickSleeveless} style={styles.button}>Sleeveless</Text>,
            <Text onPress={this.pickLinen} style={styles.button}>Linen</Text>,
            <Text onPress={this.pickShortPants} style={styles.button}>Short Pants</Text>,
            <Text onPress={this.pickCottonpants} style={styles.button}>Cotton pants</Text>]
            :this.state.feels<=30 && this.state.feels>20?
            [
              <Text onPress={this.pickSlacks} style={styles.button}>Slacks</Text>,
              <Text onPress={this.pickShirts} style={styles.button}>Shrits</Text>,
              <Text onPress={this.pickLongSleeve} style={styles.button}>Long Sleeve</Text>,
              <Text onPress={this.pickSlacks} style={styles.button}>Short Sleeve</Text>,
            ]:
            [
              <Text onPress={this.pickCardigan} style={styles.button}>Cardigan</Text>,
                <Text onPress={this.pickSlacks} style={styles.button}>Jacket</Text>,
              <Text onPress={this.pickSlacks} style={styles.button}>Jeans</Text>,
              <Text onPress={this.pickSlacks} style={styles.button}>Coat</Text>,
            ]}
          </ScrollView>
        </View>
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
        </ScrollView>
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
    paddingBottom: 30, //마지막 항목 정상적으로 출력하기위해서
    height: Dimensions.get('window').width / numColumns,
    alignItems: 'center',
    justifyContent: 'center',
    //flex: 1,
  },
  container: {
    // margin:5,
  },
  item: {
    backgroundColor: '#DDDDDD',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',

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
