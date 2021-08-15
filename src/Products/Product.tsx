import { addToCart, CartProduct } from "../Cart/cart.slice"
import { useAppDispatch } from "../store.hooks"
import { Product as IProduct, removeProduct } from "./products.slice"


const Product: React.FC<IProduct & { key: string }> = ({ title, price, id }) => {
    const dispatch = useAppDispatch()

    const removeProductHandler = (id: string): void => {
        dispatch(removeProduct(id))
    }

    const addProductHandler = (): void => {
        const product: CartProduct = {
            title,
            price,
            id,
            amount: 1
        }

        dispatch(addToCart(product))
    }

    return (
        <div>
            <span>{title}: ${price}</span>
            <button onClick={() => removeProductHandler(id)}>remove</button>
            <button onClick={addProductHandler}>add to cart</button>
        </div>
    )
}

export default Product