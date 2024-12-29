import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function Topbar() {
const [currentTime , setCurrentTime] = useState("")

useEffect(() =>
{
    setInterval(() => {
        setCurrentTime(dayjs().format('dddd, MMMM D, YYYY h:mm A'))
        
    });
},[])

  return (
    <header>
        <div className="bg-primary py-1">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mb-0 text-center text-white">{currentTime}</div>
                        </div>
                    </div>
                </div>
            
        </div>
    </header>
  )
}
