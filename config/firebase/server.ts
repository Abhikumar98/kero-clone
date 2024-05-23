import * as firebaseAdmin from "firebase-admin";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import serviceAccount from "./serviceAccount.json";

// export const firebaseConfig = {
// 	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// 	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDING_ID,
// 	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// 	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
        }),
    });
} else {
    firebaseAdmin.app();
}

export const adminDb = firebaseAdmin.firestore();

export const serverUpdateCount = (size: number) => {
    const updateCountCmd = firebaseAdmin.firestore.FieldValue.increment(size);
    return updateCountCmd;
};

export const adminStorage = firebaseAdmin.storage();
export default firebaseAdmin;
