export function requestTime(req,res,next){
    let date = new Date()
    req.requestDate = {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        time: `${date.getHours()}:${date.getMinutes()}`
    }
    next();
}
// export function logger(req,res,next){
//     console.log("hello world");
// }