"use client";

import React from "react";
import { Button } from "antd";
import Image from "next/image";

import Typography from "@aroma/components/Typography";
import LoginForm from "./Partials/LoginForm";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter()

  return (
    <div className="py-11 px-10 h-screen flex gap-x-14">
      <div className="flex flex-col bg-blue-500 w-[40%] h-full rounded-3xl overflow-hidden items-center justify-between p-10">
        <div className="flex flex-col items-center gap-y-20">
          <Image
            src="/logo/aroma-light-logo.png"
            alt="log-light"
            width={999}
            height={999}
            className="w-24"
          />
          <Image
            src="/illustrations/donuts-illustration.png"
            alt="donut-illustration"
            width={9999}
            height={9999}
            className="w-80"
          />
        </div>
        <div className="text-center flex flex-col gap-y-3 text-white">
          <Typography font="playfair_display" className="text-4xl font-bold">
            Cara Mudah Mencari Tempat Makan
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            incidunt cupiditate quia culpa amet dignissimos nobis vel quidem
            nisi ipsa, nihil nostrum laborum molestiae atque, cum sit ex
            officiis eius, sunt neque accusantium placeat. Exercitationem error
            quibusdam explicabo nam cum harum alias nisi cumque labore, minus
            obcaecati a rem sit!
          </Typography>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[45%] flex flex-col items-center gap-y-10 justify-between">
          <div className="flex flex-col gap-y-3">
            <Typography font="playfair_display" className="font-bold text-3xl">
              Selamat Datang Kembali!
            </Typography>
            <Typography className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              magni harum culpa nulla impedit voluptate eum dicta minus officiis
              velit!
            </Typography>
          </div>
          <LoginForm />
          <div className="flex items-center gap-x-1">
            <Typography className="group text-sm flex">
              Belum mempunyai akun?{" "}
            </Typography>
            <Button
              type="text"
              onClick={() => router.replace("/auth/register")}
              className="p-0 !font-montserrat hover:!bg-transparent font-bold text-sm hover:!text-blue-500"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
