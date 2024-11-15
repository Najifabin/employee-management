import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

// addEmployeeAPI - called by add component , http req : post
export const addEmployeeAPI = async (empDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/employee`,empDetails)
 }

// getEmpDeatails
export const getEmpDetailsAPI = async()=>{
    return await commonAPI("GET",`${SERVERURL}/employee`,"")
}
// remove empDetails
export const removeEmpAPI = async(id)=>{
    return await commonAPI("DELETE",`${SERVERURL}/employee/${id}`,{})
}