import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WeatherApp = () => {

  // App State (What temperature unit? What city?)
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [selectedCity, setSelectedCity] = useState('Saskatoon'); // Default city

  // Static weather data
  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny' },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
  ];

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (tempC: number) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  return (

    <View style={styles.container}>
    <Text style={styles.header}>Weather App</Text>

    <View style={styles.pickerContainer}>
      <Text style={styles.subheader}>Pick a City</Text>
    <Picker
        selectedValue={selectedCity}
        onValueChange={(itemValue) => setSelectedCity(itemValue)}
        >
          
            {weatherData.map((data, index) => (
              <Picker.Item key={index} label={data.city} value={data.city} />
            ))}
            
            </Picker>
            </View>

      {selectedWeather ? (
        <View style={styles.weatherCard}>
          <Text style={styles.city}>{selectedWeather.city}</Text>
          <Text style={styles.condition}>{selectedWeather.condition}</Text>
          <Text style={styles.temperature}
            {convertTemperature(selectedWeather.temperatureC).toFixed(2)}°{unit}
          >
          <Button title={`Toggle To ${toggleTempText}`} color="#fb8618ff" onPress={toggleUnit}}/>

      ) : (
        <Text style={styles.loading}>No weather data available</Text>
      )}

    </View>

  );
};

const colours = {
  bg: "#ffffff",
  card: "#ffffff",
  card2: "#ffffff",
  stroke: "#ffffff",
  text: "#ffffff",
  subtext: "#ffffff",
  accent: "#ffffff",
  accent2: "#ffffff",
};

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: #ffffff,
    padding: 21,
    gap: 13,
  },

  header: {
    fontSize: 32,
    marginBottom: 20,
  },

  toggleButton: {
    padding: 10,
    marginBottom: 20,
  },

  selectorContainer: {
    marginBottom: 20,
  },

  label: {
    marginRight: 10,
    fontSize: 16,
  },

  selector: {
    padding: 5,
    fontSize: 16,
  },

  weatherCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    margin: 10,
    width: 200,
  },

  city: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  condition: {
    fontSize: 16,
    color: '#555',
  },

  temperature: {
    fontSize: 18,
    color: '#333',
  },

  loading: {
    fontSize: 16,
    color: '#999',
  },

  picker: {
    fontSize: 20,
  }
});

export default WeatherApp;