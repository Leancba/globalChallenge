import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      {/* <Image source={require('../../assets/icon.jpeg')} style={styles.image} /> */}

      <Text style={styles.title}>Te damos la bienvenida a GlobalChat</Text>
      <Text style={styles.subtitle}>
        Recomendamos usar este servicio con responsabilidad para disfrutar de la experiencia que proporciona esta app desarrollada con cariño.
      </Text>
      <Text style={styles.terms}>
        Consulta nuestra Política de privacidad. Pulsa "Aceptar y continuar" para aceptar las Condiciones del servicio.
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('SignIn')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Aceptar y continuar
      </Button>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121b22',
    padding: 20,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  terms: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00A884',
    borderRadius: 5,
    paddingHorizontal: 30,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  },
});
