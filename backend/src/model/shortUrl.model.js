import mongoose from "mongoose";

const UrlSchema = mongoose.Schema({
        name: { type : String },
        short_url: {
            type    : String,
            required: true,
            unique  : true,
            index   : 0,
        },
        full_url: {
            type    : String,
            required: true,
        },
        clicks: {
            type    : Number,
            required: true,
            default : 0,
        }
    }, { timestamps: true });

const Url = mongoose.model("Url", UrlSchema);

export default Url;
