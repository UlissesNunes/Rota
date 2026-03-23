import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

type Errors = Partial<LoginFormData>;

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const validate = (data: LoginFormData): Errors => {
    const newErrors: Errors = {};

    if (!data.email) newErrors.email = "Informe seu email ou usuário.";

    if (!data.password) {
      newErrors.password = "Informe sua senha.";
    } else {
      if (data.password.length < 8)
        newErrors.password = "A senha deve ter no mínimo 8 caracteres.";
      if (!/[A-Za-z]/.test(data.password) || !/[0-9]/.test(data.password))
        newErrors.password = "A senha deve conter letras e números.";
    }

    return newErrors;
  };

  const handleChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Preparado para integração futura com API
      console.log("Login realizado:", formData);
    }
  };

  return { formData, errors, handleChange, handleSubmit };
}