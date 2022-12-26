import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"

import productsReducer, { productsFetch } from './features/productsSlice';
import { productsApi } from './features/productsApi';
import cartReducer, { getTotals } from './features/cartSlice';

const store = configureStore({//combines different reducers and also automaticly configure redux dev tools
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),//add more api funtionality like cashing
});


store.dispatch(productsFetch())//dispatches action creator which will trigger createAsyncThunk to do the heavy lifting
store.dispatch(getTotals());//when the application loads it will dispatch getTotals

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

