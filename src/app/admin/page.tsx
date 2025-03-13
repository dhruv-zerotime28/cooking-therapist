'use client'

import { redirect } from "next/navigation"

//check if the user is valid admin logged in or not if not then redirect to auth page and yes then to dashboard

export default function adminHome (){
    redirect('/admin/dashboard')
}