import { useState } from "react";

export function AgeCalculator() {
    let currentYear = new Date().getFullYear();

    type DateObject = {
        day: number,
        month: number,
        year: number
    }
    const [getInitialDate, setGetInitialDate] = useState<DateObject>({ day: 1, month: 1, year: currentYear });
    const [getAge, setGetAge] = useState<DateObject>({ day: 0, month: 0, year: 0 })
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    function setDay(e: any) {
        setGetInitialDate({
            ...getInitialDate,
            day: e.target.value,
        })
    }
    function setMonth(e: any) {
        let numberOfMonth = 1;
        let chosenMonth = e.target.value;
        switch (chosenMonth) {
            case "January":
                numberOfMonth = 1;
                break;
            case "February":
                numberOfMonth = 2;
                break;
            case "March":
                numberOfMonth = 3;
                break;
            case "April":
                numberOfMonth = 4;
                break;
            case "May":
                numberOfMonth = 5;
                break;
            case "June":
                numberOfMonth = 6;
                break;
            case "July":
                numberOfMonth = 7;
                break;
            case "August":
                numberOfMonth = 8;
                break;
            case "September":
                numberOfMonth = 9;
                break;
            case "October":
                numberOfMonth = 10;
                break;
            case "November":
                numberOfMonth = 11;
                break;
            case "December":
                numberOfMonth = 12;
                break;
            default:
        }
        setGetInitialDate({
            ...getInitialDate,
            month: numberOfMonth,
        })
    }
    function setYear(e: any) {
        setGetInitialDate({
            ...getInitialDate,
            year: e.target.value,
        })
    }
    function checkAge(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        const currentDay = new Date().getDate();
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        let years = currentYear - getInitialDate.year;
        let months = currentMonth - getInitialDate.month;
        let days = currentDay - getInitialDate.day;

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        if (days < 0) {
            const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
            days = prevMonthLastDay - currentDay + new Date().getDate();
            months--;
        }

        setGetAge({ day: days, month: months, year: years })
        setIsSubmitted(true);

    }
    const startYear = 1900;
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);
    return (
        <div className="w-[400px] h-[300px] bg-white ml-auto text-black mr-auto mt-10 border-t rounded-tl-xl rounded-tr-xl rounded-br-[100px] rounded-bl-xl">
            <form className="flex p-8 " onSubmit={() => checkAge}>
                <div>
                    <p className="p-1 text-xs text-start">Day</p>
                    <select placeholder="DD" className="number-input bg-white font-bold w-[75px] p-2 mr-4 border border-solid border-gray-500 rounded-md" value={getInitialDate.day} onChange={setDay}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((e, key) => {
                            return <option key={key} className="p-0 m-0 ">{e}</option>
                        })}
                    </select>
                </div>
                <div>
                    <p className="p-1 text-xs text-start">Month</p>
                    <select placeholder="MM" className="number-input bg-white font-bold w-[120px] p-2 mr-4 border border-solid border-gray-500 rounded-md" onChange={setMonth}>
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((e, key) => {
                            return <option key={key}>{e}</option>

                        })}
                    </select>
                </div>
                <div>
                    <p className="p-1 text-xs text-start">Year</p>
                    <select placeholder="YYYY" className="number-input bg-white font-bold w-[75px] p-2 border border-solid border-gray-500 rounded-md" value={getInitialDate.year} onChange={setYear}>
                        {years.map((e, key) => {
                            return <option key={key}>{e}</option>
                        })}
                    </select>
                </div>
                <button type="submit" className=" rounded-[50px] bg-purple-600 absolute w-[60px] h-[60px] flex items-center justify-center mt-[80px] ml-[250px] active:bg-orange-500">
                    <img src="public/down-arrow-svgrepo-com.svg " ></img>
                </button>
            </form>
            <div className="pt-2 pl-8 text-5xl font-black text-start ">
                <div className="text-black "><span className="text-purple-600">{isSubmitted ? getAge.year : "- -"}</span> years</div>
                <div className="text-black "><span className="text-purple-600">{isSubmitted ? getAge.month : "- -"}</span> months</div>
                <div className="text-black "><span className="text-purple-600">{isSubmitted ? getAge.day : "- -"}</span> days</div>
            </div>
        </div>
    )
}