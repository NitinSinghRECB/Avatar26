import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIYLE9gaYAZCkzLNvFbLMQBgNRbjS8DmI",
  authDomain: "avatar2026-35206.firebaseapp.com",
  projectId: "avatar2026-35206",
  storageBucket: "avatar2026-35206.firebasestorage.app",
  messagingSenderId: "721810332680",
  appId: "1:721810332680:web:6dc58722b1edcb090205bd",
  measurementId: "G-K79XXZZJCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;

// Only initialize analytics in browser environments
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
