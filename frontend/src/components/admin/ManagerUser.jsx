// UserManager.js
import useGetAllUsers from "../../hook/useGetAllUsers";
import { setSearchUserByText } from "../../redux/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManagerAllUser from "./ManagerAllUser";

const ManagerUser = () => {
  useGetAllUsers();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchUserByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <div className="max-w-6xl mx-auto my-10">
        {/* <div className='flex items-center justify-between my-5'>
            <Input
              className="w-fit"
              placeholder="Filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={() => navigate("/admin/users/create")}>New User</Button>
          </div> */}
        <ManagerAllUser />
      </div>
    </div>
  );
};

export default ManagerUser;
