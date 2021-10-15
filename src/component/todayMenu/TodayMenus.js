import dayjs from "dayjs";

const TodayMenus = () => {
    return (
        <>
            <div>{dayjs().format("YYYY年MM月DD日")}</div>
            <div>今日のメニュー</div>

        </>
    );
};

export default TodayMenus;
