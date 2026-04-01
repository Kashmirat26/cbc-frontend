import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import NavSlider from "./navSlider.jsx";

export default function Header() {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    return (
        <>
            {isSliderOpen&&<NavSlider closeSlider={()=>{setIsSliderOpen(false)}}/>}

            <header className="bg-gray-100 w-full h-[100px] relative flex items-center justify-center">
                <img src="/logo.png" className="cursor-pointer h-full rounded-full absolute left-[10px]" />
                <RxHamburgerMenu onClick={()=>{setIsSliderOpen(true)}} 
                className="text-3xl absolute cursor-pointer text-accent right-[10px] lg:hidden" />
                <div className="h-full items-center w-[500px] justify-between hidden lg:flex">
                    <Link to="/" className="text-accent font-bold text-2xl hover:border-b border-b-accent">Home</Link>
                    <Link to="/products" className="text-accent font-bold text-2xl hover:border-b border-b-accent">Products</Link>
                    <Link to="/about" className="text-accent font-bold text-2xl hover:border-b border-b-accent">About</Link>
                    <Link to="/contact" className="text-accent font-bold text-2xl hover:border-b border-b-accent">Contact</Link>
                    <Link to="/cart" className="text-accent font-bold text-2xl hover:border-b border-b-accent">Cart</Link>
                </div>
            </header>
        </>
    );
}