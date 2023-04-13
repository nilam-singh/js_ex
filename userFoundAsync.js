//using promises
const loading =  require('loading-cli');
const load = loading("loading...")
const my_token = "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"

  const users = ["nilam-singh","abcdsafjds","abc","jinal-gajjar","Bhautik","Bhoomiz01","abcd"]; // Array of users
  let foundUsers = [];
  let notFound = 0; let flag = false;
  let timeStart; let timeEnd;

  const getData = async (users) => {
    timeStart = Date.now();
    const promise = users.map(async user => {
      const res = await fetch(
        `https://api.github.com/users/${user}`,{
          headers : {
            Authorization: `token ${my_token}` 
          }
        }
      ).then((response) => {
        if(response.status == 403){
          throw new Error("Rate Limit Exceded")
        }
        return response.json()
      }).then((value2) => {
        if(value2.message != "Not Found"){
          foundUsers.push(value2)
        }else{
          notFound++
        }
      }).catch((err) => {
        console.error("Error" ,err)
      })
    });
    flag=true  
    timeEnd = Date.now();
  }
    load.start()
    getData(users)
    
    var interval = setInterval(function(){
      if(flag == true) {
        load.stop()
        clearInterval(interval)
        console.log("Time Required : ", (timeEnd-timeStart)/1000)
        //console.log("Found User",foundUsers)
        console.log("Found : ", foundUsers.length)
        console.log("Not Found : ", notFound)
      }
    },500)
  