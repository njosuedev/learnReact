import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { SchoolsProvider } from './contexts/SchoolsContext.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StrictMode>
      <SchoolsProvider>
          <ProductsProvider>
            <App />
          </ProductsProvider>
      </SchoolsProvider>
    </StrictMode>
  </StrictMode>
)
