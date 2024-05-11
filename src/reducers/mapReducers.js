const initialState = {
    defaultCenter: { lat: 50.0786592, lng: 14.5223136 },
};

export const mapDefaultCenter = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
