import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../logo.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { UserContext } from "../App";

interface IUserSchema {
  fullName: string;
  emailAddress: string;
  password: string;
}

const UserSchema = yup.object().shape({
  fullName: yup.string().min(5).max(32).required().label("Full Name"),
  emailAddress: yup.string().email().required().label("E-mail Address"),
  password: yup.string().min(5).max(16).required().label("Password"),
});

function Register() {
  const [ApiError, setApiError] = useState<string | null>(null);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<IUserSchema>({ mode: "onChange", resolver: yupResolver(UserSchema) });

  useEffect(() => {
    // Auto redirect to protected page if user already logged in. (P.S: It is better to do that on wrapper but I did here to add an useEffect example.)
    if (state?.isLoggedIn) {
      history.push("/");
    }
  }, [history, state?.isLoggedIn]);

  const onSubmit = async (formData: IUserSchema) => {
    let data = {
      fullName: formData.fullName,
      email: formData.emailAddress,
      password: formData.password,
    };
    try {
      let res = await axios.post("https://reqres.in/api/register", data);
      if (res.status === 200) {
        dispatch?.({ type: "SET_USER_LOGGED_IN", payload: { emailAddress: formData.emailAddress, isLoggedIn: true } });
      } else {
        setApiError("Error occurred please contact with administrator.");
      }
    } catch (err) {
      console.error(err);
      let e: AxiosError = err;
      if (e.isAxiosError) setApiError(e.response?.data?.error);
      else setApiError("Error occurred please contact with administrator.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen shadow-2xl min-h-web bg-half-baked">
      <div className="flex items-center justify-center w-11/12 overflow-hidden bg-white shadow-xl sm:w-1/2 lg:w-2/5 xl:w-5/6 xl:items-start xl:justify-start rounded-xl h-4/5 sm:h-3/4 xl:h-11/12 2xl:h-5/6">
        <div className="w-full px-4 pt-4 xl:px-8 xl:pt-8 2xl:pt-10 2xl:px-20 xl:w-2/5">
          <div className="flex items-center justify-center xl:justify-start">
            <img src={Logo} alt="react-logo" className="h-12" />
            <h1 className="mb-1 text-3xl font-bold text-gray-700">React</h1>
          </div>
          <div className="mt-10 lg:pl-4">
            <h1 className="hidden text-3xl font-bold text-gray-800 xl:block font-roboto">Wanna join us?</h1>
            <p className="hidden mt-4 text-gray-500 xl:block text-md">Fill the form below and signup now.</p>
          </div>
          <div className="mt-6 lg:pl-4 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="fullName" className="pl-1 text-xs font-bold text-gray-600 font-roboto">
                  Full Name
                </label>
                <input ref={register} name="fullName" type="text" placeholder="John Doe" className="block w-full p-2 mt-1 border border-gray-300 rounded-lg" />
                {errors?.fullName?.message && <p className="mt-1 text-sm text-red-700">{errors.fullName.message}</p>}
              </div>
              <div className="mt-5">
                <label htmlFor="emailAddress" className="pl-1 text-xs font-bold text-gray-600 font-roboto">
                  E-mail Address
                </label>
                <input ref={register} name="emailAddress" type="text" placeholder="example@example.com" className="block w-full p-2 mt-1 border border-gray-300 rounded-lg" />
                {errors?.emailAddress?.message && <p className="mt-1 text-sm text-red-700">{errors.emailAddress.message}</p>}
              </div>
              <div className="mt-5">
                <label htmlFor="password" className="pl-1 text-xs font-bold text-gray-600 font-roboto">
                  Password
                </label>
                <input ref={register} name="password" type="password" placeholder="*******" className="block w-full p-2 mt-1 border border-gray-300 rounded-lg" />
                {errors?.password?.message && <p className="mt-1 text-sm text-red-700">{errors.password.message}</p>}
              </div>
              <div className="mt-5">
                {ApiError && <p className="text-sm text-red-700 capitalize">{ApiError}</p>}
                <button className="w-full p-2 mt-2 text-lg font-medium text-white border rounded-lg bg-jewel hover:bg-keppel">Register</button>
              </div>
            </form>
            <button
              onClick={() => history.push("/login")}
              className="w-full p-2 mt-5 text-lg font-medium border-2 rounded-lg border-jwel text-jewel hover:bg-keppel hover:text-white"
            >
              Back
            </button>
          </div>
        </div>
        <div className="relative hidden h-full bg-cover bg-register xl:flex-1 xl:block">
          <span className="absolute bottom-0 right-0 hidden p-1 px-2 text-white rounded-l-lg xl:block bg-jewel">
            Photo by <a href="https://unsplash.com/@peter_mc_greats?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noreferrer">Pietro De Grandi</a> on{" "}
            <a href="https://unsplash.com/s/photos/landscape?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" target="_blank" rel="noreferrer">Unsplash</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
