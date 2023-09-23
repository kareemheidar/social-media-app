import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Forgetpass = () => {
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);

  const onFinish = async (values: { email: string }) => {
    const { email } = values;
    console.log("EMAIL: " + email);

    try {
      const response = await fetch(
        "http://localhost:3000/auth/forgetpassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Email Sent!");
        setInvalid(false);
      } else {
        setInvalid(true);
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="loginbody">
      <div className="w-[350px] h-[500px] flex flex-col justify-center items-center bg-slate-50 bg-opacity-[0.9] rounded-xl shadow-lg m-auto mt-32">
        <div className="mb-16">
          <nav className="icon">
            <img src="icon.ico"></img>
          </nav>
        </div>
        <Form
          name="normal_login"
          className="loginform"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
          <div className="flex flex-row justify-center items-center mb-2">
            {invalid && <p className="text-red-500">Invalid email</p>}
          </div>
          <Form.Item>
            <div className="flex flex-col justify-center items-center">
              <Button
                type="primary"
                htmlType="submit"
                className="w-72 login-form-button rounded-xl bg-purple-900"
              >
                Send
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Forgetpass;
