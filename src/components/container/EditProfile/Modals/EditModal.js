import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Modal, Title, TextInput, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { UpdateUserData } from 'services/userDataApi';
import { useToast } from 'react-native-toast-notifications';

const EditModal = ({
  visible,
  hideModal,
  editingField,
  fieldValue,
  setFieldValue,
}) => {

  const toast = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const updatedField = { [editingField.toLowerCase()]: fieldValue };

    try {
      await UpdateUserData(updatedField, dispatch);
      toast.show('Datos actualizados exitosamente', { type: "warning" });
    } catch (error) {
      toast.show('Ha ocurrido un error al actualizar los datos', { type: "danger" });
    }

    setLoading(false);
    hideModal();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <Title style={styles.title}>{`Editar ${editingField}`}</Title>
        <TextInput
          value={fieldValue}
          onChangeText={setFieldValue}
          style={styles.input}
          mode="outlined"
          outlineStyle={styles.customOutlineStyle}
        />
        <View style={styles.buttonContainer}>
          <Button loading={loading} mode="contained" onPress={handleSave} style={styles.button}>
            Save
          </Button>
          <Button mode="contained" onPress={hideModal} style={styles.button}>
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFFFFF', 
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
    color: '#F15A50', 
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF', 
    color: '#333333', 
  },
  customOutlineStyle: {
    borderColor: '#F15A50', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#F15A50',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#FFFFFF', 
  },
});

export default EditModal;
