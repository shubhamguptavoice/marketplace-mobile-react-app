const initialState = {
    listItems: {}
};

function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'Listing_ITEMS':
            state.listItems = action.payload;

            return { listItems: state.listItems };
            break;

        default:
            return state;
    }
}

export default rootReducer;
