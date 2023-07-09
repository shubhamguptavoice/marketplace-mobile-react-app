const initialState = {
    login: {}
};

function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'LOGIN_USER':
            state.login = action.payload;

            return { login: state.login };
            break;

        default:
            return state;
    }
}

export default rootReducer;
