import firebase from "@firebase/app-compat";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { db, firebaseTimeStamp } from "./index";

export const initGet = async (uid) => {
    const menu = await db.collection("event").orderBy("created_at", "desc").where("uid", "==", uid);

    return menu.get().then((snapshot) => {
        let menus = [];
        snapshot.forEach((doc) => {
            menus.push({
                id: doc.id,
                content: doc.data().content,
                isComplete: doc.data().isComplete,
            });
        });
        return menus;
    });
};

export const addEvent = (content, uid) => {
    db.collection("event").add({
        content: content,
        uid: uid,
        isComplete: false,
        created_at: firebaseTimeStamp,
    });
};

export const menuDelete = (id) => {
    db.collection("todo").doc(id).delete();
};

export const toggleComplete = async (id) => {
    const menu = await db.collection("todo").doc(id).get();
    console.log(menu.isComplete);
    return db
        .collection("todo")
        .doc(id)
        .update({
            isComplete: menu.data().isComplete ? false : true,
            updated_at: firebaseTimeStamp,
        });
};
