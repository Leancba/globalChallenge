
export const inputSignIn = [
    {
      type: "text",
      name: "username",
      title: "Email",
      icon:'email',
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Ingrese una dirección de correo electrónico válida"
    },
    {
      type: "text",
      name: "password",
      title: "Contraseña",
      icon:'onepassword',
      required: true
    },
  ];