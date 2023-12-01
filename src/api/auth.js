import auth from "@react-native-firebase/auth";

const signUp = (email, password) => {
  console.log("email fn: ",email);
  if(!email || !password){
    console.log("Faltan datos");
  }
  else{
    return auth().createUserWithEmailAndPassword(email.trim() ,password)
      .then((auth)=>{
        const {uid} = auth.user;
        auth().currentUser.updateProfile({
          displayName: email
        })
        return uid
      })
      .catch((err)=>{
        console.log("el Error: ", err);
      })
  }
}

const signIn = (email, password) => {
  console.log(email, password, );
  if(!email || !password){
    console.log("Faltan datos");
  }else{
    return auth().signInWithEmailAndPassword(email.trim(),password)
      .then(()=>{
        console.log(auth().currentUser);
      })
      .catch((error)=>{
        console.log("el otro error: ", error);
      })
  }
}

const singOut = () =>{
  return auth().signOut()
}

const Auth = {
  signIn,
  signUp,
  singOut
}

export default Auth;