import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
  orderBy,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnnD9k6SIyaSVM9HLz95xqKBZgSsCbxwo",
  authDomain: "invitations-37aa7.firebaseapp.com",
  projectId: "invitations-37aa7",
  storageBucket: "invitations-37aa7.firebasestorage.app",
  messagingSenderId: "792866877699",
  appId: "1:792866877699:web:15dc591608e3f0d3c03936",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Default Settings ────────────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  brideName: "Aaliya",
  groomName: "Ibrahim",
  weddingDate: "2026-12-12T17:00:00",
  brideParents: "Mr. & Mrs. Rahman",
  groomParents: "Mr. & Mrs. Hussain",
  brideTagline: "A heart full of grace, dreams as soft as petals.",
  groomTagline: "A gentleman with a kind soul and steady love.",
  brideSiblings: "Sister: Sana · Brother: Ahmed",
  groomSiblings: "Brother: Yusuf · Sister: Maryam",
  venue: "Grand Pearl Banquet",
  venueAddress: "Grand Pearl Banquet, 24 Rose Avenue, Garden District",
  venueMapsUrl: "https://maps.google.com/?q=Grand+Pearl+Banquet",
  events: [
    { id: "mehendi", name: "Mehendi", icon: "leaf", date: "Dec 10, 2026", time: "4:00 PM", venue: "Rose Garden Hall" },
    { id: "nikah", name: "Nikah", icon: "heart", date: "Dec 12, 2026", time: "5:00 PM", venue: "Grand Pearl Banquet" },
    { id: "reception", name: "Reception", icon: "star", date: "Dec 13, 2026", time: "7:00 PM", venue: "Crystal Ballroom" },
  ],
  bankAccount: "Aaliya Rahman",
  bankName: "Pearl National Bank",
  bankACNo: "1234 5678 9012",
  upiId: "aaliya@pearl",
  contactWhatsapp: "+919876543210",
  contactPhone: "+919876543210",
  contactEmail: "aaliya.ibrahim@wedding.com",
};

// ─── RSVP ────────────────────────────────────────────────────────────────────

export async function submitRSVP(data) {
  const record = { ...data, submittedAt: new Date().toISOString() };
  try {
    await addDoc(collection(db, "rsvps"), record);
  } catch (err) {
    console.warn("Firestore write failed, saving to localStorage:", err.message);
    const existing = JSON.parse(localStorage.getItem("rsvps") || "[]");
    existing.push({ id: Date.now().toString(), ...record });
    localStorage.setItem("rsvps", JSON.stringify(existing));
  }
}

export async function getRSVPs() {
  try {
    const q = query(collection(db, "rsvps"), orderBy("submittedAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("Firestore read failed, reading from localStorage:", err.message);
    return JSON.parse(localStorage.getItem("rsvps") || "[]");
  }
}

// ─── Settings ────────────────────────────────────────────────────────────────

export async function getSettings() {
  try {
    const snap = await getDoc(doc(db, "config", "settings"));
    if (snap.exists()) return { ...DEFAULT_SETTINGS, ...snap.data() };
  } catch (err) {
    console.warn("Firestore settings read failed:", err.message);
    const stored = localStorage.getItem("weddingSettings");
    if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  }
  return DEFAULT_SETTINGS;
}

export async function updateSettings(data) {
  try {
    await setDoc(doc(db, "config", "settings"), data, { merge: true });
  } catch (err) {
    console.warn("Firestore settings write failed:", err.message);
    const current = JSON.parse(localStorage.getItem("weddingSettings") || "{}");
    localStorage.setItem("weddingSettings", JSON.stringify({ ...current, ...data }));
  }
}
