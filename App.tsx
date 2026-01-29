import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const colours = {
  bg: '#f3eedf',
  card: '#ffffff',
  stroke: '#536858',
  text: '#3a3a3a',
  accent: '#fb8618',
};

const WeatherApp = () => {

  // App State
  const [unit, setUnit] = useState('C');
  const [selectedCity, setSelectedCity] = useState('Saskatoon');

  // Static weather data
  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny' },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
    { city: 'Innsmouth', temperatureC: 25, condition: 'Fishy' },
  ];

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };
4943
  const convertTemperature = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>WEATHER APP</Text>

      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Pick a City</Text>

        <View style={styles.pickerWrapper}>
            <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={{ height: 50, width: '100%' }}
            >
            {weatherData.map((data, index) => (
                <Picker.Item key={index} label={data.city} value={data.city} />
            ))}
            </Picker>
        </View>
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
              color={colours.accent}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.bg,
    padding: 21,
    gap: 13,
  },
  header: {
    fontSize: 32,
    marginTop: 40,
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
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: colours.text,
    fontWeight: 'bold',
  },
  weatherCard: {
    backgroundColor: colours.card,
    borderColor: colours.stroke,
    borderWidth: 4,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
  city: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 16,
    color: colours.stroke,
  },
  temperature: {
    fontSize: 18,
    color: colours.text,
    marginTop: 10,
  },
  loading: {
    fontSize: 16,
    color: colours.stroke,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: colours.card,
    borderColor: colours.stroke,
    height: 50,
    alignItems: 'center',
  },
});

export default WeatherApp;