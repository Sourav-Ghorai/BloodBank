import userModel from '../models/userModel.js'

export const isAdmin = async(req, res, next) => {
try {
   const user = await userModel.findById(req.body.userId)
   if(user?.role !== 'admin'){
      return res.status(401).send({
         success: false,
         message: "Auth failed, Not a admin account"
      })
   }else{
      next();
   }
} catch (error) {
   console.log(error)
   return res.status(401).send({
      success: false,
      message: "Auth verification failed for admin",
      error
   })
}
}