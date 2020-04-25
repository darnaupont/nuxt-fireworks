export default {
userLogin (state, {userData}) {
  console.log(userData)
  state.authUser = {email:userData.user.email, uid:userData.user.uid }
}

}
