import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TextInput, Button, Alert } from 'react-native'; 

interface WeatherData {
  temperatureCelsius: number;
  description: string;
  city: string;
}

class WeatherDataBuilder {
  private temperatureCelsius: number = 0;
  private description: string = '';
  private city: string = '';

  withTemperatureCelsius(temperatureCelsius: number): WeatherDataBuilder {
    this.temperatureCelsius = temperatureCelsius;
    return this;
  }

  withDescription(description: string): WeatherDataBuilder {
    this.description = description;
    return this;
  }

  withCity(city: string): WeatherDataBuilder {
    this.city = city;
    return this;
  }

  build(): WeatherData {
    return {
      temperatureCelsius: this.temperatureCelsius,
      description: this.description,
      city: this.city,
    };
  }
}

const Main: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const apiKey = '213ba2893ce43862e6c99bd9a16fa4f9'; // Replace with your actual OpenWeatherMap API key

  // Input state for user-entered city name
  const [cityInputPress, setCityInput] = useState('');

  const handleCityInputChange = (text: string) => {
    setCityInput(text);
  };

  const fetchWeatherData = async (cityInput: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();

      // Check if city exists
      if (!data.main) {
        throw new Error('City not found');
      }

      const temperature = data.main.temp;
      const temperatureCelsius = Math.round(temperature - 272.15);
      const description = data.weather[0].main;
      const city = data.name;

      const weatherData = new WeatherDataBuilder()
        .withTemperatureCelsius(temperatureCelsius)
        .withDescription(description)
        .withCity(city)
        .build();

      setWeatherData(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      Alert.alert('Error', 'City not found'); // Виводимо попап з повідомленням про помилку
    }
  };

  useEffect(() => {
    fetchWeatherData('Kyiv');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2980b9" barStyle="light-content" />
      <Image
        source={{ uri: 'https://cdn.jim-nielsen.com/ios/512/weather-2021-12-07.png' }}
        style={{ width: 150, height: 150, marginBottom: 40 }}
      />
      <View style={styles.content}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter city name"
          onChangeText={handleCityInputChange}
          value={cityInputPress}
        />
        <Button title="Get Weather" onPress={() => fetchWeatherData(cityInputPress)} />
        {weatherData && (
          <>
            <Text style={styles.temperature}>{weatherData.temperatureCelsius}°C</Text>
            <Text style={styles.description}>{weatherData.city}</Text>
            <Text style={styles.description}>{weatherData.description}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2980b9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 20,
    borderRadius: 10,
  },
  temperature: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495e',
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    color: '#34495e',
    textAlign: 'center',
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default Main;
