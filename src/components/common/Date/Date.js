import "./Date.scss";
import TextBox from "../TextBox/TextBox";

export default function Date(props) {
    return (
        <div className={`date ${props.className}`}>
            <TextBox type="text" className='year' placeholder='2000'/>년
            <TextBox type="text" className='month' placeholder='01'/>월
            <TextBox type="text" className='day' placeholder='01'/>일
        </div>
    )
}
