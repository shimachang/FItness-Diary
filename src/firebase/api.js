import { db, firebaseTimeStamp } from "./index";


export const getInitCalenderEvents = async (uid) => {
    const events = await db.collection("users").doc(uid).collection("Events");

    return events.get().then((snapshot) => {
        let eventsList = [];
        snapshot.forEach((doc) => {
            eventsList.push({
                day: doc.data().day,
                listName: doc.data().listName,
                listId: doc.data().listId,
                uid: doc.data().uid,
                id: doc.data().id,
                label: doc.data().label,
                
            });
        });
        return eventsList;
    });
};

export const getTemporaryList = async (uid) => {
    const menu = await db.collection("users").doc(uid).collection("Temporary_storage");

    return menu.get().then((snapshot) => {
        let menuLists = [];
        snapshot.forEach((doc) => {
            menuLists.push({
                target: doc.data().target,
                category: doc.data().category,
                menu: doc.data().menu,
                weight: doc.data().weight,
                rep: doc.data().rep,
                uid: doc.data().uid,
                id: doc.data().id,
            });
        });
        return menuLists;
    });
};

export const getMyMenuList = async (uid) => {
    const menu = await db.collection("users").doc(uid).collection("MyMenuList");
    return menu.get().then((snapshot) => {
        let menuLists = [];
        snapshot.forEach((doc) => {
            menuLists.push({
                listName: doc.data().listName,
                uid: doc.data().uid,
                id: doc.data().id,
                menus: [doc.data().menus],
                label: doc.data().label
                
            });
        });
        return menuLists;
    });
};

export const deleteTemporary = (uid, id) => {
    db.collection("users").doc(uid).collection("Temporary_storage").doc(id).delete();
};

export const deleteMyMenuList = (uid, id) => {
    db.collection("users").doc(uid).collection("MyMenuList").doc(id).delete();
};

export const toggleComplete = async (id) => {
    const menu = await db.collection("todo").doc(id).get();
    return db
        .collection("todo")
        .doc(id)
        .update({
            isComplete: menu.data().isComplete ? false : true,
            updated_at: firebaseTimeStamp,
        });
};

export const addTemporaryMenuList = (
    currentUser,
    addTarget,
    addCategory,
    addMenu,
    addWeight,
    addRep,
) => {
    const collection = db.collection("users").doc(currentUser).collection("Temporary_storage");
    const newDoc = collection.doc().id;
    collection.doc(newDoc).set({
        uid: currentUser,
        target: addTarget,
        category: addCategory,
        menu: addMenu,
        weight: addWeight,
        rep: addRep,
        created_at: firebaseTimeStamp,
        id: newDoc,
    });
};

export const addMyMenuList = (listName, currentUser, menus, label) => {
    const collection = db.collection("users").doc(currentUser).collection("MyMenuList");
    const newDoc = collection.doc().id;
    collection.doc(newDoc).set({
        listName: listName,
        uid: currentUser,
        menus: menus,
        created_at: firebaseTimeStamp,
        id: newDoc,
        label: label
    });
};

export const addEvents = (listName, listId, currentUser, day, label) => {
    const collection = db.collection("users").doc(currentUser).collection("Events");
    const newDoc = collection.doc().id;
    collection.doc(newDoc).set({
        listName: listName,
        listId: listId,
        uid: currentUser,
        created_at: firebaseTimeStamp,
        eventId: newDoc,
        day: day,
        label: label
        
    });
};
