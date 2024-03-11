import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {instance} from "../../utils/axios/AxiosConfig";

const AdminLogin = () => {
    const [loginMessage, setLoginMessage] = useState("")
    const navigate = useNavigate();

    const {register,
        handleSubmit,
        formState:{errors}} = useForm({

    })

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const mySubmit = async (data) => {
        console.log("userData ",data)
        try {
            const response = await instance.post("/admin/login", {"email": data.email,  "password": data.password})
            console.log("response ", await response)
            setLoginMessage(await response.data.message)
            sessionStorage.setItem("ADMIN_TOKEN",  response.data.token)
            sessionStorage.setItem("ADMIN_LOGIN",  response.data.userLogin)
            sessionStorage.setItem("ADMIN_EMAIL",  response.data.userEmail)
            await sleep(2000)
            navigate("/admin/artists")
            setLoginMessage("")
        } catch (error) {
            setLoginMessage(await error.response.data.message)
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Admin Login
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(mySubmit)} noValidate>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    {...register("email",{required: true})}
                                    type="email"
                                    name="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    {...register("password", {required: true})}
                                    type="password"
                                    name="password"
                                    autoComplete="on"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            <p className="w-full text-amber-600">
                                {loginMessage}
                            </p>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;