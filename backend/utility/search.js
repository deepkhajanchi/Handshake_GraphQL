let jwt = require('jsonwebtoken');

const searchableQuery = (queryObject) => {
  let searchableQuery = {};
  if(queryObject){
    for(let [column_name,column_value] of Object.entries(queryObject)){
      if(column_value.length > 0){
        searchableQuery[column_name] = {
          $regex: new RegExp(`.*${column_value}.*`,'i')
        }
      }
    }
  }
  return searchableQuery
}

module.exports.createJwtToken = (user, profile) =>{
    let payload = {
      id: user._id,
      type: user.role,
      profile: profile
    };
    let token = jwt.sign(payload, "cmpe273_secret_key", {
      expiresIn: 1008000
    });
    return token
  }
  
  module.exports.searchableQuery = searchableQuery;