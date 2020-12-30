import app from 'firebase/app'
import "firebase/firebase-firestore"
import "firebase/firebase-analytics"

const firebaseConfig = {

};

app.initializeApp(firebaseConfig);
app.analytics();

export const addQuestionToDB = async () => {
    const snapshot = await app.firestore().collection('questions').get()
    console.log(snapshot.docs.map(doc => doc.data()));
    return snapshot.docs.map(doc => doc.data());
}