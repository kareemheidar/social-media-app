import React, { useState } from "react";
import type { CascaderProps } from "antd";
import { BrowserRouter } from "react-router-dom";
import { useRouter } from "next/router";
import { Button, Form, Input, Select } from "antd";
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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

      if (response.ok) {
        console.log("Signup successful");
        router.push("/Loginpage");
        setError(false);
      } else {
        console.error("Signup failed");
        const message = await response.text();
        const data = JSON.parse(message);
        setErrorMessage(data.message);
        setError(true);
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
    <div className="w-[500px] h-[550px] flex flex-col justify-center items-center bg-slate-50 bg-opacity-[0.9] rounded-xl shadow-lg m-auto mt-32">
      {" "}
      <div className="mb-16">
        <nav className="icon">
          <img src="icon.ico"></img>
        </nav>
      </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        className="flex flex-col justify-center items-center"
        scrollToFirstError
      >
        {/* <div className="flex flex-row justify-center items-center"> */}
        <Form.Item
          name="firstname"
          label="First Name"
          className=""
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input type="text" placeholder="First Name" className="w-64" />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last Name"
          className=""
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input type="text" placeholder="Last Name" className="w-64" />
        </Form.Item>
        {/* </div> */}
        <Form.Item
          name="email"
          label="E-mail"
          className=""
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
          <Input placeholder="Enter Email" className="w-64" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password "
          className=""
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Enter Password" className="w-64" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          className=""
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
        >
          <Input.Password placeholder="Re-Enter Password" className="w-64" />
        </Form.Item>

        {/* <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            placeholder="Enter Phone Number"
            className="w-64"
          />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="Select Your Gender" className="w-64">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item> */}
        <div className="flex flex-row justify-center items-center mb-2">
          {error && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <Form.Item
          className="flex justify-center -ml-10"
          {...tailFormItemLayout}
        >
          <Button className="bg-blue-500" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
