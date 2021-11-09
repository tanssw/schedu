import { SIGN_IN, UPDATE_DATA, TOGGLE_SETTING } from "../actions/userAction"

const initialState = {
    userData: {
        bussinessId: "62070077",
        firstName: "นายธนกานต์",
        lastName: "บุญมา",
        role: "student",
        contact: {
            email: "62070077@it.kmitl.ac.th",
            tel: "0808080808",
        },
        image: "https://lh3.googleusercontent.com/a/AATXAJwtwryT19EjwXDGUmiB_Y8C34GOlwfRu8S1dplb=s96-c",
        setting: {
            displayTel: true,
            weekendReceive: true,
            activeTime: {
                startAt: "8:30AM",
                endAt: "16:30AM",
            },
        },
    },
}

export default userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { userData: action.userData }
        case UPDATE_DATA:
            const newData = action.newData
            state.userData.firstName = newData.firstName
            state.userData.lastName = newData.lastName
            state.userData.contact.tel = newData.tel

            return { userData: state.userData }
        case TOGGLE_SETTING:
            const settings = action.setting
            if (settings.topic === "weekend")
                state.userData.setting.weekendReceive = settings.data
            else if (settings.topic === "phone")
                state.userData.setting.displayTel = settings.data
            return { userData: state.userData }
        default:
            return state
    }
}
