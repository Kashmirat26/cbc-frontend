import { Link, Routes } from "react-router-dom";
import Header from "../components/header";

export default function HomePage() {
    return (
        <div className="h-screen w-full bg-gray-200">
            <Header/>
           <Routes path="/"></Routes>
        </div>
    );
}