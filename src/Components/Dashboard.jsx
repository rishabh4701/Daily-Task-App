import React from 'react'
import FocusInput from './FocusInput'

const Dashboard = () => {
    return (
        <>
            <div className='min-h-screen w-full bg-black overflow-x-hidden'>
                <div className="bg-yellow-400 text-center py-2">
                    <p className="text-center pt-4 pb-4">Daily Task Manager | One Task Only !</p>
                </div>
                <FocusInput />
            </div>

        </>
    )
}

export default Dashboard
