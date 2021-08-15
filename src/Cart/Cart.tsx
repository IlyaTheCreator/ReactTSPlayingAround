import { useAppSelector } from "../store.hooks"
import { getCartSelector, getTotalPrice } from "./cart.slice"
import CartProduct from "./CartProduct"

const Cart: React.FC = () => {
    const cart = useAppSelector(getCartSelector)
    const totalPrice = useAppSelector(getTotalPrice)

    const renderList = ():JSX.Element[] => cart.map(product => {
        return (
            <CartProduct
                title={product.title} 
                price={product.price} 
                key={product.id} 
                id={product.id} 
                amount={product.amount}
            />
        )
    })

    const renderTitle = ():JSX.Element | null => {
        if (cart.length !== 0) {
            return (
                <>
                    <h1>Cart:</h1>
                    <h2>Total Price: ${totalPrice}</h2>
                </>
            )
        } 

        return null
    }

    return (
        <div>
            {renderTitle()}
            {renderList()}
        </div>
    )
}

export default Cart