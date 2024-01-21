import { configureStore, createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { appReducer } from "./Redux/reducers";
import ls from "localstorage-slim";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
 
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, appReducer)
 

  const store = createStore(persistedReducer);  
  let persistor = persistStore(store)




export const Redux = ({ children }) => {
  return <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
     {children}
      </PersistGate>
    
    
    </Provider>;
};
