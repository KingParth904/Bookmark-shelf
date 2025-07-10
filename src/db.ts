

import mongoose, {model , mongo, Schema } from 'mongoose';

const UserSchema = new Schema({
    username : {type :String , unique : true , required:true},
    password : String 
})

const ContentSchema = new Schema({
    title : String,
    link : String,
    type : {type:String , enum :  ['video', 'article', 'image', 'other'] , required:true } ,
    tags : [{type:mongoose.Types.ObjectId , ref:'Tags' , required : true}],
    userId : {type: mongoose.Types.ObjectId , ref :'User', required:true}
})

const TagSchema = new Schema({
    title: String
})

const LinkSchema = new Schema({
    hash : String,
    userId : {type:  mongoose.Types.ObjectId , ref:'User'} 
})


const UserModel = mongoose.model('Users',UserSchema);
const ContentModel = mongoose.model('Content',ContentSchema);
const TagModel = mongoose.model('Content',TagSchema);
const LinkModel = mongoose.model('Content',LinkSchema);

module.exports = {
    UserModel : UserModel,
    ContentModel : ContentModel,
    TagModel : TagModel,
    LinkModel : LinkModel,
}


