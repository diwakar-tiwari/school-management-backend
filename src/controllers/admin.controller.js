import Admin from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerAdmin = asyncHandler( async(req,res) =>{
    //Extract the details of user from body
    const {name, email, password, phone} = req.body;

    // Data Validation
    if(!name || !email || !password){
        throw new ApiError(400, "All Fields are required");
    }

    //check if user already exist
    const existedUser = await Admin.findOne({email})

    if(existedUser){
        throw new ApiError(409, "User already exist")
    }

    //Save the admin details in the database

    const user = await Admin.create({
        name,
        email,
        password,
        phone
    })

    return res.status(201).json(
        new ApiResponse(200, user, "User created successfully")
    )

})

export {
    registerAdmin
}

