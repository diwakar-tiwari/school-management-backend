import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const adminSchema = Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: [true,"Please enter your email"],
            unique: true,
            trim: true, //remove empty space from or around the email
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email"

            ]
        },
        password:{
            type: String,
            required: [true, "Please enter your password"],
            minLength: [6, "Password must contain atleast 6 character"],
            // maxLength: [23, "Password length should not be more than 23 character"]
        },
        phone:{
            type: String,
            default: "+91"
        }
    },
    {
        timestamps: true
    }
)


adminSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 20)
    next()
})


const Admin = mongoose.model("Admin", adminSchema);
export default Admin