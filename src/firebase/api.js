import { db, firebaseTimeStamp } from "./index";

export const getInitCalenderEvents = async (uid) => {
    const eventRef = await db.collection("users").doc(uid).collection("Events");

    return eventRef.get().then((snapshot) => {
        let eventLists = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            eventLists.push({
                day: data.day,
                description: data.description,
                listId: data.listId,
                uid: data.uid,
                eventId: data.eventId,
                created_at: data.created_at,
                isComplete: data.isComplete,
                historyId: data.historyId,
            });
        });
        return eventLists;
    });
};

export const getNewStorage = async (uid) => {
    const NewStorage = await db.collection("users").doc(uid).collection("NewStorage");
    return NewStorage.get().then((snapshot) => {
        let menuLists = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            menuLists.push({
                target: data.target,
                category: data.category,
                menu: data.menu,
                weight: data.weight,
                rep: data.rep,
                set: data.set,
                uid: data.uid,
                id: data.id,
                isChecked: data.isChecked,
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
            const data = doc.data();
            menuLists.push({
                listName: data.listName,
                uid: data.uid,
                listId: data.id,
                menus: data.menus,
                label: data.label,
                created_at: data.created_at,
            });
        });
        return menuLists;
    });
};

export const getCurrentMyMenuList = async (uid, listId) => {
    const menu = await db.collection("users").doc(uid).collection("MyMenuList").doc(listId);
    return menu.get().then((snapshot) => {
        let menuLists = [];
        const data = snapshot.data();
        menuLists.push({
            listName: data.listName,
            uid: data.uid,
            id: data.id,
            menus: data.menus,
            label: data.label,
            created_at: data.created_at,
        });
        return menuLists;
    });
};

export const getHistoryWithEventId = async (uid, historyId) => {
    const historyRef = await db.collection("users").doc(uid).collection("History");
    return await historyRef.where("historyId", "==", historyId).get().then((snapshot) => {
        let menuLists = []
        snapshot.forEach((doc) => {
            menuLists.push(doc.data());
        })
        return menuLists
    })
    // return query.then((snapshot) => {
    //     let menuLists = [];
    //     const data = snapshot.data();
    //     menuLists.push({
    //         menus: data.menus,
    //     });
    //     return menuLists;
    // });
};

export const deleteNewStorage = (uid, id) => {
    db.collection("users").doc(uid).collection("NewStorage").doc(id).delete();
};

export const deleteMyMenuList = (uid, id) => {
    db.collection("users").doc(uid).collection("MyMenuList").doc(id).delete();
};

export const deleteEvent = (uid, id) => {
    db.collection("users").doc(uid).collection("Events").doc(id).delete();
};
export const deleteEventWithListId = async (uid, id) => {
    const ref = db.collection("users").doc(uid).collection("Events");
    const query = await ref.where("listId", "==", id).get();
    query.docs.forEach(async (doc) => {
        await doc.ref.delete();
    });
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

export const addNewStorageMenuList = (
    currentUser,
    addTarget,
    addCategory,
    addMenu,
    addWeight,
    addRep,
    addSetName
) => {
    const collection = db.collection("users").doc(currentUser).collection("NewStorage");
    const newDoc = collection.doc().id;
    collection.doc(newDoc).set({
        uid: currentUser,
        target: addTarget,
        category: addCategory,
        menu: addMenu,
        weight: addWeight,
        rep: addRep,
        set: addSetName,
        created_at: firebaseTimeStamp,
        id: newDoc,
        isChecked: false,
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

export const addEvents = (listId, currentUser, day, description) => {
    const collection = db.collection("users").doc(currentUser).collection("Events");
    const newDoc = collection.doc().id;
    collection.doc(newDoc).set({
        created_at: firebaseTimeStamp,
        listId: listId,
        uid: currentUser,
        updated_at: firebaseTimeStamp,
        eventId: newDoc,
        day: day,
        description: description,
        isComplete: false,
        historyId: "",
    });
};

export const addHistoryWithEvents = (currentUser, eventData) => {
    const historyRef = db.collection("users").doc(currentUser).collection("History");
    const eventRef = db.collection("users").doc(currentUser).collection("Events");
    const historyDoc = historyRef.doc().id;

    historyRef.doc(historyDoc).set({
        created_at: firebaseTimeStamp,
        menus: eventData[0].menus,
        uid: currentUser,
        updated_at: firebaseTimeStamp,
        label: eventData[0].label,
        listName: eventData[0].listName,
        historyId: historyDoc,
    });

    eventRef.doc(eventData[1].eventId).set({
        created_at: eventData[1].created_at,
        listId: eventData[1].listId,
        uid: currentUser,
        updated_at: firebaseTimeStamp,
        eventId: eventData[1].eventId,
        day: eventData[1].day,
        description: eventData[1].description,
        isComplete: true,
        historyId: historyDoc,
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
            historyId: "",
        },
        { marge: true }
    );
};

export const updateMyMenuList = (listName, currentUser, eventId, menus, created_at, label) => {
    const collection = db.collection("users").doc(currentUser).collection("MyMenuList");
    collection.doc(eventId).set(
        {
            listName: listName,
            uid: currentUser,
            menus: menus,
            created_at: created_at,
            updated_at: firebaseTimeStamp,
            id: eventId,
            label: label,
        },
        { marge: true }
    );
};

export const getNewStorageDocsId = async (uid) => {
    const NewStorage = await db.collection("users").doc(uid).collection("NewStorage");
    return NewStorage.get().then((snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
            docs.push({
                id: doc.data().id,
            });
        });
        return docs;
    });
};
