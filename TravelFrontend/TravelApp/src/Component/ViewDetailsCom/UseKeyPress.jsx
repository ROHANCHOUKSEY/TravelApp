import { useEffect } from "react";

const UseKeyPress = (targetKey, action) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if(event.key === targetKey){
                action();
            }
        }

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [targetKey, action]);
}   

export default UseKeyPress;