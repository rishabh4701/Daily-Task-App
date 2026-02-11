import { React, useState } from "react"

function FocusInput() {

const [task, setTask] = useState("")

const handleSubmit = () => {
    if(!task.trim()) return;
    console.log(task);
    setTask("")
}

const handleKeyDown = (e) => {
    if(e.key === 'Enter') handleSubmit();
}

    return(
        <>
        <div className="flex items-center gap-4 justify-center mt-24">
            <input 
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyDown} 
                placeholder="What is your main focus today?"
                className="bg-transparent outline-none text-3xl text-white text-center border-b-2 border-gray-600 w-full max-w-2xl pb-2 focus:border-yellow-400 transition-colors duration-300"
            />
            <button 
                onClick={handleSubmit} 
                className="bg-yellow-400 text-black px-6 py-2 rounded-md hover:bg-yellow-500 active:scale-95 transition-colors duration-200"
            >Done</button>
        </div>
        </>
    )
}

export default FocusInput