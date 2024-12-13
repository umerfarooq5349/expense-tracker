import { useEffect, useState, useCallback } from "react";
import Transection from "../components/transectioncard";
import axios from "axios";
import toast from "react-hot-toast";

function Home() {
    const [transections, setTransections] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);

    // Fetch transactions
    const fetchTransections = useCallback(async () => {
        try {
            const response = await axios.get(
                // `${process.env.SERVER_URL}/transections`

                "https://expense-tracker-backend-gray-one.vercel.app/api/transections"
            );
            setTransections(response.data?.message || []);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error fetching transactions.",
                { position: "bottom-right" }
            );
        }
    }, []);

    // Fetch summary
    const fetchSummary = useCallback(async () => {
        try {
            const response = await axios.get("https://expense-tracker-backend-gray-one.vercel.app/api/transections/transectionSumary");
            setTotalExpense(response.data?.transection?.totalExpense || 0);
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Error fetching Expense.",
                { position: "bottom-right" }
            );
        }
    }, []);

    // Recalculate total expense after each transaction change
    // eslint-disable-next-line no-unused-vars
    const recalculateTotalExpense = () => {
        const total = transections
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + Number(t.amount), 0);
        setTotalExpense(total);
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchTransections();
        fetchSummary();
    }, [fetchTransections, fetchSummary]);

    // Update total expense and delete transaction
    const handleDeleteTransection = useCallback(async (id) => {
        try {
            await axios.delete(`https://expense-tracker-backend-gray-one.vercel.app/api/transections/${id}`);

            setTransections((prevTransactions) =>
                prevTransactions.filter((transection) => transection.id !== id)
            );

            // Re-fetch or recalculate total expense after deletion
            fetchSummary(); // Fetch the updated summary
            toast.success("Transaction deleted successfully", { position: "bottom-right" });
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error deleting transaction.",
                { position: "bottom-right" }
            );
        }
    }, [fetchSummary]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl p-8">
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-bold text-center text-yellow mb-8">
                        All Transactions
                    </h1>
                    <h1 className="text-2xl font-bold text-center text-yellow mb-8">
                        Total Spendings: {totalExpense}
                    </h1>
                </div>

                {transections.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {transections.map((transection) => (
                            <Transection
                                transection={transection}
                                key={transection.id}
                                onDelete={() => handleDeleteTransection(transection.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg">
                        No transactions available
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;
