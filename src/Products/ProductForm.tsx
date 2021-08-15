import { useState } from "react"
import { useAppDispatch } from "../store.hooks"
import { addProduct, Product } from "./products.slice"


const ProductForm: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        id: "",
        title: "",
        price: 0
    })

    const dispatch = useAppDispatch()

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>): void => {
        setProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        dispatch(addProduct(product))

        setProduct({
            id: "",
            title: "",
            price: 0
        })
    }

    return (
        <>
            <h2>Add Game To The Store</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Game title" 
                    name="title" 
                    value={product.title}
                    onChange={handleChange}
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    name="price" 
                    value={product.price}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Id" 
                    name="id" 
                    value={product.id}
                    onChange={handleChange}
                />
                <button type="submit">Add price</button>
            </form>
        </>
    )
}

export default ProductForm