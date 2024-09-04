import React from "react";
import { View, Text, Modal, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useToast } from "react-native-toast-notifications";
import { UpdateUserData } from "services/userDataApi";
import { avatares } from "helper/index";


export default function AvatarModal({ userData, avatarModal, setAvatarModal }) {

  const dispatch = useDispatch();
  const toast = useToast();

  const [AvatarUrl, setAvatarUrl] = React.useState(null);
  const [Loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (avatares.includes(userData.avatar)) {
      setAvatarUrl(userData.avatar);
    }
  }, [userData.avatar]);

  const handleSeleccionarAvatar = (url) => {
    setAvatarUrl(url);
  };

  const updateAvatar = async () => {
    setLoading(true);

    try {
      await UpdateUserData({ avatar: AvatarUrl }, dispatch);
      toast.show('Avatar actualizado exitosamente', { type: "warning" });
    } catch (error) {
      console.log(error);
      toast.show('Ha ocurrido un error al actualizar los datos', { type: "danger" });
    } finally {
      setLoading(false);
    }
    setAvatarModal(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={avatarModal}>
      <View style={styles.infoModal}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Selecciona un avatar</Text>
              <Text style={styles.subtitle}>
                Puedes seleccionar un avatar de la lista para establecerlo como el avatar de tu cuenta Propital
              </Text>
            </View>

            <View style={styles.avatarGrid}>
              {avatares.map((url, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSeleccionarAvatar(url)}
                  style={[styles.avatarOption, AvatarUrl === url && styles.selectedAvatar]}
                >
                  <Avatar.Image size={55} source={{ uri: url }} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                style={styles.cancelButton}
                onPress={() => setAvatarModal(false)}
              >
                <Text style={styles.textCancel}>Cancelar</Text>
              </Button>

              <Button
                mode="contained"
                style={styles.saveButton}
                loading={Loading}
                onPress={updateAvatar}
              >
                <Text style={styles.textSave}>Guardar</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  infoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#0084FE',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#08164C',
    textAlign: 'center',
    marginTop: 10,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  avatarOption: {
    margin: 5,
    opacity: 0.4,
  },
  selectedAvatar: {
    opacity: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    borderColor: '#0084FE',
    borderWidth: 2,
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: '#0084FE',
    borderColor: '#0084FE',
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 5,
  },
  textCancel: {
    color: '#0084FE',
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  textSave: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
});
