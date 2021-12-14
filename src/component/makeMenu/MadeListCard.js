import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { ExpandMore } from "@material-ui/icons";

const MadeListCard = (props) => {
    const propsMenus = props.menu.menus;
    const MenuList = propsMenus.map((list, i) => {
        return (
            <Typography
                mb={2}
                sx={{ borderBottom: 1, borderColor: "grey.500" }}
                key={i}
            >{`${list.menu} ${list.weight}kg ${list.rep}`}</Typography>
        );
    });

    return (
        <div className="w-72">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{props.menu.listName}</Typography>
                </AccordionSummary>
                <AccordionDetails>{MenuList}</AccordionDetails>
            </Accordion>
        </div>
    );
};
export default MadeListCard;
