// src/utils/validation.ts
import type { FormData, Errors } from "../hooks/useAuthForm";

function normalize(data: FormData): FormData {
  return {
    email: data.email.trim(),
    password: data.password.trim(),
  };
}

export function validateAuth(data: FormData): Errors {
  const errors: Errors = {};
  const { email, password } = normalize(data);

  if (!email) {
    errors.email = "Informe seu email.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Formato de email inválido.";
    }
  }

  if (!password) {
    errors.password = "Informe sua senha.";
  } else {
    if (password.length < 8) {
      errors.password = "A senha deve ter no mínimo 8 caracteres.";
    }
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      errors.password = "A senha deve conter letras e números.";
    }
  }

  return errors;
}