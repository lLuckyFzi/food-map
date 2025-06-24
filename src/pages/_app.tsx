import ProtectedRoute from "@aroma/components/Layouts/ProtectedLayout";
import { AuthProvider, useAuth } from "@aroma/store/useAuthContext";
import "@aroma/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactNode } from "react";

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: any }) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <>
      <Head>
        <title>Aroma</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/aroma-logo.png" />
      </Head>
      <AuthProvider>
        <ProtectedRoute>
          {getLayout(<Component {...pageProps} />)}
        </ProtectedRoute>
      </AuthProvider>
    </>
  );
}
