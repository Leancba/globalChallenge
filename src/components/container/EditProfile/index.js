import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, IconButton, List} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useToast } from "react-native-toast-notifications";

import { UpdateUserData } from 'services/userDataApi';
import { useSelector } from 'react-redux';

import AvatarModal from './Modals/AvatarModal';
import EditModal from './Modals/EditModal';



const UserProfile = () => {

  const userData = useSelector((state) => state.userData)

  const toast = useToast()
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);

  const [editingField, setEditingField] = useState('');
  const [fieldValue, setFieldValue] = useState('');

  const showModal = (field, value) => {
    setEditingField(field);
    setFieldValue(value);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleSave = async () => {

    const updatedField = { [editingField.toLowerCase()]: fieldValue };

    try {

      await UpdateUserData(updatedField, dispatch);
      toast.show('Datos actualizados exitosamente', { type: "warning" });

    } catch (error) {
      toast.show('Ha ocurrido un error al actualizar los datos', { type: "danger" });
    }

    hideModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={120}
          source={{ uri: userData.avatar }}
        />
        <IconButton
          icon="camera"
          size={24}
          style={styles.iconButton}
          onPress={() => setAvatarModal(true)}
        />
      </View>

      {/* List for Name */}
      <List.Item
        title={userData.name}
        style={{ paddingRight: 0 }}
        description="Nombre"
        titleStyle={styles.listTitleStyle}
        descriptionStyle={styles.listDescriptionStyle}
        left={() => <List.Icon color="#fff" icon="account" />}
        right={() => (
          <IconButton
            icon="pencil"
            color="#fff"
            onPress={() => showModal('name', userData.name)}
          />
        )}
      />

      {/* List for Status */}
      <List.Item
        title={userData.status}
        description="Estado"
        style={{ paddingRight: 0 }}
        titleStyle={styles.listTitleStyle}
        descriptionStyle={styles.listDescriptionStyle}
        left={() => <List.Icon color="#fff" icon="information" />}
        right={() => (
          <IconButton
            icon="pencil"
            color="#fff"
            onPress={() => showModal('Status', userData.status)}
          />
        )}
      />

      {/* List for Phone */}
      <List.Item
        title={userData.phone}
        description="Teléfono"
        style={{ paddingRight: 0 }}
        titleStyle={styles.listTitleStyle}
        descriptionStyle={styles.listDescriptionStyle}
        left={() => <List.Icon color="#fff" icon="phone" />}
        right={() => (
          <IconButton
            icon="pencil"
            color="#fff"
            onPress={() => showModal('phone', userData.phone)}
          />
        )}
      />
      <EditModal
        visible={visible}
        hideModal={hideModal}
        editingField={editingField}
        fieldValue={fieldValue}
        setFieldValue={setFieldValue}
        handleSave={handleSave}
      />

      <AvatarModal
        userData={userData}
        avatarModal={avatarModal}
        setAvatarModal={setAvatarModal}
      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 15,
    backgroundColor: '#00749c', // Fondo principal en azul
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  iconButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff', // Fondo blanco para el ícono
    borderRadius: 50,
  },
  listTitleStyle: {
    color: '#fff', // Títulos en blanco
    fontFamily: 'Poppins-SemiBold',
  },
  listDescriptionStyle: {
    color: 'rgba(255, 255, 255, 0.8)', // Descripciones con opacidad del 80%
    fontFamily: 'Poppins-Regular',
  },
  modalContainer: {
    backgroundColor: '#028ab9', // Fondo del modal en azul más claro
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff', // Input de texto con fondo blanco
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#028ab9', // Fondo azul claro para los botones
  },
  customOutlineStyle: {
    padding: 20,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
  }
});

export default UserProfile;
