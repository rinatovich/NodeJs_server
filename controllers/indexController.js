import {response} from '../response.js'
const index = (req,res)=>{
    response("Hello REST API", res);
}
export default  index;