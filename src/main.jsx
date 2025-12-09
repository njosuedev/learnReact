import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { UsersProvider } from './contexts/UsersContext.jsx';
import { SchoolsProvider } from './contexts/SchoolsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StrictMode>
      <SchoolsProvider>
        <UsersProvider>
          <App />
        </UsersProvider>
      </SchoolsProvider>
    </StrictMode>
  </StrictMode>
)
