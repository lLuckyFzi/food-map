import MainLayout from "@aroma/components/Layouts/MainLayout";
import Home from "@aroma/views/Home/Home";
import { ReactNode } from "react";

export default function HomePage() {
  return <Home />;
}

HomePage.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>
