const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.findArticleId = (inputArray, input)=>{



for(let i = 0; i < inputArray.length; i ++){


if(input in inputArray[i]){

  
  return inputArray[i][input]
  
}


}






};









