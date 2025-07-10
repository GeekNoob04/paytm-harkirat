import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        const fetchBalance = async () => {
            const res = axios("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setBalance(res.data.balance);
        };
        fetchBalance();
    }, []);
    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </div>
    );
};
