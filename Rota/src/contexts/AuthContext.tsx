// src/contexts/AuthContext.tsx
import { createContext } from "react";
import { useAuthentic } from "../application/useAuthentic";

export const AuthContext = createContext<ReturnType<typeof useAuthentic> | null>(null);


