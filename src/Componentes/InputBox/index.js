import './style.css'

export default function InputBox(props){
    return (
        <div className={`inputBox ${props.className}`}>
            {props.children}
        </div>
    )
}