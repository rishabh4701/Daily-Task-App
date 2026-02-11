import React, { useEffect, useState } from "react"

function FocusInput() {

    const [task, setTask] = useState(() => {
        return localStorage.getItem("focus_task" || "")
    })
    const [completed, isCompleted] = useState(() => {
        return localStorage.getItem("focus_isCompleted" || false)
    })
    const [isSet, setIsSet] = useState(() => {
        return localStorage.getItem("focus_isSet" || false)
    });

    useEffect(() => {
        localStorage.setItem("focus_task", task)
        localStorage.setItem("focus_set", isSet)
        localStorage.setItem("focus_completed", completed)
    },[task, isCompleted, isSet])
    

    const handleSubmit = () => {
        if (!task.trim()) return;
        console.log(task);
        setIsSet(true);
    }

    const handleCompletion = () => {
        isCompleted(true);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full bg-black text-white mt-20">
                {!isSet ? (
                    <div className="flex flex-col items-center gap-7 w-full max-w-2xl px-4">
                        <input
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="What is your main focus today?"
                            autoFocus
                            className="
                           bg-transparent 
                           outline-none 
                           text-3xl 
                           text-white 
                           text-center 
                           border-b-2 
                           border-gray-600 
                           w-full 
                           pb-2 
                           focus:border-yellow-400 
                           transition-colors 
                           duration-300
                        "
                        />

                        <button className="relative block group" onClick={handleSubmit}>
                            <span className="absolute inset-0 bg-yellow-400 rounded-lg"></span>
                            <div className="transition bg-white relative border-2 rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
                                <div className="p-2">
                                    <p className="text-xl font-medium text-black">Set Goal</p>
                                </div>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-6 animate-bounce-in">
                        {!completed ? (
                            <><h2 className="text-gray-500 uppercase tracking-widest text-sm">Today's Focus</h2>
                            <h1 className="text-5xl md:text-6xl font-bold text-center text-yellow-400">
                                {task}
                            </h1><div class="flex items-center">
                                    <input onClick={handleCompletion} id="link-checkbox" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                                    <label for="link-checkbox" className="select-none ms-2 text-sm font-medium text-heading">Task Completed ?</label>
                                </div></>
                        ) : (
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-yellow-400 mb-2">Great Job!</h1>
                                <p className="text-xl text-gray-400">See you tomorrow!</p>                               
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default FocusInput