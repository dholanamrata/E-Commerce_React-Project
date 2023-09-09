export const setProduct = (product)=>{
    return{
        type:"SET_PRODUCT",
        payload:product,
    }
}
export const selectProduct = (product)=>{
    return{
        type:"SELECT_PRODUCT",
        payload:product,
    }
}
export const filterProduct = (value)=>{
    return {
        type:"FILTER_PRODUCT",
        text:value
    }
}
export const removeProduct = (product)=>{
    return{
        type:"REMOVE_PRODUCT"
    }
}
export const addtoCart = (product)=>{
    return{
        type:"ADD_PRODUCT_TOCART" ,
        payload:product
    }
}
export const increaseItem = (id) => {
    return {
        type:"INCREASE_ITEM",
        payload:id
    }
}

export const decreaseItem = (id) => {
    return {
        type:"DECREASE_ITEM",
        payload:id
    }
}
export const authChecking = (flag)=>{
    console.log(flag)
    return {
        type:"LOGGED_IN",
        payload:flag
    }
}

export const removeCartItem = (id)=>{
    return {
        type:"REMOVE_TOCART",
        payload:id
    }
}