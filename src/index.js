import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { MoralisProvider } from 'react-moralis'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <CookiesProvider>
    <React.StrictMode>
      <MoralisProvider
        appId='iTlBEgjbRVF5naFrm4X38bflVRfawttAMNaIriwc'
        serverUrl='https://dbrbjwyoat0c.bigmoralis.com:2053/server'
      >
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
        <App />
      </MoralisProvider>
    </React.StrictMode>
  </CookiesProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
