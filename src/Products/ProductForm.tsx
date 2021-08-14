const ProductForm: React.FC = () => {
    return (
        <>
            <h2>Add Game To The Store</h2>
            <form>
                <input type="text" placeholder="Game title" name="title" />
                <input type="number" placeholder="Price" name="price" />
                <input type="text" placeholder="Id" name="id" />
                <button type="submit">Add price</button>
            </form>
        </>
    )
}

export default ProductForm