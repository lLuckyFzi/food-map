import React, { ReactNode } from "react";
import Image from "next/image";
import { Button, Layout, Menu, MenuProps, message, Popover } from "antd";
import { FaLocationDot } from "react-icons/fa6";

import AromaLogoDark from "../../../public/logo/aroma-dark-logo.png";
import { PlacesProvider } from "@aroma/store/usePlaceContext";
import { CgProfile } from "react-icons/cg";
import { RiProfileFill } from "react-icons/ri";
import Typography from "../Typography";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@aroma/lib/firebase";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [getItem("Location", "1", <FaLocationDot />)];

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  const router = useRouter();

  const user = auth.currentUser

  const handleLogout = async () => {
    try {
      await signOut(auth);
      message.success("Logout berhasil");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Gagal logout");
    }
  };

  const profilePopup = (
    <div className="w-64 flex flex-col">
      <div className="flex gap-x-3 items-center">
        <div className="bg-gray-400 w-10 h-10 rounded-full" />
        <div>
          <Typography className="text-xl font-semibold">{user?.email || "User unknown"}</Typography>
          {/* <Typography className="text-gray-500">Email</Typography> */}
        </div>
      </div>
      <div className="mt-5">
        <Button
          type="primary"
          className="bg-blue-500 w-full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <Sider collapsed={true} theme="light" className="shadow-lg relative">
        <div className="w-full flex justify-center items-center my-8">
          <Image
            src={AromaLogoDark}
            alt="aroma-logo"
            width={999}
            height={999}
            className="w-14"
          />
        </div>
        <div>
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </div>
        <div className="h-[80%] flex flex-col justify-end items-center">
          <Popover content={profilePopup}>
            <Button
              type="text"
              className="flex justify-center items-center"
              icon={<RiProfileFill className="w-10 h-10 text-blue-500" />}
            />
          </Popover>
        </div>
      </Sider>
      <PlacesProvider>
        <Layout>{props.children}</Layout>
      </PlacesProvider>
    </Layout>
  );
}

export default MainLayout;
