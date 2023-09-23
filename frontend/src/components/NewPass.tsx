import { Alert, Button, Form, Input, Typography } from "antd";
import Layout from "antd/es/layout/layout";
import Link from "next/link";
import type { CascaderProps } from "antd";
import { BrowserRouter } from "react-router-dom";
import { useRouter } from "next/router";
import icon from "../../public/icon.ico";
import Image from "next/image";
import { useState } from "react";
import router from "next/router";

type Props = {
  token: string | string[] | undefined;
};

const NewPass = (props: Props) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onFinish = async (values: { password: string }) => {
    const { password } = values; // Extract email and password from form values

    // Make a POST request to the login URL with user credentials
    try { 
      const response = await fetch(
        `http://localhost:3000/auth/resetpassword/${props.token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Password Reset successful");
        setError(false);
        router.push("/Loginpage");
      } else {
        console.error("Password Reset failed");
        const message = await response.text();
        const data = JSON.parse(message);
        if (data.message.includes("Cannot POST")) {
          setErrorMessage("Invalid token!");
        } else {
          setErrorMessage(data.message);
        }
        setError(true);

      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  return (
    <div>
      <div className="w-[350px] h-[500px] flex flex-col justify-center items-center bg-slate-50 bg-opacity-[0.9] rounded-xl shadow-lg m-auto mt-32">
        <div className="mb-16">
          <nav className="icon">
            <Image src={icon} alt="logo"></Image>
          </nav>
        </div>

        <Form
          form={form}
          name="dependencies"
          autoComplete="off"
          style={{ maxWidth: 600 }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            className="flex flex-col "
            label="New Password:"
            name="password"
            rules={[
              { required: true, message: "Please enter your new password!" },
            ]}
          >
            <Input.Password placeholder="Enter New Password" />
          </Form.Item>

          {/* Field */}
            <div className="flex flex-row justify-center items-center mb-2">
              {error && <p className="text-red-500">{errorMessage}</p>}
            </div>
          <Form.Item className="flex justify-center">
              <Button
                className="bg-purple-900"
                type="primary"
                htmlType="submit"
                style={{ width: 200 }}
              >
                Confirm
              </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPass;
