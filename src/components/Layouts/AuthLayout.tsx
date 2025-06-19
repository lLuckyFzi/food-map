"use client"

import React, { ReactNode } from "react";

function AuthLayout(props: { children: ReactNode }) {
  return <div>{props.children}</div>;
}

export default AuthLayout;
