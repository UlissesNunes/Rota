// src/hooks/useAuthForm.ts
import { useState, useRef } from "react";
import type { AuthResponse } from "@supabase/supabase-js";

export type FormData = {
  email: string;
  password: string;
};

export type Errors = Partial<FormData>;

export type SubmitResult = {
  success: boolean;
  data?: AuthResponse;
  error?: {
    type: "credentials" | "network" | "unexpected";
    message: string;
  };
};

type UseAuthFormProps = {
  initialValues?: FormData;
  onSubmit: (data: FormData) => Promise<AuthResponse>;
  validate: (data: FormData) => Errors;
};

export function useAuthForm({ initialValues, onSubmit, validate }: UseAuthFormProps) {
  const [formData, setFormData] = useState<FormData>(
    initialValues ?? { email: "", password: "" }
  );
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [operationError, setOperationError] = useState<SubmitResult["error"] | null>(null);

  // 🔒 Evita múltiplos submits simultâneos
  const activeRequest = useRef<Promise<SubmitResult> | null>(null);

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Revalida ou limpa erro ao digitar
      if (errors[field]) {
        const newErrors = validate({ ...formData, [field]: value });
        setErrors(newErrors);
      }
    };

  const handleSubmit = async (): Promise<SubmitResult> => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setOperationError(null);

    if (Object.keys(validationErrors).length > 0) {
      return {
        success: false,
        error: { type: "credentials", message: "Dados inválidos." },
      };
    }

    // Bloqueia múltiplos submits simultâneos
    if (activeRequest.current) {
      return activeRequest.current;
    }

    setLoading(true);
    const request = (async (): Promise<SubmitResult> => {
      try {
        const result: AuthResponse = await onSubmit(formData);

        if (result.error) {
          const errorObj: SubmitResult["error"] = {
            type: result.error.status === 400 ? "credentials" : "unexpected",
            message: result.error.message,
          };
          setOperationError(errorObj);
          return { success: false, error: errorObj };
        }

        return { success: true, data: result };
      } catch (err: unknown) {
        const errorObj: SubmitResult["error"] = {
          type: "network",
          message: err instanceof Error ? err.message : "Erro de rede.",
        };
        setOperationError(errorObj);
        return { success: false, error: errorObj };
      } finally {
        setLoading(false);
        activeRequest.current = null;
      }
    })();

    activeRequest.current = request;
    return request;
  };

  return {
    formData,
    errors,
    loading,
    operationError,
    handleChange,
    handleSubmit,
  };
}
