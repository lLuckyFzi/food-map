import AuthLayout from '@aroma/components/Layouts/AuthLayout'
import Login from '@aroma/views/Auth/Login/Login'
import React, { ReactNode } from 'react'

function LoginPage() {
  return (
    <Login />
  )
}

LoginPage.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>

export default LoginPage