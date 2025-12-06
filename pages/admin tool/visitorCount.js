import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ✅ Firebase Config
const firebaseConfig_v = {
  apiKey: "AIzaSyCZejpQv-Ru-OlzWsjzFF_37e8b8DIC3u8",
  authDomain: "posterdata-113da.firebaseapp.com",
  projectId: "posterdata-113da",
  storageBucket: "posterdata-113da.appspot.com",
  messagingSenderId: "702186025024",
  appId: "1:702186025024:web:488eec752f7f6c382cefa5"
};

// ✅ Init Firebase
const app = initializeApp(firebaseConfig_v);
const db = getFirestore(app);

const visitorCountEl = document.getElementById("visitorCount");

// ✅ Load Total Visitors (ONE TIME ONLY, NO REALTIME)
async function loadTotalVisitorsOnce() {
  let totalVisitors = 0;

  // ✅ Get all pages
  const pagesSnapshot = await getDocs(collection(db, "visitor_logs"));

  for (const pageDoc of pagesSnapshot.docs) {
    const pageId = pageDoc.id;

    // ✅ Get visitors of each page
    const visitorSnap = await getDocs(
      collection(db, "visitor_logs", pageId, "visitors")
    );

    totalVisitors += visitorSnap.size;
  }

  // ✅ Set final total
  visitorCountEl.textContent = totalVisitors;
}

// ✅ Call once on page load
loadTotalVisitorsOnce();
