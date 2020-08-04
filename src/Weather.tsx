import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// https://ionicons.com/   icon 파일명 찾는곳

import PropTypes from 'prop-types';

const weatherCases = {
    Thunderstorm: {
        icon: 'ios-thunderstorm',
        weatherName: 'Thunderstorm',
        desc: '오늘은 천둥 번개가 쳐요',
        color: '#FFD000'
    },

    Drizzle: {
        icon: 'ios-rainy',
        weatherName: 'Drizzle',
        desc: '오늘은 이슬비가 내려요',
        color: '#29ACC5',
    },

    Rain: {
        icon: 'ios-umbrella',
        weatherName: 'Rain',
        desc: '오늘은 비가 내려요. 우산을 꼭 챙기세요!',
        color: '#7C5786',
    },

    Snow: {
        icon: 'ios-snow',
        weatherName: 'Snow',
        desc: '오늘은 눈이 내려요.',
        color: '#61ECED',
    },

    Clear: {
        icon: 'ios-sunny',
        weatherName: 'Clear',
        desc: '오늘은 맑아요',
        color: '#EE682E',
    },

    Clouds: {
        icon: 'ios-cloudy',
        weatherName: 'Clouds',
        desc: '오늘은 흐려요',
        color: '#AFAFAF',
    }

}

function Weather({ city, weatherName, temp, feels }){
    const {height, width}=Dimensions.get('screen');
    return (
        <View style={styles.container}>
            <View style={styles.weather_img}>
                <Ionicons name={weatherCases[weatherName].icon} size={width/3} color={weatherCases[weatherName].color}/>
            </View>
            
            <View style={styles.w_info}>
                <Text style={styles.w_txt}>{weatherName}</Text>
                <Text style={{fontSize: 17, marginBottom:3}}>CITY: {city}</Text>
                <Text style={{fontSize: 20}}>온도: {temp}°C</Text>
                <Text style={{fontSize: 20}}>체감온도: {feels}°C</Text>
            </View>
        </View>
    )
}

Weather.propTypes = {
    city: PropTypes.string.isRequired,
    weatherName: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    feels: PropTypes.number.isRequired,
}

export default Weather;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
        borderRadius: 5,
        marginLeft:20,
        marginTop: 10,
    },weather_img: {
        resizeMode: 'contain',
        alignItems: 'flex-start',
        color:'black',
        marginLeft: 19,
        marginRight: 18,
        marginTop: 15,
    }, w_info: {
        flex:3,
        textAlign: 'left',
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 20,
        
    }, w_txt: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom:5,
    }
});