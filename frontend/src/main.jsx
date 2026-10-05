// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import LenisProvider from './components/LenisProvider'
import { Toaster } from 'react-hot-toast'

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LenisProvider>
        <App />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={10}
          toastOptions={{
            duration: 3000,
            className: ` !bg-[#0b0f10]/90 !text-white !border !border-white/[0.10] !rounded-2xl !px-4 !py-3 !shadow-[0_10px_40px_rgba(0,0,0,0.45)] !backdrop-blur-2xl !backdrop-saturate-150 !font-medium !text-sm`,
            success: { className: ` !bg-[#0b0f10]/90 !text-white !border !border-[#00FFFF]/20 !shadow-[0_10px_40px_rgba(0,0,0,0.45)] !backdrop-blur-2xl`,
              iconTheme: {
                primary: "#00FFFF",
                secondary: "#0b0f10",
              },
            },
            error: {
              className: ` !bg-[#0b0f10]/90 !text-white !border !border-red-400/20 !shadow-[0_10px_40px_rgba(0,0,0,0.45)] !backdrop-blur-2xl`,
              iconTheme: {
                primary: "#ff4d6d",
                secondary: "#0b0f10",
              },
            },
          }}
        />
      </LenisProvider>
    </PersistGate>
  </Provider>
)
