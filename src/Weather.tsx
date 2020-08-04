import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// https://ionicons.com/   icon 파일명 찾는곳

import PropTypes from 'prop-types';

const weatherCases = {
    Thunderstorm: {
        colors: ['#415b72', '#004787'],
        icon: 'ios-thunderstorm',
        weatherName: 'Thunderstorm',
        desc: '오늘은 천둥 번개가 쳐요'    
    },

    Drizzle: {
        colors: ['#d7dde5', '#c9d2d8', '#5db7fc'],
        icon: 'ios-rainy',
        weatherName: 'Drizzle',
        desc: '오늘은 이슬비가 내려요'
    },

    Rain: {
        colors: ['#00C6FB', '#005BEA'],
        icon: 'ios-umbrella',
        weatherName: 'Rain',
        desc: '오늘은 비가 내려요. 우산을 꼭 챙기세요!'
    },

    Snow: {
        colors: ['#7DE2FC', '#B9B6E5'],
        icon: 'ios-snow',
        weatherName: 'Snow',
        desc: '오늘은 눈이 내려요.'
    },

    Clear: {
        colors: ['#ffffff', '#6de1ff'],
        icon: 'ios-sunny',
        weatherName: 'Clear',
        desc: '오늘은 맑아요'
    },

    Clouds: {
        colors: ['#d7dde5', '#646970'],
        icon: 'ios-cloudy',
        weatherName: 'Clouds',
        desc: '오늘은 흐려요'
    }

}

function Weather({ city, weatherName, temp, feels }){
    const {height, width}=Dimensions.get('screen');
    return (
        <View style={styles.container}>
            <View style={styles.weather_img}>
                <Ionicons name={weatherCases[weatherName].icon} size={width/3} color="black"/>
            </View>
            
            <View style={styles.w_info}>
                <Text style={styles.w_txt}>{weatherName}</Text>
                <Text style={{fontSize: 15}}>city: {city}</Text>
                <Text style={{fontSize: 20}}>온도: {temp}°C</Text>
                <Text style={{fontSize: 20}}>체감온도: {feels}°C</Text>
            </View>
        </View>
    )
}

Weather.propTypes = {
    city: PropTypes.string.isRequired,
    weatherName: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired
}

export default Weather;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
        margin: 5,
        borderRadius: 5,
    },weather_img: {
        margin: 10,
        resizeMode: 'contain',
        alignItems: 'flex-start',
        color:'black',
    }, w_info: {
        flex:3,
        textAlign: 'left',
        flexDirection: 'column',
        marginTop: 20,
        marginLeft: 10,
        
    }, w_txt: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});