"use client";
import Container from "@/componets/Container";
import { AuthContext } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import useAuthentication from "@/Utility/UseAuthentication";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoLogIn } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const { user: users } = useAuthentication();
  const [theme, setTheme] = useState("light");
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const logoutUser = () => {
    handleLogout()
      .then(() => {
        localStorage.removeItem("authToken");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successful!",
          showConfirmButton: false,
          timer: 1000,
        });
        router.push("/login");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };
  const links = (
    <>
      <li className="mr-4">
        <Link
          href="/"
          className={`${pathname === "/" && " font-bold text-primary"}`}
        >
          Home
        </Link>
      </li>
      <li className="mr-4">
        <Link
          href="/be-doners"
          className={`${
            pathname === "/be-doners" && " font-bold text-primary"
          }`}
        >
          Be a Doner
        </Link>
      </li>
      <li className="mr-4">
        <Link
          href="/search-doners"
          className={`${
            pathname === "/search-doners" && " font-bold text-primary"
          }`}
        >
          Search Doners
        </Link>
      </li>

      {!users && (
        <li className="mr-4">
          <Link
            href="/register"
            className={`${
              pathname === "/register" && " font-bold text-primary"
            }`}
          >
            Register
          </Link>
        </li>
      )}
      {users && (
        <>
          <li className="mr-4">
            <Link
              href="/profile"
              className={` ${
                pathname === "/profile" && " font-bold text-primary"
              }`}
            >
              Profile
            </Link>
          </li>
          <li className="mr-4">
            <Link
              href="/manage-doners"
              className={` ${
                pathname === "/manage-doners" && " font-bold text-primary"
              }`}
            >
              Manage Doners
            </Link>
          </li>
        </>
      )}

      <li>
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultValue={theme}
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </li>
    </>
  );
  return (
    <div className="bg-base-100 shadow-md fixed w-full top-0 z-20 md:px-0 px-1">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Link
              href={"/"}
              className="btn btn-ghost md:text-lg text-primary font-bold"
            >
              <img
                className="h-8"
                src="https://img.icons8.com/bubbles/100/drop-of-blood.png"
                alt=""
              />
              Doner Point
            </Link>
          </div>

          <div className="navbar-end gap-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            {user ? (
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 border-2 border-gray-300 rounded-full">
                    <img
                      src={
                        user?.photoURL || "https://i.ibb.co.com/ZzPzgRXS/2.png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <div className=" pb-3 border-b border-b-gray-200">
                    <li className="text-sm font-bold">{user.displayName}</li>
                    <li className="text-xs">{user.email}</li>
                  </div>
                  <li className="mt-3">
                    <Link href={"/profile"}>
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutUser}
                      className="btn-xs bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105"
                    >
                      <LuLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                href={"/login"}
                className="btn btn-sm bg-primary rounded-md shadow-md hover:bg-black transition-transform hover:scale-105  text-white"
              >
                {" "}
                <IoLogIn /> Login
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
