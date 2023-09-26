import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { isWhiteSpaceLike } from "typescript";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

// define the payload interface
interface Payload {
  token: string;
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const [invalid, setInvalid] = useState(false);
  // create state for the token to store it in local storage
  const [payload, setPayload] = useState({} as Payload);

  // useEffect(() => {
  //   fetch("http://localhost:3000/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setData(data);
  //     });
  // }, []);

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values; // Extract email and password from form values


    // Make a POST request to the login URL with user credentials
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      if (response.ok) {
        console.log("Login successful");
        let res = await response.text();
        console.log("PAYLOAD: " + res);
        setPayload(JSON.parse(res));
        // save payload in local storage
        localStorage.setItem("payload", res);
        router.push("/Home");
        setInvalid(false);
      } else {
        // Handle failed login (e.g., display an error message)
        setInvalid(true);
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="loginbody">
      <div className="w-[350px] h-[500px] flex flex-col justify-center items-center bg-slate-50 bg-opacity-[0.9] rounded-xl shadow-lg m-auto mt-32">
        {" "}
        <div className="mb-16">
          <nav className="icon">
            <img src="icon.ico"></img>
          </nav>
        </div>
        <Form
          name="normal_login"
          className="loginform"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your E-mail!" }]}
          >
            <Input
              className="w-72"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              className="w-72"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="forgetpass ">
            <Link href={"/forgetpasspage"}>Forgot password?</Link>
          </Form.Item>
          {/* <Form.Item className='flex flex-col justify-center'>

                        <a className="login-form-forgot, flex-auto , justify-center" href="">
                            Forgot password
                        </a>
                    </Form.Item> */}

            <div className="flex flex-row justify-center items-center mb-2">
              {invalid && (
                <p className="text-red-500">Invalid email or password</p>
              )}
            </div>
          <Form.Item>
            <div className="flex flex-col justify-center items-center">
              <Button
                type="primary"
                htmlType="submit"
                className="w-44 login-form-button rounded-xl bg-blue-500"
                onClick={() => {}}
              >
                LogIn
              </Button>
              <Link className="font mb-16" href="/Signuppage">
                Or register now!
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
