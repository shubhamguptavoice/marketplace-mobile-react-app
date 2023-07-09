const initialState = {
    sold: {}
};

function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'ALL_SOLD_PRODUCTS':
            state.sold = action.payload;
            return { sold: state.sold };
            break;

        default:
            return state;
    }
}

export default rootReducer;
