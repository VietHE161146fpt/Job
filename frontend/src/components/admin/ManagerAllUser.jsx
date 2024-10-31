// UserManagerAll.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

const ManagerAllUser = () => {
  const { users, searchUserByText } = useSelector((store) => store.user);
  const [filterUser, setFilterUser] = useState(users);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredUser =
      users.length >= 0 &&
      users.filter((user) => {
        if (!searchUserByText) {
          return true;
        }
        return user?.fullname
          ?.toLowerCase()
          .includes(searchUserByText.toLowerCase());
      });
    setFilterUser(filteredUser);
  }, [users, searchUserByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of all registered users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Profile Photo</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterUser?.map((user) => (
            <tr key={user._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.profile.profilePhoto} />
                </Avatar>
              </TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/users/${user._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManagerAllUser;
