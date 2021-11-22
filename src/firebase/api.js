import { db, firebaseTimeStamp } from "./index";

export const getInitCalenderEvents = async (uid) => {
    const events = await db.collection("users").doc(uid).collection("Events");

    return events.get().then((snapshot) => {
        let eventLists = [];
        snapshot.forEach((doc) => {
            const data = doc.data()
            eventLists.push({
                day: data.day,
                description: data.description,
                listName: data.listName,
                listId: data.listId,
                uid: data.uid,
                eventId: data.eventId,
                label: data.label,
                created_at: data.created_at,
            });
        });
        return eventLists;
    });
};

export const getTemporaryList = async (uid) => {
    const temporary = await db.collection("users").doc(uid).collection("Temporary_storage");

    return temporary.get().then((snapshot) => {
        let menuLists = [];
        snapshot.forEach((doc) => {
            const data = doc.data()
            menuLists.push({
                target: data.target,
                category: data.category,
                menu: data.menu,
                weight: data.weight,
                rep: data.rep,
                uid: data.uid,
                id: data.id,
            });
        });
        return menuLists;
    });
};

export const getMyMenuLists = async (uid) => {
    const menu = await db.collection("users").doc(uid).collection("MyMenuList");
    return menu.get().then((snapshot) => {
        let menuLists = [];
        snapshot.forEach((doc) => {
            const data = doc.data()
            menuLists.push({
                listName: data.listName,
                uid: data.uid,
                listId: data.id,
                menus: [data.menus],
                label: data.label,
            });
        });
        return menuLists;
    });
};

export const getCurrentMyMenuList = async (uid, listId) => {
    const menu = await db.collection("users").doc(uid).collection("MyMenuList").doc(listId);
    return menu.get().then((snapshot) => {
        let menuLists = [];
        snapshot.forEach((doc) => {
            const data = doc.data()
            menuLists.push({
                listName: data.listName,
                uid: data.uid,
                id: data.id,
                menus: [data.menus],
                label: data.label,
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

export const deleteEvent = (uid, id) => {
    db.collection("users").doc(uid).collection("Events").doc(id).delete();
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
    addRep
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
        label: label,
    });
};

export const addEvents = (listName, listId, currentUser, day, description, label) => {
    const collection = db.collection("users").doc(currentUser).collection("Events");
    const newDoc = collection.doc().id;
    collection.doc(newDoc).set({
        created_at: firebaseTimeStamp,
        listName: listName,
        listId: listId,
        uid: currentUser,
        updated_at: firebaseTimeStamp,
        eventId: newDoc,
        day: day,
        description: description,
        label: label,
    });
};

export const updateEvents = (
    eventCreated,
    eventId,
    listName,
    listId,
    currentUser,
    day,
    description,
    label
) => {
    const collection = db.collection("users").doc(currentUser).collection("Events");
    collection.doc(eventId).set(
        {
            created_at: eventCreated,
            eventId: eventId,
            listName: listName,
            listId: listId,
            uid: currentUser,
            updated_at: firebaseTimeStamp,
            day: day,
            description: description,
            label: label,
        },
        { marge: true }
    );
};
