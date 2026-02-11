import { React, useState } from "react"

function FocusInput() {

    const [task, setTask] = useState("")

    const handleSubmit = () => {
        if (!task.trim()) return;
        console.log(task);
        setTask("")
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    }

    return (
        <>
            <div className="flex flex-col items-center gap-7 justify-center mt-24">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What is your main focus today?"
                    className="bg-transparent outline-none text-3xl text-white text-center border-b-2 border-gray-600 w-full max-w-2xl pb-2 focus:border-yellow-400 transition-colors duration-300"
                />
                <button className="relative block group " onClick={handleSubmit}>
                    <span className="absolute inset-0 bg-yellow-400 rounded-lg"></span>
                    <div className="transition bg-white relative border-2 rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
                        <div className="p-2 ">
                            <p className="text-xl font-outerSans font-medium">Set Goal</p>
                        </div>
                    </div>
                </button>
            </div>
        </>
    )
}

export default FocusInput