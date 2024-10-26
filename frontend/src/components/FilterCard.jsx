import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
const filterData = [
  {
    filterType: "Location",
    array: ["Bắc Ninh", "Ha Noi", "HCM", "Da Nang", "Can Tho"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend",
      "Backend Developer",
      "Fullstack Developer",
      "Data Scientist",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-10tr", "10-20tr", "20-30tr", "30-40tr", "40-50tr"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
