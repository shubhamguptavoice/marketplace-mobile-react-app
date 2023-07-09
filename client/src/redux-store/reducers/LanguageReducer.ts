const initialState = {
    languageTranslation: {}
};

function rootReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'LANGUAGE_TRANSLATION':
            state.languageTranslation = action.payload;
            return { languageTranslation: state.languageTranslation };
            break;

        default:
            return state;
    }
}

export default rootReducer;
