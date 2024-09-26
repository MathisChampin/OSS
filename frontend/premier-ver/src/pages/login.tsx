import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
    email: string;
    password: string;
};

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-gray-600">Email:</label>
                        <input
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            type="email"
                            {...register('email', { required: "Email is required",
                                validate: (value) => {
                                    if (!value.includes('@')) {
                                        return 'Not a valid email';
                                    }
                                    return true;
                                }
                            })}
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500">{errors.email.message}</span>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-600">Password:</label>
                        <input
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            type="password"
                            {...register('password', {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                }
                            })}
                        />
                        {errors.password && (
                            <span className="text-sm text-red-500">{errors.password.message}</span>
                        )}
                    </div>
                    <input
                        type="submit"
                        value="Login"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
