import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import dayjs from "dayjs";
import { isSameDay, isSameMonth, isFirstDay } from "../../funstions/calender"; 

const useStyles = makeStyles(() =>
    createStyles({
        element: {
            borderRight: "1px solid #ccc",
            borderBottom: "1px solid #ccc",
            height: "18vh",
        },
        date: {
            padding: "5px 0",
            height: "24px",
        },
        today: {
            display: 'inline-block',
            lineHeight: '24px',
            width: '24px',
            backgroundColor: '#1a73e8',
            color: '#fff',
            borderRadius: '50%'
        }
    })
);

const CalenderElement = (props) => {
    const day = props.day
    const classes = useStyles();
    const today = dayjs();
    const format = isFirstDay(day) ? "M月D日" : "D";
    const isToday = isSameDay(day, today)
    const isCurrentMonth = isSameMonth(day, today);
    const textColor = isCurrentMonth ? 'textPrimary' : 'textSecondary';

    return (
        <div className={classes.element}>
            <Typography className={classes.date} color={textColor} align="center" variant="caption" component="div">
                <span className={isToday ? classes.today : ''}>

                {day.format(format)}
                </span>
            </Typography>
        </div>
    );
};

export default CalenderElement;
