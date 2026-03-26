import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {

  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  
  function login(){
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login",{
      email: email,
      password: password
    }).then(
      (res)=>{
        if(res.data.user==null){
          toast.error(res.data.message)
          return
        }
        localStorage.setItem("token", res.data.token)
        if(res.data.user.type=="admin"){
          window.location.href="/admin"
        }else{
          window.location.href="/"
        }
      })
  }

  return (
    <div className="flex justify-center items-center w-full h-screen bg-red-300">
      <div className="w-[450px] h-[450px] border border-black flex flex-col justify-center items-center">
        <img src="/logo.png" className="rounded-full w-[100px]"/>
        <br/> 
        <span>Email</span>
        <input defaultValue={email} onChange={
          (e)=>{
            setEmail(e.target.value)
          }
        }/>
        <br/>
        <span>Password</span>
        <input type="password" defaultValue={password} onChange={
          (e)=>{
            setPassword(e.target.value)
          }
        }/>
        <br/>
        <button onClick={login} className="bg-white">Login</button>
      </div>
    </div>

    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      
    //   <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        
    //     <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
    //       Welcome Back 👋
    //     </h1>

    //     <form className="space-y-4">
          
    //       <div>
    //         <label className="block text-sm text-gray-600 mb-1">
    //           Username
    //         </label>
    //         <input
    //           type="text"
    //           placeholder="Enter your username"
    //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-sm text-gray-600 mb-1">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           placeholder="Enter your password"
    //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
    //         />
    //       </div>

    //       <button
    //         type="submit"
    //         className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
    //       >
    //         Login
    //       </button>

    //     </form>

    //     <p className="text-sm text-gray-500 text-center mt-4">
    //       Don’t have an account?{" "}
    //       <span className="text-indigo-500 text-sm cursor-pointer hover:underline">
    //         Sign up
    //       </span>
    //     </p>

    //   </div>
  );
}