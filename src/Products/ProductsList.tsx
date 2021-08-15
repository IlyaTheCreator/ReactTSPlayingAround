import { useAppSelector } from "../store.hooks"
import Product from "./Product"
import { getProductsSelector } from "./products.slice"

const ProductsList: React.FC = () => {
    const products = useAppSelector(getProductsSelector)

    const renderList = ():JSX.Element[] => products.map(product => {
        return (
            <Product 
                title={product.title} 
                price={product.price} 
                key={product.id} 
                id={product.id} 
            />
        )
    })

    return (
        <div>
            <h2>Games List</h2>
            {renderList()}
        </div>
    )
}

export default ProductsList