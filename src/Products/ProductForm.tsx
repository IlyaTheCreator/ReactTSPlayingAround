import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../store.hooks"
import { addProductAsync, getErrorMessageSelector, Product } from "./products.slice"


const ProductForm: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        id: "",
        title: "",
        price: 0
    })

    const dispatch = useAppDispatch()
    const errorMessage = useAppSelector(getErrorMessageSelector)

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>): void => {
        setProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        dispatch(addProductAsync(product))

        setProduct({
            id: "",
            title: "",
            price: 0
        })
    }

    return (
        <>
            <h2>Add Game To The Store</h2>
            {errorMessage && <span>error: {errorMessage}</span>}
            <form onSubmit={handleSubmit}>
                <input
                    style={{
                        border: errorMessage ? "1px solid red" : "1px solid black"
                    }} 
                    type="text" 
                    placeholder="Game title" 
                    name="title" 
                    value={product.title}
                    onChange={handleChange}
                />
                <input
                    style={{
                        border: errorMessage ? "1px solid red" : "1px solid black"
                    }} 
                    type="number" 
                    placeholder="Price" 
                    name="price" 
                    value={product.price}
                    onChange={handleChange}
                />
                <input
                    style={{
                        border: errorMessage ? "1px solid red" : "1px solid black"
                    }} 
                    type="text" 
                    placeholder="Id" 
                    name="id" 
                    value={product.id}
                    onChange={handleChange}
                />
                <button   
                    type="submit"
                    style={{
                        backgroundColor: errorMessage ? "red" : "white"
                    }}
                >
                    Add product
                </button>
                {/* {
                    errorMessage ? (
                        <p style={{
                            background: "red",
                            color: "white",
                            padding: 7
                        }}>{errorMessage}</p>
                    ) : null
                } */}
            </form>
        </>
    )
}

export default ProductForm