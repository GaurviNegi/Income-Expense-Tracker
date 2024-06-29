import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux"
import {QueryClient , QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import App from './App.jsx'
import { store } from './redux/store/store.js'
import './index.css'


const queryClient  =new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
