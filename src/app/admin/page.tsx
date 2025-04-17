'use server'

import { redirect } from "next/navigation"
import { verifyToken } from "@/lib/tokens"
import { cookies } from "next/headers"
//check if the user is valid admin logged in or not if not then redirect to auth page and yes then to dashboard

export default async function Page() {
    // const cookieStore = await cookies()
    // const token = cookieStore.get("admin_token");

    // if(token){
    //     console.log('protect route:',token)
    //     redirect('/admin/dashboard')
    // }else{
    //     redirect('/admin/signIn')
    // }
    redirect('/admin/dashboard')
}