import moongoose, {connection} from "mongoose";

export default function moongooseConnect() {
    if (connection.readyState === 1) {
        return moongoose.connection.asPromise();
    } else {
    const uri = process.env.MONGODB_URI;
        return moongoose.connect(uri)
    }
}