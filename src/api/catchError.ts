import { isAxiosError } from "axios";

 const catchAsyncError = (error: any): string =>{
    let errorMessage = error.message;
    
    if(isAxiosError(error)){
       const erroRepsonse = errorMessage = error.response?.data
       if(erroRepsonse) errorMessage = erroRepsonse.error
    }

    return errorMessage;

}

export default catchAsyncError