import { useNavigate } from "react-router-dom"

export default function Link(path: string, text: string){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(path)
    }
    return (
       <span onClick={handleClick}>{text}</span> 
    )
}