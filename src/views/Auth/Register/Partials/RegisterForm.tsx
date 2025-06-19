import { auth, db } from "@aroma/lib/firebase";
import { Button, Form, Input, message, Spin } from "antd";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";

function RegisterForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const { email, fullname, password } = values;

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullname,
        email,
        createdAt: new Date(),
        role: "user",
      }).finally(() => setIsLoading(false));

      message.success({ content: "Register berhasil!" });
      router.replace("/auth/login");
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Register Gagal!");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Spin spinning={isLoading} tip="Loading...">
        <Form
          form={form}
          onFinish={onFinish}
          className="w-full flex flex-col gap-y-6"
          layout="vertical"
        >
          <div className="flex flex-col">
            <Form.Item
              label="Nama Lengkap"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Nama Lengkap  tidak boleh kosong!",
                },
              ]}
            >
              <Input className="text-base" placeholder="Masukkan Email" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Email tidak boleh kosong!" }]}
            >
              <Input className="text-base" placeholder="Masukkan Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Password tidak boleh kosong!" },
              ]}
            >
              <Input.Password
                className="text-base"
                placeholder="Masukkan Password"
              />
            </Form.Item>
            <Form.Item
              label="Konfirmasi Password"
              name="password2"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Password tidak boleh kosong!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Password yang anda masukan tidak sesuai!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className="text-base"
                placeholder="Konfirmasi Password"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-auto py-2 text-base"
            >
              Daftar
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  );
}

export default RegisterForm;
