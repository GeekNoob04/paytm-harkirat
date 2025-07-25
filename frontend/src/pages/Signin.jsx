import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials"} />
                    <InputBox
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder={"harshitbudhraja0@gmail"}
                        label={"Email"}
                    />
                    <InputBox
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="123456"
                        label={"Password"}
                    />
                    <div className="pt-4">
                        <Button
                            onClick={async () => {
                                const res = await axios.post(
                                    "http://localhost:3000/api/v1/user/signin",
                                    {
                                        username,
                                        password,
                                    }
                                );
                                localStorage.setItem("token", res.data.token);
                                navigate("/dashboard");
                            }}
                            label={"Sign in"}
                        />
                    </div>
                    <BottomWarning
                        label={"Dont have an account?"}
                        buttonText={"Sign up"}
                        to={"/signup"}
                    />
                </div>
            </div>
        </div>
    );
};
