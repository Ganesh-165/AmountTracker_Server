const userdatacollection = require("../models/datamodel");

exports.deleteItemController = async(req,res,next)=>{
    try{
        const {id} = req.body;
    const response = await userdatacollection.findOne({_id:id});
    if(!response) res.status(200).json({status:false,message:'Item Not Exsist'});
    await userdatacollection.deleteOne({_id:id});
    res.status(200).json({status:true,message:"Item Deleted Sucssesfully"});
    }
    catch(err){
        console.log('Dlete Item Err',err);
    }
}