import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../Products/products.slice";
import { RootState } from "../store";

export interface CartProduct extends Product {
    amount: number
}

const cartSlice = createSlice({
    name: "card",
    initialState: [] as CartProduct[],
    reducers: {
        addToCart: (state, action: PayloadAction<CartProduct>) => {
            // if a product is already select, increase the amount
            const existentProduct: CartProduct | undefined = state.find(product => product.id === action.payload.id)

            if (existentProduct) {
                return state.map(product => product.id === action.payload.id ? {...product, amount: product.amount + 1} : product)
            } else {
                state.push({...action.payload, amount: 1})
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const product: CartProduct | undefined = state.find(product => product.id === action.payload)

            if (product && product.amount > 1) {
                return state.map(product => product.id === action.payload ? {...product, amount: product.amount - 1} : product)
            } else if (product && product.amount === 1) {
                return state.filter(product => product.id !== action.payload)
            }
        }
    }
})

export const getCartSelector = (state: RootState) => state.cart
export const getTotalPrice = (state: RootState) => state.cart.reduce((acc, next) => acc += (next.amount * next.price), 0)

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer

