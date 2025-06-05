// ProfileSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";

const ProfileSlice = createSlice({
    name: "profile",
    initialState: {},
    reducers: {
        setProfile: (state, action) => {
            state = action.payload;
            return state;
        },
        changeProfile: (state, action) => {
            state = updateProfile(action.payload);
            return action.payload;
        },
    },
});

export const { setProfile, changeProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
