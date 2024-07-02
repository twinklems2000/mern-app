import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const result = await axios.post("http://localhost:9000/register", user);

      if (result?.data?.errors?.length > 0) {
        result?.data?.errors?.map((err) => {
          return toast.error(err?.msg);
        });
      } else {
        toast.success("User Register Successfully");
        navigate("/login");
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
        Sign Up 🔐
      </h1>
      <div className="flex flex-col">
        <label className="text-black-950 font-mono text-2xl mt-2">Name</label>
        <input
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          value={user.name}
          className="p-2 my-2 border-2 border-violet-500 rounded focus:outline-none focus:ring focus:ring-violet-400"
          placeholder="Name"
          type="text"
        />
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
          onClick={handleRegister}
          className="font-semibold focus:outline-none bg-violet-800 text-white rounded-lg p-2 font-sans my-4 hover:bg-inherit hover: outline-none hover:ring hover:ring-violet-400 hover:text-violet-900 hover:border-violet-800 hover:border-2"
        >
          Register
        </button>

        <p className="cursor-pointer" onClick={() => navigate("/login")}>
          Login
        </p>
      </div>
    </div>
  );
};

export default Register;
