import { db, firebaseTimeStamp } from "../firebase";

export const saveEvents = (title, description, label, day) => {
    const eventRef = db.collection("event");
    const timestamp = firebaseTimeStamp.now();
    const data = {
        title: title,
        description: description,
        label: label,
        day: day,
        updated_at: timestamp,
    };
    const ref = eventRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;
    eventRef.doc(id).set(data);
};
