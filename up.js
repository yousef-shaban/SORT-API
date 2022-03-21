import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import mongoose from "mongoose";
import DataSc from "./Model/data.js"
import {} from "dotenv/config"
const data = require("./products.json")


const start = async ()=>
{
    try {
        await mongoose.connect(process.env.MONGOOSE_URI)
        await DataSc.deleteMany()
        await DataSc.create(data)
        console.log("Success -_-");
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit()
    }
}
start();