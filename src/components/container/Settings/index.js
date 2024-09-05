import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Avatar, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


const Settings = ({ navigation }) => {

  const userData = useSelector((state) => state.userData);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <List.Item
        style={styles.listItem}
        title={userData.name}
        titleStyle={styles.titleStyle}
        description={userData.status}
        descriptionStyle={styles.descriptionStyle}
        left={() => (
          <Avatar.Image
            size={60}
            source={{ uri: userData.avatar }}
          />
        )}
      />

      <Divider style={styles.divider} />

      <List.Item
        style={styles.listItem}
        onPress={() => navigation.navigate('EditProfile', { userData: userData })}
        title="Cuenta"
        titleStyle={styles.titleStyle}
        description="Cambiar nombre, actualizar avatar"
        descriptionStyle={styles.descriptionStyle}
        left={() => (
          <List.Icon color={'#F15A50'} icon="cog" /> // Icono en color primario
        )}
      />

      <Divider style={styles.divider} />

      <List.Item
        style={styles.listItem}
        title="Cerrar sesión"
        titleStyle={styles.logoutTitle}
        left={() => (
          <List.Icon color={'#fff'} icon="door-closed-lock" /> // Icono en color primario
        )}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco para un diseño limpio
  },
  listItem: {
    padding: 10,
    backgroundColor: '#FF8C7A', // Fondo rosa salmón para items generales
  },
  listItemLogout: {
    padding: 10,
    backgroundColor: '#F15A50', // Rojo coral para el ítem de cerrar sesión
  },
  titleStyle: {
    color: '#333333', // Texto oscuro para contraste
    fontFamily: 'Poppins-SemiBold',
  },
  logoutTitle: {
    color: '#fff', // Texto blanco para el ítem de cerrar sesión
    fontFamily: 'Poppins-SemiBold',
  },
  descriptionStyle: {
    color: 'rgba(0, 0, 0, 0.6)', // Texto gris oscuro para descripciones
    fontFamily: 'Poppins-Regular',
  },
  divider: {
    backgroundColor: '#F15A50', // Divider en color primario para marcar separación
    height: 1,
  },
});

export default Settings;
