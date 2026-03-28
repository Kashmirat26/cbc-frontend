import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ProductNotFound() {

    const navigate = useNavigate();

    return (
        <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">

            <div className="text-center max-w-lg">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100 text-red-500 p-5 rounded-full text-4xl">
                        <FaExclamationTriangle />
                    </div>
                </div>

                
                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                  404 - Product Not Found
                </h1>

            
                <p className="text-gray-500 mb-8">
                    The product you're looking for doesn’t exist or may have been removed.
                </p>

                {/* Buttons */}
                <div className="flex gap-4 justify-center flex-wrap">

                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-xl 
                        hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                        Go Back
                    </button>

                </div>

            </div>
        </div>
    );
}