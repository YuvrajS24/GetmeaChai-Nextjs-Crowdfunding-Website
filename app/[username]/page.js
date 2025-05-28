import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDB from '@/db/connectDb'
import User from '@/models/User'


const Username = async ({ params }) => {
  // if the username is present in the databse, show a 404 page
  const checkUser = async () => {
    await connectDB()
    let u = await User.findOne({ username: params.username })
    if (!u) {
      return notFound()
    }
  }

  await checkUser()

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username

// or Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  }
}