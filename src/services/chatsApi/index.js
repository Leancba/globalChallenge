import data from '../db.json'
import { GET_CHATS } from '../../Redux/actions/actionTypes';

import AsyncStorage from '@react-native-async-storage/async-storage';


export const getChats = async (dispatch) => {
  
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const chats = data.chats;

    await AsyncStorage.setItem('chats', JSON.stringify(chats));

    dispatch({
      type: GET_CHATS,
      payload: chats,
    });

  } catch (error) {
    console.error('Error al obtener o almacenar los chats:', error);
    throw error;
  }
};


