import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [disable, setDisable] = useState();

  useEffect(() => {
    if (user.email === "" || user.password === "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      const result = await axios.post("http://localhost:9000/login", user);

      if (result?.data?.errors?.length > 0) {
        result?.data?.errors?.map((err) => {
          return toast.error(err?.msg);
        });
      } else {
        toast.success("User Logged In Successfully");
        navigate("/home");
      }
    } catch (error) {
      console.log("error", error);
      error?.response?.data?.errors?.map((err) => {
        return toast.error(err?.msg);
      });
    } finally {
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-black-950 font-semibold font-mono text-4xl mb-8">
        Log In 🔐
      </h1>
      <div className="flex flex-col">
        <label className="text-black-950 font-mono text-2xl mt-2">Email</label>
        <input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          className="p-2 my-2 border-2 border-violet-500 rounded focus:outline-none focus:ring focus:ring-violet-400"
          placeholder="Email"
          type="text"
        />
        <label className="text-black-950 font-mono text-2xl mt-2">
          Password
        </label>
        <input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          className="p-2 my-2 border-2 border-violet-500 rounded focus:outline-none focus:ring focus:ring-violet-400"
          placeholder="Password"
          type="password"
        />
        <button
          type="submit"
          onClick={handleLogin}
          disabled={disable}
          className={
            !disable
              ? "bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 my-4 rounded-full cursor-pointer"
              : "bg-indigo-500 text-white  py-2 px-4 my-4 rounded-full opacity-90 cursor-not-allowed"
          }
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
