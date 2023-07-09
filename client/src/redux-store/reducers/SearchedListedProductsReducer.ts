const initialState = {
    searchedItems: {}
};

function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'SEARCHED_LISTED_ITEMS':
            state.searchedItems = action.payload;

            return { searchedItems: state.searchedItems };
            break;

        default:
            return state;
    }
}

export default rootReducer;
