import useGetAllCompanies from "../../hook/useGetFullCompanies";
import { setSearchCompanyByText } from "../../redux/companySlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManagerAll from "./ManagerAll";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

const Manager = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <div className="max-w-6xl mx-auto my-10">
        {/* <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div> */}
        <ManagerAll />
      </div>
    </div>
  );
};

export default Manager;