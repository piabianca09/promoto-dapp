import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBNGc-GBoK00PLu36yUOcZpwu_7UiasIiE",
    authDomain: "promoto-b6a61.firebaseapp.com",
    databaseURL: "https://promoto-b6a61.firebaseio.com",
    projectId: "promoto-b6a61",
    storageBucket: "promoto-b6a61.appspot.com",
    messagingSenderId: "101290631386"
  }

  firebase.initializeApp(config)

  const db = firebase.firestore()
  db.settings({
      timestampsInSnapshots: true
  })

  const databaseCollection = collectionName => db.collection(collectionName)

  export {firebase, databaseCollection}