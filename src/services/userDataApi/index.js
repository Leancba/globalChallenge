import data from '../db.json'
import { GET_USER_DATA } from '../../Redux/actions/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


export const SignIn = async (username, password) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const userData = data.userProfile;

    if (username === userData.email && password === userData.password) {
      
      const AuthToken = 'fake-jwt-token-123456789';
      await AsyncStorage.setItem('token', AuthToken);

      return;
    } else {
      throw new Error("Credenciales incorrectas");
    }
  } catch (error) {
    throw new Error(error.message || 'Error al almacenar el token');
  }
};

export const getUserData = async (dispatch) => {

  try {

    await new Promise(resolve => setTimeout(resolve, 3000));

    const userData = data.userProfile;

    dispatch({
      type: GET_USER_DATA,
      payload: userData,
    });

  } catch (error) {
    throw error;
  }

};

export const UpdateUserData = async (userData, payload, dispatch) => {
  
  try {

    await new Promise(resolve => setTimeout(resolve, 3000));


     const putUserData = {
      ...userData,
      ...payload,
    };

    dispatch({
      type: GET_USER_DATA,
      payload: putUserData,
    });

    return

  } catch (error) {
    throw new Error("Hubo un error al actualizar los datos");
  }
};



