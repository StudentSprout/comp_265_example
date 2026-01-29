import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WeatherApp = () => {

  // App State
  const [unit, setUnit] = useState('C'); 
  const [selectedCity, setSelectedCity] = useState('Saskatoon'); 

  // Static weather data
  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny' },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
  ];

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>

      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Pick a City</Text>
        
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => setSelectedCity(itemValue)}
          style={styles.picker} 
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
          
          <Text style={styles.temperature}>
            {convertTemperature(selectedWeather.temperatureC).toFixed(2)}°{unit}
          </Text> 

          <View style={styles.toggleButton}>
             <Button 
               title={`Toggle To ${unit === 'C' ? 'F' : 'C'}`} 
               color="#fb8618" 
               onPress={toggleUnit} 
             />
          </View>
        </View>

      ) : (
        <Text style={styles.loading}>No weather data available</Text>
      )}

    </View>
  );
};

const colours = {
  bg: '#f3eedf',
  card: '#ffffff',
  stroke: '#dddddd',
  text: '#3a3a3a',
  accent: '#fb8618',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bg, 
    padding: 21,
    gap: 13,
  },
  header: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: colours.text,
  },
  toggleButton: {
    padding: 10,
    marginTop: 10,
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
backgroundColor: colours.card,
  borderWidth: 0,
  borderRadius: 15,
  padding: 20,
  alignItems: 'center',
  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 5,
  width: '100%',
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
  pickerCointainer: {
    backgroundColor: colours.bg,
    height: 50, 
    width: 200,
  }
});

export default WeatherApp;