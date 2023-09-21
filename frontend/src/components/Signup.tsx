import React, { useState } from "react";
import type { CascaderProps } from "antd";
import { BrowserRouter } from "react-router-dom";
import { useRouter } from "next/router";
import {
  Button,
  Form,
  Input,
  Select,
} from "antd";
import Link from "next/link";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup: React.FC = () => {
  const [form] = Form.useForm();
  const [userExists, setUserExists] = useState(false);

  const router = useRouter();
 const onFinish = async (values: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
 }) => {
  const { email, password, firstname, lastname } = values; // Extract email and password from form values

  // Make a POST request to the login URL with user credentials
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstname, lastname }),
    });
    console.log(response);
    if (response.ok) {
      // Handle successful login (e.g., redirect to dashboard)
      console.log("Signup successful");
      // redirect to home page
      router.push("/Loginpage");
    } else {
      // Handle failed login (e.g., display an error message)
      console.error("Signup failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

};
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="20">+20</Option>
        <Option value="1">+1</Option>
        <Option value="44">+44</Option>
        <Option value="52">+52</Option>
        <Option value="91">+91</Option>
        <Option value="86">+86</Option>
        <Option value="61">+61</Option>
        <Option value="81">+81</Option>
      </Select>
    </Form.Item>
  );
  const fixSelector = <Form.Item name="prefix" noStyle></Form.Item>;

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <div className="flex flex-col justify-center items-center h-[50%] bg-slate-50 bg-opacity-[0.9] rounded-xl shadow-lg w-[500px] m-auto mt-32">
      <div className="m-16">
        <nav className="icon">
          <img src="icon.ico"></img>
        </nav>
      </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        className="max-w-[600px]"
        scrollToFirstError
      >
        <Form.Item
          name="firstname"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input type="text" placeholder="Enter First Name" />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input type="text" placeholder="Enter Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password "
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
          // style={{ marginLeft: "-50px" }}
          className="-ml-14"
        >
          <Input.Password placeholder="Re-Enter Password" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{ width: "100%" }}
            placeholder="Enter Phone Number"
          />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="Select Your Gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item className="flex justify-center" {...tailFormItemLayout}>
            <Button className="bg-blue-500" type="primary" htmlType="submit">
              Register
            </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
