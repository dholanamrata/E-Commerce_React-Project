export const setProduct = (product)=>{
    return{
        type:"SET_PRODUCT",
        paylode:product,
    }
}
export const selectProduct = (product)=>{
    return{
        type:"SELECT_PRODUCT",
        paylode:product,
    }
}
export const removeProduct = (product)=>{
    return{
        type:"REMOVE_PRODUCT"
    }
}