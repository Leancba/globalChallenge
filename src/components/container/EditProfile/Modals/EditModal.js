import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Modal, Title, TextInput, Button } from 'react-native-paper';

const EditModal = ({
  visible,
  hideModal,
  editingField,
  fieldValue,
  setFieldValue,
  handleSave,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        <Title style={styles.title}>{`Edit ${editingField}`}</Title>
        <TextInput
          value={fieldValue}
          onChangeText={setFieldValue}
          style={styles.input}
          mode="outlined"
          outlineStyle={styles.customOutlineStyle}
        />
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSave} style={styles.button}>
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
    backgroundColor: '#028ab9',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  customOutlineStyle: {
    borderColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#00749c',
  },
});

export default EditModal;
