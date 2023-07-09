const initialState = {
    register: {}
};

function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'REGISTER_USER_RES':
            state.register = action.payload;

            return { register: state.register };
            break;

        default:
            return state;
    }
}

export default rootReducer;
