import axios from "axios";
import { useEffect, useState } from "react";

export const Appbar = () => {
    const [firstName, setFirstName] = useState("");
    useEffect(() => {
        const fetchName = async () => {
            const res = await axios("http://localhost:3000/api/v1/user/me", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setFirstName(res.data.firstName);
        };
        fetchName();
    }, []);
    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PaytTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello {firstName}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {firstName?.[0]}
                    </div>
                </div>
            </div>
        </div>
    );
};
