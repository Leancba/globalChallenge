import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Avatar, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


const Settings = ({ navigation }) => {

  const userData = useSelector((state) => state.userData);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
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
          <List.Icon color={'#F15A50'} icon="cog" /> 
        )}
      />

      <Divider style={styles.divider} />

      <List.Item
        style={styles.listItem}
        title="Cerrar sesión"
        titleStyle={styles.logoutTitle}
        left={() => (
          <List.Icon color={'#fff'} icon="door-closed-lock" /> 
        )}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  listItem: {
    padding: 10,
    backgroundColor: '#FF8C7A', 
  },
  listItemLogout: {
    padding: 10,
    backgroundColor: '#F15A50', 
  },
  titleStyle: {
    color: '#333333', 
    fontFamily: 'Poppins-SemiBold',
  },
  logoutTitle: {
    color: '#fff', 
    fontFamily: 'Poppins-SemiBold',
  },
  descriptionStyle: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: 'Poppins-Regular',
  },
  divider: {
    backgroundColor: '#F15A50', 
    height: 1,
  },
});

export default Settings;
