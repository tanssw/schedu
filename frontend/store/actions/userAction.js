export const SIGN_IN = "SIGN_IN";
export const UPDATE_DATA = "UPDATE_DATA";

export const signIn = (userData) => {
    return { type: SIGN_IN, userData };
};

export const updateData = (newData) => {
    return { type: UPDATE_DATA, newData };
};
