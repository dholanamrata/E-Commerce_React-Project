// const initialState = {
//     product : []
// }

const productListReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_PRODUCT":
        return [...action.payload];
      default:
        return [...state];
    }
  };
  
  const selectedProductReducer = (state = {}, action) => {
    switch (action.type) {
      case "SELECT_PRODUCT":
        return { ...action.payload };
      default:
        return state;
    }
  };

  const addToCartReducer = (state = [], action) => {
    console.log(action)
    switch (action.type) {
      case "ADD_PRODUCT_TOCART":
        return [...state, action.payload];
      case "REMOVE_TOCART":
        return state.filter((product) => product.id !== parseFloat(action.payload) );
      case "INCREASE_ITEM":
        return state.map((product) => {
          if (product.id === parseFloat(action.payload)) {
            return { ...product, Quantity: product.Quantity + 1 };
          }
          return product;
        });
        case "DECREASE_ITEM":
          return state.map((product) => {
            if (product.id === parseFloat(action.payload)) {
              return { ...product, Quantity: product.Quantity - 1 };
            }
            return product;
          });
      default:
        return state;
    }
  };
  
  const productreducer = {
    productListReducer,
    selectedProductReducer,
    addToCartReducer,
  };
  
  
  export default productreducer;