import { Repository } from "typeorm";

export class Controller {

    getAll=async (req,res)=>{
        try {
            res.json("körte");
        } catch (err) {
            this.handlerError(res,err);
        }};

        handlerError = (res,err,status = 500, message = "Internal server error.") =>{
            if(err){
                console.log(err);
            }
            res.status(status).json({error:message});
        };
}