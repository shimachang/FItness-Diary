import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const SelectedDayEvent = () => {
    const {
        currentDayEvent,
        setShowEventUpdateModal,
        setEventListId,
        setEventListName,
        setEventLabel,
        setEventId,
        setEventDescription,
        setEventCreated,
    } = useContext(GlobalContext);
    console.log(currentDayEvent)
    
    return (
        <div className="pt-4">
            {currentDayEvent !== "" &&
                currentDayEvent.map((event) => (
                    <div
                        onClick={() => {
                            setShowEventUpdateModal(true);
                            setEventListId(event.listId);
                            setEventListName(event.listName);
                            setEventLabel(event.label);
                            setEventId(event.eventId);
                            setEventDescription(event.description);
                            setEventCreated(event.created_at);
                        }}
                        className={`bg-${event.label}-200 text-center rounded-sm text-gray-600 text-sm mb-2 cursor-pointer`}
                        key={event.eventId}
                    >
                        {event.listName}
                    </div>
                ))}
        </div>
    );
};

export default SelectedDayEvent;
