import { initializeApp } from 'firebase/app';
import config from './firebase.config';

const firebase = initializeApp(config.firebaseConfig);

export default firebase;