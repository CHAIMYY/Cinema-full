import { filmActions } from "../slices/filmSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";


export function fetchFilms (pageNumber) {
    return async (dispatch) => {
    try {
        const {data} = await request.get(`/api/films`);
        dispatch(profileActions.setProfile(data));
    } catch (error) {
        toast.error(error.response.data.message);
    }
};
}