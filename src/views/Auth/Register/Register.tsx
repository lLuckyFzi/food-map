import React from "react";
import Image from "next/image";
import { Button, message } from "antd";
import { useRouter } from "next/router";

import { BsGoogle } from "react-icons/bs";
import RegisterForm from "./Partials/RegisterForm";
import Typography from "@aroma/components/Typography";
import { signInWithGoogleAndSyncUser } from "@aroma/services/firebase-auth";

function Register() {
  const router = useRouter();

  const handleRegisterByGoogle = async () => {
    try {
      await signInWithGoogleAndSyncUser();
      message.success({ content: "Masuk dengan Google berhasil!" });
    } catch (error) {
      console.error(error);
      message.error({ content: "Gagal Masuk dengan Google!" });
    } finally {
    }
  };

  return (
    <div className="py-11 px-10 h-screen flex gap-x-14">
      <div className="flex justify-center">
        <div className="w-[45%] flex flex-col items-center gap-y-10 justify-between">
          <div className="flex flex-col gap-y-3">
            <Typography font="playfair_display" className="font-bold text-3xl">
              Membuat Akun Baru
            </Typography>
            <Typography className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              magni harum culpa nulla impedit voluptate eum dicta minus officiis
              velit!
            </Typography>
          </div>
          <div className="w-full flex flex-col items-center gap-y-4">
            <Button
              onClick={handleRegisterByGoogle}
              className="w-full h-auto flex justify-center items-center py-2 text-base gap-x-4"
              icon={<BsGoogle className="w-6 h-6" />}
            >
              Masuk dengan Google
            </Button>
            <Typography className=" text-gray-500">Atau</Typography>
          </div>
          <RegisterForm />
          <div className="flex items-center gap-x-1">
            <Typography className="group text-sm flex">
              Sudah mempunyai akun?{" "}
            </Typography>
            <Button
              type="text"
              onClick={() => router.replace("/auth/login")}
              className="p-0 !font-montserrat hover:!bg-transparent font-bold text-sm hover:!text-blue-500"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-blue-500 w-[40%] h-full rounded-3xl overflow-hidden items-center justify-between p-10">
        <div className="flex flex-col items-center">
          <Image
            src="/logo/aroma-light-logo.png"
            alt="log-light"
            width={999}
            height={999}
            className="w-24"
          />
          <Image
            src="/illustrations/register-illustration.png"
            alt="donut-illustration"
            width={9999}
            height={9999}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
