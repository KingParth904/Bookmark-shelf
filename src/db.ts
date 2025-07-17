

import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username : {type :String , unique : true , required:true},
    password : String 
})

const ContentSchema = new Schema({
    title : String,
    link : String,
    type : {type:String , enum :  ['twitter', 'youtube'] , required:true } ,
    tags : [{type:mongoose.Types.ObjectId , ref:'Tags' }],
    userId : {type: mongoose.Types.ObjectId , ref :'Users', required:true}
})

const TagSchema = new Schema({
    title: String
})

const LinkSchema = new Schema({
    hash : String,
    userId : {type:  mongoose.Types.ObjectId , ref:'Users' , required :true , unique : true} 
})


export const UserModel = mongoose.model('Users',UserSchema);
export const ContentModel = mongoose.model('Content',ContentSchema);
export const TagModel = mongoose.model('Tags',TagSchema);
export const LinkModel = mongoose.model('Links',LinkSchema);




