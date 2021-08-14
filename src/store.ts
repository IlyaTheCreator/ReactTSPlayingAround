import { configureStore } from "@reduxjs/toolkit"
import products from "./Products/products.slice"

const store = configureStore({
    reducer: {
        products
    }
})

/*  RootState is a type of our global state (all slices put together) which we defined above.
    We need this type in one of the functions of the products slice (or any other slice added)
    to get the store data ( (store: RootStore) => store.products )

    We could simply hover over the store variable and get this: 

    const store: EnhancedStore<{
        products: Product[];
    }, AnyAction, [ThunkMiddleware<{
        products: Product[];
    }, AnyAction, null> | ThunkMiddleware<{
        products: Product[];
    }, AnyAction, undefined>]>

    But it's not dinamic and therefore is not suitable for our needs.
    Here we use the ReturnType type which is a utility type of typescript which was created to 
    retrieve a type of what a function returns.

    There are two ways of retrieving a type from a function:
    1. When it's an anonimous function:
    type T1 = ReturnType<() => "hello"> // T1 = "hello"
    type T2 = ReturnType<(() => string)> // T2 = string

    2. When it's a function in a variable:
    function myFunc(): { a: string, b: number } {
        return { "abc", 123 }
    }

    type T3 = ReturnType<typeof myFunc> // T3 = { a: string, b: number }
    ____________________________________________________________________________

    If we would just write:
    export type RootState = typeof store.getState 
    then we would get a type of the store.getState function itself, i.e type of the function (e.g () => {products: Product[]} )
    But, again, we need a type of what is RETURNED by that function. Here's why we typed what we typed.

    ReturnType does not accept a function. It accepts a function type.
*/
export type RootState = ReturnType<typeof store.getState>

export default store