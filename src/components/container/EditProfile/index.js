import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, IconButton, List } from 'react-native-paper';
import { useSelector } from 'react-redux';

import AvatarModal from './Modals/AvatarModal';
import EditModal from './Modals/EditModal';

const UserProfile = () => {

  const userData = useSelector((state) => state.userData);

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

      <List.Item
        title={userData.name}
        style={styles.listItem}
        description="Nombre"
        titleStyle={styles.listTitleStyle}
        descriptionStyle={styles.listDescriptionStyle}
        left={() => <List.Icon color="#F15A50" icon="account" />} 
        right={() => (
          <IconButton
            icon="pencil"
            color="#F15A50"
            onPress={() => showModal('name', userData.name)}
          />
        )}
      />

      <List.Item
        title={userData.status}
        style={styles.listItem}
        description="Estado"
        titleStyle={styles.listTitleStyle}
        descriptionStyle={styles.listDescriptionStyle}
        left={() => <List.Icon color="#F15A50" icon="information" />} 
        right={() => (
          <IconButton
            icon="pencil"
            color="#F15A50"
            onPress={() => showModal('Status', userData.status)}
          />
        )}
      />

      
      <List.Item
        title={userData.phone}
        style={styles.listItem}
        description="Teléfono"
        titleStyle={styles.listTitleStyle}
        descriptionStyle={styles.listDescriptionStyle}
        left={() => <List.Icon color="#F15A50" icon="phone" />} 
        right={() => (
          <IconButton
            icon="pencil"
            color="#F15A50"
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
    backgroundColor: '#FF8C7A',
    padding: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  iconButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F15A50',
    borderRadius: 50,
  },
  listItem: {
    backgroundColor: '#FFB199', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  listTitleStyle: {
    color: '#fff', 
    fontFamily: 'Poppins-SemiBold',
  },
  listDescriptionStyle: {
    color: 'rgba(255, 255, 255, 0.8)', 
    fontFamily: 'Poppins-Regular',
  },
});

export default UserProfile;
