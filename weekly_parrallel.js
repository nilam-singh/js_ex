//get uuid
let delayTime = 5
async function getUUID(){
    console.time("GetUUID Time")
    const response = await fetch("https://httpbin.org/uuid")
    console.timeEnd("GetUUID Time")
    return await response.json()
}

//get delay/{dealyTime}
async function delay(delayData){
    console.time("Delay Time")
    const response = await fetch(`https://httpbin.org/delay/${delayData}`)
    console.timeEnd("Delay Time")
    return await response.json()
}

//post anthing
async function anythingPost(bodyData){
    console.time("AnythingPost Time")
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(bodyData), //convert obj to string
    }
    const response = await fetch(`https://httpbin.org/anything`, options)
    const data = await response.json()
    console.timeEnd("AnythingPost Time")
    return data
}

//parallely using await 
// console.time("Total Time")
// async function main(){
//     const getRes =  getUUID()
//     const delayRes =  delay(delayTime)
//     const anythingRes = anythingPost(await getRes)
//     anythingRes.then((val)=> console.log(val.data))
//     await delayRes
//     console.timeEnd("Total Time")
// }
main()

//parallely using promis.all
async function parllelPromise(postData) {
    const [delayRes, anythingPostRes] = await Promise.all([
      delay(delayTime),
      anythingPost(postData)
    ]);
    return [delayRes, anythingPostRes];
}
console.time("Total Time1")
getUUID().then(
    (res) => {
        return parllelPromise(res)      
    },
    (err) => { throw new Error("Error While getting UUID : ",err)} 
).then((resArr) => {
    console.timeEnd("Total Time1")
    console.log(resArr[1].data)
}).catch(err => {
    console.log(err)
});