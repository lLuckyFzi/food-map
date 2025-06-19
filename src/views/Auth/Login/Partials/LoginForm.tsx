"use client";

import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Form, Input, message, Spin, Typography } from "antd";

import { auth } from "@aroma/lib/firebase";
import { signInWithGoogleAndSyncUser } from "@aroma/services/firebase-auth";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).finally(() => setIsLoading(false));
      message.success({
        content: "Login Berhasil",
      });
    } catch (error) {
      console.log(error);
      message.error({
        content: "Login Gagal!",
      });
      setIsLoading(false);
    }
  };

  const loginWithGoogleHandler = async () => {
    try {
      await signInWithGoogleAndSyncUser();
      message.success({ content: "Login Dengan Google Berhasil!" });
    } catch (error) {
      console.log(error);
      message.error({
        content: "Login Gagal!",
      });
    }
  };

  return (
    <div className="w-full">
      <Spin spinning={isLoading} tip="Loading..." className="!w-full">
        <Form
          form={form}
          onFinish={onFinish}
          className="w-full flex flex-col gap-y-6"
          layout="vertical"
        >
          <div className="flex flex-col">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email tidak boleh kosong!" },
              ]}
            >
              <Input className="text-base" placeholder="Masukkan Email" />
            </Form.Item>
            <div>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Password tidak boleh kosong!",
                  },
                ]}
              >
                <Input.Password
                  className="text-base"
                  placeholder="Masukkan Password"
                />
              </Form.Item>
              <div className="flex justify-end">
                <Button
                  type="text"
                  className="p-0 hover:!bg-transparent font-montserrat font-medium text-blue-600"
                >
                  Lupa Password?
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-y-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-auto py-2 text-base"
            >
              Login
            </Button>
            <Typography className=" text-gray-500">Atau</Typography>
            <Button
              onClick={loginWithGoogleHandler}
              className="w-full h-auto flex justify-center items-center py-2 text-base gap-x-4"
              icon={<BsGoogle className="w-6 h-6" />}
            >
              Masuk dengan Google
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
}

export default LoginForm;
