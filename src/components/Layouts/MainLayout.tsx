import React, { ReactNode } from "react";
import Image from "next/image";
import { Layout, Menu, MenuProps } from "antd";
import { FaLocationDot } from "react-icons/fa6";

import AromaLogoDark from "../../../public/logo/aroma-dark-logo.png";
import { PlacesProvider } from "@aroma/store/usePlaceContext";

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
  return (
    <Layout>
      <Sider collapsed={true} theme="light" className="shadow-lg">
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
      </Sider>
      <PlacesProvider>
        <Layout>{props.children}</Layout>
      </PlacesProvider>
    </Layout>
  );
}

export default MainLayout;
