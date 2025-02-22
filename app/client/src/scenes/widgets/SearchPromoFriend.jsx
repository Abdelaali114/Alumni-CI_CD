import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Loading from "./Loading";
import UserSearchCard from "./UserSearchCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";
import { useTheme } from "@mui/material/styles";
import { Dialog } from "@mui/material";

const SearchPromoFriend = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const theme = useTheme();

  const handleSearchUser = async () => {
    const URL = "http://app-server-1:3001/search/promo";
    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search: search,
      });
      setLoading(false);
      setSearchUser(response.data.data);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (search) {
      handleSearchUser();
    }
  }, [search]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <div>
        {/** Input search user */}

        <div
          style={{ backgroundColor: theme.palette.sidebar.background }}
          className=" rounded h-14 overflow-hidden flex border"
        >
          <input
            style={{ backgroundColor: theme.palette.sidebar.background }}
            type="text"
            placeholder="Search user by name, email...."
            className="w-full outline-none py-1 h-full px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <FaSearch size={25} />
          </div>
          <button
            className="hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-100 p-2"
            onClick={onClose}
          >
            <IoIosCloseCircle size={28} />
          </button>
        </div>

        {/** Display search user */}
        <div
          style={{ backgroundColor: theme.palette.sidebar.background }}
          className="mt-2 w-full p-4 rounded h-full max-h-[70vh] overflow-auto text-slate-400 scrollbar"
        >
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">no user found!</p>
          )}

          {loading && (
            <p>
              <Loading />
            </p>
          )}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return (
                <UserSearchCard key={user._id} user={user} onClose={onClose} />
              );
            })}
        </div>
      </div>
    </Dialog>
  );
};

export default SearchPromoFriend;
