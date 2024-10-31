// useGetAllUsers.js
import { setUsers } from "../redux/userSlice";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllUsers = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/getuser`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUsers(res.data.users));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [dispatch]);
};

export default useGetAllUsers;
