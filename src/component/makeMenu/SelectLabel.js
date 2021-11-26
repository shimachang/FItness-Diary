import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../context/MenuContext";

const SelectLabel = () => {
    const { setAddLabel } = useContext(MenuContext);
    const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
    const [currentLabel, setCurrentLabel] = useState(labelsClasses[0]);

    useEffect(() => {
        setAddLabel(currentLabel);
    }, [currentLabel]);

    return (
        <div className="container text-center mx-auto">
            <div className="mt-5 flex justify-center gap-x-2">
                {labelsClasses.map((labelClass, i) => (
                    <span
                        onClick={() => setCurrentLabel(labelClass)}
                        key={i}
                        className={`bg-${labelClass}-500 w-6 h-6 rounded-full flex items-center justify-center`}
                    >
                        {currentLabel === labelClass && (
                            <span className="material-icons-outlined text-white ">check</span>
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SelectLabel;
