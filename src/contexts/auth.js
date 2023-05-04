import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [uName, setUName] = useState("");
    const [uPic, setUPic] = useState("");
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                setUserId(uid);

                const docRef = doc(db, "user", uid);
                const docSnap = await getDoc(docRef);
            
                if (docSnap.exists()) {
                    setUPic(docSnap.data()['imageUrl'])
                    setUName(docSnap.data()['name'])
                }
            }
        })
            return () => unsubscribe();
        }, [])
  
    return (
      <AuthContext.Provider value={{ userId,uName,uPic}}>
        {children}
      </AuthContext.Provider>
    );
  }