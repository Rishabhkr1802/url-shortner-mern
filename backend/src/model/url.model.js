import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
        name: {
            type: String,
        },
        short_url: {
            type    : String,
            required: true,
            unique  : true,
        },
        full_url: {
            type    : String,
            required: true,
        },
        click: {
            type: Number
        }
    }, { timestamps: true });

const Url = mongoose.model("Url", urlSchema);
export default Url;
