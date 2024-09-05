import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Image, StatusBar } from "react-native";
import { TextInput, Text, Button, Modal, Portal } from "react-native-paper"; 
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import icon from '../../assets/icon.png';
import { useToast } from "react-native-toast-notifications";
import { inputSignIn } from "./inputs";
import { SignIn } from "services/userDataApi";

import WelcomeScreen from "./TermsModal";

const SignInComponent = ({ navigation }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false); 

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const { username, password } = watch();

  useEffect(() => {
    const checkTermsAccepted = async () => {
      const termsAccepted = await AsyncStorage.getItem('termsAccepted');
      if (termsAccepted !== 'true') {
        setShowModal(true);
      }
    };
    checkTermsAccepted();
  }, []);



  const onSignIn = async () => {
    setLoading(true);
    try {
      await SignIn(username, password);
      toast.show("¡Bienvenido a GlobalChat!", { type: "warning" });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Container' }],
      });
      
    } catch (error) {
      toast.show(error.message, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: '100%' }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <StatusBar barStyle="light-content" backgroundColor="#F15A50" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={icon} style={styles.logo} />
        </View>

        {inputSignIn?.map((field) => (
          <Controller
            key={field.name}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  error={errors[field.name]}
                  mode="outlined"
                  label={field.title}
                  secureTextEntry={field.name === "password" && !isPasswordVisible}
                  value={value}
                  onChangeText={onChange}
                  theme={{
                    colors: {
                      onSurfaceVariant: '#F15A50',
                      primary: '#F15A50'
                    }
                  }}
                  left={
                    <TextInput.Icon
                      icon={field.icon}
                      color={"#F15A50"}
                    />
                  }
                  right={
                    field.name === "password" && (
                      <TextInput.Icon
                        color={isPasswordVisible ? "#F15A50" : "black"}
                        size={20}
                        icon={"eye"}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    )
                  }
                  outlineStyle={styles.customOutlineStyle}
                />
                {field.name !== "terms" && error && (
                  <Text style={styles.errortext}>{error.message}</Text>
                )}
              </View>
            )}
            name={field.name}
            rules={{
              required: field.required && "Este campo es requerido.",
              pattern: field.pattern && {
                value: field.pattern,
                message: field.errorMessage,
              },
            }}
          />
        ))}

        <Button
          style={styles.surfaceButton}
          icon={"login"}
          loading={loading}
          onPress={handleSubmit(onSignIn)}
          labelStyle={styles.labelStyle}
        >
          Iniciar sesión
        </Button>

        <TouchableOpacity style={{ width: '100%' }}>
          <Text style={styles.forgetText}>
            ¿Olvidaste tu contraseña?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgetText}>
            ¿No tienes una cuenta?{" "}
            <Text style={{ ...styles.registerButton, color: "#F15A50" }}>Registrate</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Portal>
        <Modal
          visible={showModal}
          contentContainerStyle={styles.modalContainer}>
          <WelcomeScreen setShowModal={setShowModal} />
        </Modal>
      </Portal>

    </KeyboardAvoidingView>
  );
};

export default SignInComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#E9EBF2'
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  logoContainer: {
    width: "100%",
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: "80%",
    marginVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    margin: 10,
    shadowColor: "#ff6563",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  surfaceButton: {
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#F15A50",
    borderRadius: 20,
  },
  registerButton: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: "#0085ff",
  },
  forgetText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
  errortext: {
    marginTop: 3,
    width: "100%",
    fontFamily: 'Poppins-SemiBold',
    color: "red",
  },
  labelStyle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold'
  },
  customOutlineStyle: {
    padding: 20,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#F15A50',
    borderRadius: 10,
  },
  modalButtonLabel: {
    color: 'white',
    fontSize: 16,
  }
});
