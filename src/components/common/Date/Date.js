import "./Date.scss";
import TextBox from "../TextBox/TextBox";
import {useEffect, useState} from "react";

export default function Date({className, isAlways, handleDate}) {

    const [date, setDate] = useState({})

    const handleDateInput = (e) => {
        setDate({...date, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        handleDate(date?.year + '-' + date?.month + '-' + date?.day)
    }, [date])

    return (
        <div className={`date ${isAlways ? "disabled" : ""} ${className}`}>
            <TextBox type="text" className='year' name='year'
                     placeholder='2000' readOnly={isAlways}
                     value={date?.year} onChange={handleDateInput}
            />년
            <TextBox type="text" className='month' name='month'
                     placeholder='01' readOnly={isAlways}
                     value={date?.month} onChange={handleDateInput}
            />월
            <TextBox type="text" className='day' name='day'
                     placeholder='01' readOnly={isAlways}
                     value={date?.day} onChange={handleDateInput}
            />일
        </div>
    )
}
