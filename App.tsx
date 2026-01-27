import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

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

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  return (

    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      <Button onPress={toggleUnit} style={styles.toggleButton}>
        Toggle to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </Button>
      <View style={styles.selectorContainer}>
        <Text htmlFor="citySelector" style={styles.label}>
          Select a city:
        </Text>
        <select
          id="citySelector"
          value={selectedCity}
          onChange={handleCityChange}
          style={styles.selector}
        >
          {weatherData.map((data, index) => ( // <Picker.Item key={index} label={data.city} value={data.city} />
            <option key={index} value={data.city}>
              {data.city}
            </option>
          ))}
        </select>
      </View>
      {selectedWeather ? (
        <View style={styles.weatherCard}>
          <Text style={styles.city}>{selectedWeather.city}</Text>
          <Text style={styles.condition}>{selectedWeather.condition}</Text>
          <Text style={styles.temperature}>
            {convertTemperature(selectedWeather.temperatureC)}°{unit}
          </Text>
        </View>
      ) : (
        <Text style={styles.loading}>No weather data available</Text>
      )}
    </View>
  );
}

/*
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  toggleButton: {
    padding: '10px 20px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  selectorContainer: {
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
    fontSize: '1rem',
  },
  selector: {
    padding: '5px',
    fontSize: '1rem',
  },
  weatherCard: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    margin: '10px auto',
    width: '200px',
    textAlign: 'left',
  },
  city: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  condition: {
    fontSize: '1rem',
    color: '#555',
  },
  temperature: {
    fontSize: '1.1rem',
    color: '#333',
  },
  loading: {
    fontSize: '1rem',
    color: '#999',
  },
};

export default WeatherApp; */