"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();
    let user = await User.findOne({ username: to_username });
    const secret = user.razorpaysecret;

    const instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret });

    const options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    };
    const order = await instance.orders.create(options);

    // create a pending payment entry
    await Payment.create({
        oid: order.id,
        amount: amount / 100,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,
    });

    return order;
};

export const fetchuser = async (username) => {
    await connectDB();
    const user = await User.findOne({ username }).lean(); // using .lean() to ensure plain object
    if (!user) return null;

    // Convert MongoDB ObjectId and dates to strings
    return {
        ...user,
        _id: user._id.toString(),
        createdAt: user.createdAt ? user.createdAt.toISOString() : null,
        updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null,
    };
};

export const fetchpayments = async (username) => {
    await connectDB();
    const payments = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 })
        .limit(10)
        .lean();

    // Ensure all fields are JSON-safe
    return payments.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
        createdAt: payment.createdAt ? payment.createdAt.toISOString() : null,
        updatedAt: payment.updatedAt ? payment.updatedAt.toISOString() : null,
    }));
};

export const updateProfile = async (data, oldusername) => {
    await connectDB();
    let ndata = Object.fromEntries(data);

    if (oldusername !== ndata.username) {
        const existingUser = await User.findOne({ username: ndata.username });
        if (existingUser) return { error: "Username already exists" };

        await User.updateOne({ email: ndata.email }, ndata);
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username });
    } else {
        await User.updateOne({ email: ndata.email }, ndata);
    }
};
