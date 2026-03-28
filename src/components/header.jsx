import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-gray-100 w-full h-[100px] relative flex items-center justify-center">
            <img src="/logo.png" className="cursor-pointer h-full rounded-full absolute left-[10px]"/>
            <div className="h-full flex items-center w-[500px] justify-between">
            <Link to="/" className="text-accent font-bold text-2xl hover:border-b border-b-accent">Home</Link>
            <Link to="/products" className="text-accent font-bold text-2xl hover:border-b border-b-accent">Products</Link>
            <Link to="/about" className="text-accent font-bold text-2xl hover:border-b border-b-accent">About</Link>
            <Link to="/contact" className="text-accent font-bold text-2xl hover:border-b border-b-accent">Contact</Link>
            </div>
        </header>
    );
}