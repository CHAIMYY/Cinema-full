import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// login user
export function loginUser(user) {
    return async (dispatch) => {
        try {
            const res = await request.post("/api/auth/login", user);
            dispatch(authActions.login(res.data));
            localStorage.setItem("userInfo", JSON.stringify(res.data)); // Utilisez res.data ici
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };
}

