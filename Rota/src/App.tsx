
import './App.css'
import { AuthProvider } from './contexts/AuthProvider';


// src/App.tsx

import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}


