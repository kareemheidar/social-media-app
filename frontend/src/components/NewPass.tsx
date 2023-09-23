import { Alert, Button, Form, Input, Typography } from "antd";
import Layout from "antd/es/layout/layout";
import Link from "next/link";
import type { CascaderProps } from "antd";
import { BrowserRouter } from "react-router-dom";
import { useRouter } from "next/router";

type Props = {
  token: string | string[] | undefined;
};

const NewPass = (props: Props) => {
  const [form] = Form.useForm();
  return (
    <div>
      <div className="w-[350px] h-[500px] flex flex-col justify-center items-center bg-slate-50 bg-opacity-[0.9] rounded-xl shadow-lg m-auto mt-32">
        <div className="mb-16">
          <nav className="icon">
            <img src="icon.ico"></img>
          </nav>
          <h1>{props.token}</h1>
        </div>

        <Form
          form={form}
          name="dependencies"
          autoComplete="off"
          style={{ maxWidth: 600 }}
          layout="vertical"
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

          <Form.Item className="flex justify-center">
            <Link href="/Loginpage">
              <Button
                className="bg-purple-900"
                type="primary"
                htmlType="submit"
                style={{ width: 200 }}
              >
                Confirm
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPass;
