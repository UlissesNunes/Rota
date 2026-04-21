

import './App.css'
import { AuthProvider } from './contexts/AuthProvider';
import { EmpresaProvider } from './contexts/EmpresaProvider';

// src/App.tsx

import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
       <EmpresaProvider>
      <AppRoutes />
    </EmpresaProvider>
    </AuthProvider>
  );
}