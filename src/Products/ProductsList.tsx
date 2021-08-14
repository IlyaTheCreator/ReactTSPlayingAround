import { useSelector } from "react-redux"
import { getProductsSelector } from "./products.slice"

const ProductsList: React.FC = () => {
    const products = useSelector(getProductsSelector)

    const renderList = ():JSX.Element[] => products.map(product => (
        <div key={product.id}>
            <span>{`${product.title} : ${product.price}`}</span>
        </div>
    ))

    const handleClick = (): void => {
        // setProducts(prev => {
        //     return [...prev, { title: "Half Life", price: 99, id: "asdf" }]
        // })
    }

    return (
        <div>
            <h2>Games List</h2>
            {renderList()}

            <button onClick={handleClick}>Add Product</button>
        </div>
    )
}

export default ProductsList