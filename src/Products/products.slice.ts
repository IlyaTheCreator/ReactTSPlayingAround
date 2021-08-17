import { createAsyncThunk, createSlice, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit" // redux toolkit is the boss here
import validateProduct from "../fake.api"
import { RootState } from "../store"

export interface Product {
    title: string;
    price: number;
    id: string;
}

export enum ValidationState {
    Fullfilled,
    Pending,
    Rejected
}

interface ProductSliceState {
    validationState?: ValidationState,
    errorMessage?: string
}

/* async stuff

   a thunk is a function which returns another asyncronous function.
   the first argument here is a typePrefix - (name of your slice)/(name of your actions) */
export const addProductAsync = createAsyncThunk("products/addNewProduct", async (initialProduct: Product) => {
    const product = await validateProduct(initialProduct)
    return product
})
// async stuff

const initialProducts: Product[] = [
    { title: "Escape From Tarkov", price: 60, id: "eft" },
    { title: "Hunt: Showdown", price: 70, id: "hunt" },
    { title: "Hell Let Loose", price: 55, id: "hll" },
]

const productAdapter = createEntityAdapter<Product>()
const initialState = productAdapter.getInitialState<ProductSliceState>({
    errorMessage: undefined,
    validationState: undefined
})

const filledInitialState = productAdapter.upsertMany(initialState, initialProducts)

// THE SLICE - a part of your entire redux state
const productsSlice = createSlice({
    name: "products", // for the dev tools
    initialState: filledInitialState, // what your store's slice begins with

    // reducers are simply functions which return new state based on an action and its payload
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            productAdapter.upsertOne(state, action.payload)
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            productAdapter.removeOne(state, action.payload)
        }
    },

    /* for async stuff 
       builder pattern is when in the end you have just an object but it's returned from a builder function conditionally */
    extraReducers: builder => {
        /* Any thunk we create has 3 ways of resolving an async action: pending, rejection and fulfilling
           builder pattern allows us to return a specific reducer which will fire when one of the 3 actions
           will trigger the slice's store and execute an operation based off of that action */
        builder.addCase(addProductAsync.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload)
            state.validationState = ValidationState.Fullfilled
            state.errorMessage = undefined
        })
        builder.addCase(addProductAsync.rejected, (state, action) => ({
            ...state,
            validationState: ValidationState.Rejected,
            errorMessage: action.error.message,
        }))
        builder.addCase(addProductAsync.pending, (state, action) => ({
            ...state,
            validationState: ValidationState.Pending,
            errorMessage: undefined,
        }))
    }
})
// THE SLICE

// exporting the slice's actions so we can dispatch them later in our components
export const { addProduct, removeProduct } = productsSlice.actions

// exporting necessary selectors
// export const getProductsSelector = (state: RootState) => state.products.entities
export const getErrorMessageSelector = (state: RootState) => state.products.errorMessage

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectEntities: selectProductEntities,
    selectIds: selectProductIds,
    selectTotal: selectTotalProducts
} = productAdapter.getSelectors<RootState>(state => state.products)

// exporting the reducer in order to bind it with the global state in the store.ts file
export default productsSlice.reducer