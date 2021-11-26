import SelectWeight from "./SelectWeight";
import SelectRep from "./SelectRep";
import SelectTarget from "./SelectTarget";

const MakeMenuCard = () => {
    return (
        <div className="container mx-auto mt-4 py-4">
            <div className="grid grid-cols-2">
                <SelectTarget className="pt-2" />
                <SelectWeight className="pt-2" />
                <SelectRep className="pt-2" />
            </div>
        </div>
    );
};
export default MakeMenuCard;
