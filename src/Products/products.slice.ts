import { createSlice, PayloadAction } from "@reduxjs/toolkit" // redux toolkit is the boss here
import { RootState } from "../store"

export interface Product {
    title: string;
    price: number;
    id: string;
}

const initialState: Product[] = [
    { title: "Escape From Tarkov", price: 60, id: "eft" },
    { title: "Hunt: Showdown", price: 70, id: "hunt" },
    { title: "Hell Let Loose", price: 55, id: "hll" },
]


// THE SLICE - a part of your entire redux state
const productsSlice = createSlice({
    name: "products", // for the dev tools
    initialState, // what your store's slice begins with

    // reducers are simply functions which return new state based on an action and its payload
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            return state.filter(product => product.id !== action.payload)
        }
    }
})
// THE SLICE

// exporting the slice's actions so we can dispatch them later in our components
export const { addProduct, removeProduct } = productsSlice.actions

// exporting necessary selectors
export const getProductsSelector = (state: RootState) => state.products

// exporting the reducer in order to bind it with the global state in the store.ts file
export default productsSlice.reducer