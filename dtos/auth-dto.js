/*module.exports = class UserDto {
  email;
  isActivated;
  id;
  userName;
  constructor(model) {
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.id = model._id;
    this.userName = model.userName;
  }
};*/

const UserDto = (user) => {
  const userData={
    email : user.email,
    isActivated : user.isActivated,
    id : user._id,
   // userName : user.userName,
  }
  
  return userData;
}
module.exports = { UserDto };