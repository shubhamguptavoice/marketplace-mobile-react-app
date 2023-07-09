const initialState = {
    buyerSeller: {}
};

function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'BUYER_SELLER':
            state.buyerSeller = action.payload;

            return { buyerSeller: state.buyerSeller };
            break;

        default:
            return state;
    }
}

export default rootReducer;
