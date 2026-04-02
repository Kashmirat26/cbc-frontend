import { Link } from "react-router-dom"

export default function ProductCard(props) {
    console.log(props)
    return (
        <Link to={`/productInfo/${props.product.productId}`} className="w-[300px] h-[500px] m-[10px] rounded-xl shadow-lg 
            shadow-gray-500 hover:shadow-white hover:border-[3px] 
            overflow-hidden flex flex-col">
                <img src={props.product.images[0]}
                    className="h-[65%] w-full object-cover" />
                <div className="max-h-[35%] h-[35%] p-4 flex flex-col justify-between">
                    <h1 className="text-2xl font-bold text-center text-accent">{props.product.productName}</h1>
                    <h2 className="text-lg text-gray-500 text-center">{props.product.productId}</h2>
                    <p className="text-left text-lg font-semibold">LKR. {props.product.lastPrice.toFixed(2)}</p>
                    {
                        (props.product.lastPrice < props.product.price)&&
                        <p className="text-left text-lg font-semibold line-through text-gray-500">
                            LKR. {props.product.price.toFixed(2)}</p>
                    }
                </div>
        </Link>
    )
}