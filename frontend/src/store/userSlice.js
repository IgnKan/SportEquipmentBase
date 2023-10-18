import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: -1,
        user: {},
        isLogged: false,
        equipmentForRent: {},
        booking: {},
        dataForChange: {},
        orderForChange: {}
    }, 
    reducers: {
        authorizeUser(state, action) {
            state.user = action.payload
            state.userId = action.payload.id
            state.isLogged = true
        },
        unauthorizeUser(state, action) {
            state.user = {}
            state.userId = -1
            state.isLogged = false
            state.equipmentForRent = {}
            state.booking = {}
        },
        setEquipmentForRent(state, action) {
            state.equipmentForRent = action.payload
        },
        setBooking(state, action) {
            state.booking = action.payload
        },
        updateUser(state, action){
            state.user = action.payload
        },
        setDataForChange(state, action){
            state.dataForChange = action.payload
        },
        setOrderForChange(state, action){
            state.orderForChange = action.payload
        }
    },
});

export const {authorizeUser, unauthorizeUser, setEquipmentForRent,  setBooking, updateUser, setDataForChange, setOrderForChange} = userSlice.actions;

export default userSlice.reducer;