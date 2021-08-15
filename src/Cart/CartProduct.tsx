import { useAppDispatch } from "../store.hooks"
import { CartProduct as ICartProduct, removeFromCart } from "./cart.slice"


const CartProduct: React.FC<ICartProduct & { key: string }> = ({ title, price, id, amount }) => {
    const dispatch = useAppDispatch()

    const removeFromCartHandler = (id: string): void => {
        dispatch(removeFromCart(id))
    }

    return (
        <div>
            <h2>
                {title}
                <span> | amount: {amount}</span>
                <span> | price: ${price * amount}  </span>
                <button onClick={() => removeFromCartHandler(id)}>Delete</button>
            </h2>
        </div>
    )
}

export default CartProduct