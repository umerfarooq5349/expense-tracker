import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { transectionSchema } from '../schema/transectionSchema';

const AddTransactionForm = () => {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(transectionSchema), // Use Zod for form validation
        mode: 'onBlur', // Validate on blur to show error when field is touched
    });

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            // Convert amount to a float before sending to the backend
            data.amount = parseFloat(data.amount);
            // Send data to your API
            await axios.post('http://localhost:8000/api/transections', { data });

            toast.success('Transaction added', { position: 'bottom-right' });
        } catch (error) {
            console.log(error);
            toast.error('Error adding transaction', { position: 'bottom-right' });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-3xl font-semibold text-center text-yellow mb-8">Add Transaction</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">

                    {/* Title */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-black font-semibold">Title</label>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="title"
                                    type="text"
                                    className="w-full p-4 border rounded-md focus:ring-2 focus:ring-green focus:outline-none shadow-sm hover:shadow-md focus:shadow-lg"
                                    placeholder="Enter transaction title"
                                />
                            )}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Amount */}
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-black font-semibold">Amount</label>
                        <Controller
                            name="amount"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    {...field}
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    className="w-full p-4 border rounded-md focus:ring-2 focus:ring-green focus:outline-none shadow-sm hover:shadow-md focus:shadow-lg"
                                    placeholder="Enter amount"
                                />
                            )}
                        />
                        {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">

                    {/* Category */}
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-black font-semibold">Category</label>
                        <Controller
                            name="category"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id="category"
                                    className="w-full p-4 border rounded-md focus:ring-2 focus:ring-green focus:outline-none shadow-sm hover:shadow-md focus:shadow-lg"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Food">Food</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Groceries">Groceries</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Health">Health</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Other">Other</option>
                                </select>
                            )}
                        />
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    {/* Type */}
                    <div className="mb-4">
                        <label className="block text-black font-semibold mb-2">Type</label>
                        <Controller
                            name="type"
                            control={control}
                            defaultValue="expense"
                            render={({ field }) => (
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        className={`py-2 px-4 rounded-md font-semibold shadow-md transition-all duration-300 ${field.value === 'expense' ? 'bg-green text-white' : 'bg-gray-300 text-black'}`}
                                        onClick={() => field.onChange('expense')}
                                    >
                                        Expense
                                    </button>
                                    <button
                                        type="button"
                                        className={`py-2 px-4 rounded-md font-semibold shadow-md transition-all duration-300 ${field.value === 'income' ? 'bg-green text-white' : 'bg-gray-300 text-black'}`}
                                        onClick={() => field.onChange('income')}
                                    >
                                        Income
                                    </button>
                                </div>
                            )}
                        />
                    </div>

                </div>

                <div className="mb-6">
                    {/* Date */}
                    <label htmlFor="date" className="block text-black font-semibold">Date</label>
                    <Controller
                        name="date"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                id="date"
                                type="datetime-local"
                                className="w-full p-4 border rounded-md focus:ring-2 focus:ring-green focus:outline-none shadow-sm hover:shadow-md focus:shadow-lg"
                            />
                        )}
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isValid} // Disable submit button when form is not valid
                    className={`w-full py-3 font-semibold rounded-md ${isValid ? 'bg-green text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} transition duration-300`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddTransactionForm;
