export const cartReducer = (state = {cartItems: []} , action) => {
    
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const item = action.payload
            const itemExist = state.cartItems.find(x => x.product === item.product)

            if (itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => 
                        x.product === itemExist.product ? item : x
                    )
                }
            } else {
                return{
                    ...state,
                    cartItems: [...state.cartItems , item]
                }
            }

            case 'CART_REMOVE_ITEM':
                return{
                    ...state,
                    cartItems: state.cartItems.filter(x => x.product !== action.payload)
                }
               
        default:
            return state  
    }
}