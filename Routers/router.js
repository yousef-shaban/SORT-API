import express from "express"
import {getAllData, getAllDataTesting} from "../Controller/func.js"
const router = express.Router();


router.get("/all", getAllData)
router.get("/testing", getAllDataTesting)

export default  router