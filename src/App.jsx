import { useState } from 'react'
import './App.css';
import UserData from './components/UserData'
import AdminHomePage from "./pages/adminHomePage";
import LoginPage from './pages/loginPages'
import HomePage from './pages/homePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import FileUploadTest from './pages/test';
import ResponseTest from './pages/admin/responseTest';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' h-[100vh]'>
    <BrowserRouter>
    <Toaster position='top-right'/>
    <GoogleOAuthProvider clientId='968270244167-7tetimgel7o1s594vo8v4hcununfmeoc.apps.googleusercontent.com'>
      <Routes path="/*">
        <Route path="/*" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<UserData/>}/>
        <Route path="/admin/*" element={<AdminHomePage/>}/>
        <Route path='/response' element={<ResponseTest/>}/>
      </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
    {/* <Testing/> */}
    {/* <ProductCard name="Laptop" price="$99.99" src="https://stock.adobe.com/search?k=person"></ProductCard>
    <ProductCard name="Cooling Pad" price="$35.26"></ProductCard>
    <UserData></UserData> */}
    </div>
  )
}

export default App
