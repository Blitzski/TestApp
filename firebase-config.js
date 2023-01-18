import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCU3rrW_0iS9WpxafljZNHnPe0DlQorobY",
  authDomain: "react-cdaf4.firebaseapp.com",
  databaseURL: "https://react-cdaf4-default-rtdb.firebaseio.com",
  projectId: "react-cdaf4",
  storageBucket: "react-cdaf4.appspot.com",
  messagingSenderId: "970246354516",
  appId: "1:970246354516:web:1365ae8775c0e087209fc1",
  measurementId: "G-5VS84YPQFZ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
