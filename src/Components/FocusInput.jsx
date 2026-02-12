import React, { useState, useEffect } from "react";


const getToday = () => new Date().toLocaleDateString();

const isSavedForToday = () => {
  const savedDate = localStorage.getItem("focus_date");
  return savedDate === getToday();
};

const loadFromStorage = () => {
  if (!isSavedForToday()) {
    return {
      task: "",
      isSet: false,
      isCompleted: false,
    };
  }

  return {
    task: localStorage.getItem("focus_task") || "",
    isSet: localStorage.getItem("focus_isSet") === "true",
    isCompleted: localStorage.getItem("focus_isCompleted") === "true",
  };
};


function FocusInput() {

  const { task: savedTask, isSet: savedIsSet, isCompleted: savedIsCompleted } =
    loadFromStorage();

  const [task, setTask] = useState(savedTask);
  const [isSet, setIsSet] = useState(savedIsSet);
  const [isCompleted, setIsCompleted] = useState(savedIsCompleted);


  useEffect(() => {
    localStorage.setItem("focus_task", task);
    localStorage.setItem("focus_isSet", isSet);
    localStorage.setItem("focus_isCompleted", isCompleted);
    localStorage.setItem("focus_date", getToday());
  }, [task, isSet, isCompleted]);


  const handleSetTask = () => {
    if (!task.trim()) return;
    setIsSet(true);
  };

  const handleCompletion = (e) => {
    setIsCompleted(e.target.checked);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSetTask();
  };


  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center font-sans px-4 overflow-x-hidden">
      
      {!isSet ? (
        <div className="flex flex-col items-center gap-7 w-full max-w-2xl animate-in fade-in duration-700">
          <h1 className="text-gray-500 uppercase tracking-widest text-sm">
            New Day, One Focus
          </h1>

          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What is your main focus today?"
            autoFocus
            className="bg-transparent outline-none text-3xl md:text-4xl text-center border-b-2 border-gray-700 w-full pb-4 focus:border-yellow-400 transition-all duration-300 placeholder-gray-600"
          />

          <button
            onClick={handleSetTask}
            className="relative group mt-4"
          >
            <span className="absolute inset-0 bg-yellow-400 rounded-lg"></span>
            <div className="relative bg-white border-2 rounded-lg transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
              <div className="px-8 py-2">
                <p className="text-xl font-bold text-black">
                  SET FOCUS
                </p>
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-500 text-center">
          <h2 className="text-gray-500 uppercase tracking-widest text-xs font-semibold">
            TODAY'S FOCUS
          </h2>

          <h1
            className={`text-5xl md:text-7xl font-bold transition-all duration-500 ${
              isCompleted
                ? "text-gray-600 line-through blur-[1px]"
                : "text-white"
            }`}
          >
            {task}
          </h1>

          <div className="mt-12 flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <input
                id="daily-check"
                type="checkbox"
                checked={isCompleted}
                onChange={handleCompletion}
                className="peer appearance-none w-8 h-8 border-2 border-gray-500 rounded-full checked:bg-green-500 checked:border-green-500 transition-all cursor-pointer"
              />

              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <label
              htmlFor="daily-check"
              className={`select-none text-lg font-medium transition-colors ${
                isCompleted
                  ? "text-green-500"
                  : "text-gray-400 group-hover:text-white"
              }`}
            >
              {isCompleted ? "Completed" : "Mark as Done"}
            </label>
          </div>

          {isCompleted && (
            <p className="mt-4 text-gray-600 text-sm animate-pulse">
              Great work. See you tomorrow.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FocusInput;
