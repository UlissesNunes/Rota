// src/contexts/AuthContext.tsx
import { createContext} from "react";
import { useAuthDomain } from "../domain/auth";

export const AuthContext = createContext<ReturnType<typeof useAuthDomain> | undefined>(undefined);





