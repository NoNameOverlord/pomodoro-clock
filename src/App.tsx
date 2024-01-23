import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [breakTime, setBreakTime] = useState(5)
  const [sessionTime, setSessionTime] = useState(25)
  const [clock, setClock] = useState(
    {minutes: 25,
     seconds: 0,
     status: "paused",
     isSession: true}
  )
  
  let time: any

  //Countdown
  useEffect(() => {
    if (clock.status != "playing"){
      return
    }

    if (clock.seconds <= 0){
      if (clock.minutes == 0){
        time = setTimeout(() =>{
        if (clock.isSession == true){
        setClock(prevState => ({
          ...prevState,
          minutes: breakTime,
          seconds: 0,
          isSession: false
        }))}
        else{
          setClock(prevState => ({
            ...prevState,
            minutes: sessionTime,
            seconds: 0,
            isSession: true
          }))
        }}, 1000)
        return () => clearTimeout(time)
      }
      else{
        time = setInterval(() => {
        setClock(prevState => ({...prevState, seconds: 59, minutes: clock.minutes-1}) )
      }, 1000)
      return () => clearInterval(time)
    }
  }
    else{
      time = setInterval(() => {
      setClock(prevSeconds => ({...prevSeconds, seconds: clock.seconds -1}))
    }, 1000)

    return () => clearInterval(time)}}, [clock.seconds, clock.status, clock.isSession])

    const secondsWithZeroes = clock.seconds.toString().padStart(2, "0")
    const minutesWithZeroes = clock.minutes.toString().padStart(2, "0")
  

  //increment or decrement the minutes of break
  function handleBreak(event:any){
    if (clock.status == "paused"){
      if (event.currentTarget.value == "-"){
        if (breakTime != 1){
        setBreakTime(prevState => prevState-1)
        if (clock.isSession == false){
          setClock(prevState => ({
            ...prevState,
            minutes: breakTime - 1,
            seconds: 0
          }))
        }
      }
      }
      else if (event.currentTarget.value == "+"){
        if(breakTime < 60){
        setBreakTime(prevState => prevState+1)
          if (clock.isSession == false){
            setClock(prevState => ({
              ...prevState,
              minutes: breakTime + 1,
              seconds: 0
            }))
          }
        }
        }
      }
  }

  //increment or decrement the minutes of session
  function handleSession(event:any){
    if (clock.status == "paused"){
      if (event.currentTarget.value == "-"){
        if (sessionTime != 1){
        setSessionTime(prevState => prevState-1)
        if (clock.isSession == true){
          setClock(prevState => ({
            ...prevState,
            minutes: sessionTime-1,
            seconds: 0
          }))
        }
        }
      }
      else if (event.currentTarget.value == "+"){
        if (sessionTime < 60){
        setSessionTime(prevState => prevState+1)
        if (clock.isSession == true){
          setClock(prevState => ({
            ...prevState,
            minutes: sessionTime+1,
            seconds: 0
          }))
        }
        }
      }
    }
  }

  //play or stop the timer
  function playStop(){
    if (clock.status == "playing"){
      setClock(prevState => ({...prevState, status: "paused"}))
    }
    else{
      setClock(prevState =>({...prevState, status: "playing"}))
    }
  }

  //reset everything to its original state
  function reset(){
    let audio = document.getElementById("beep") as any
    audio.pause()
    audio.currentTime = 0
    clearInterval(time)
    clearTimeout(time)
    setBreakTime(5)
    setSessionTime(25)
    setClock({
      minutes: 25,
      seconds: 0,
      status: "paused",
      isSession: true
    })
  }

    if (clock.minutes == 0 && clock.seconds == 0){
      let audio = document.getElementById("beep") as any
      audio?.play()
      audio.currentTimeSession = 0
    }
  


  return (
    <>
      <div id="length-control">
      <div id="break-label">Break Lenght</div>
      <button id="break-decrement" onClick={(e) => handleBreak(e)} value="-">
        <i className="fa fa-arrow-down fa-2x"></i>
      </button>
      <div id="break-length">{breakTime}</div>
      <button id="break-increment" onClick={(e) => handleBreak(e)} value="+">
        <i className="fa fa-arrow-up fa-2x"></i>
      </button>
      </div>
      
      <div id="session-label">Session Length</div>
      <button id="session-decrement" onClick={(e) => handleSession(e)} value="-">
      <i className="fa fa-arrow-down fa-2x"></i>
      </button>
      <div id="session-length">{sessionTime}</div>
      <button id="session-increment" onClick={(e) => handleSession(e)} value="+">
      <i className="fa fa-arrow-up fa-2x"></i>
      </button>

      <div id="timer-label">{clock.isSession? "Session" : "Break"}</div>
      <div id="time-left">{minutesWithZeroes}:{secondsWithZeroes}</div>
      <button id="start_stop" onClick={playStop}>
        <i className="fa fa-play fa-2x"></i>
        <i className="fa fa-pause fa-2x"></i>
      </button>
      <button id="reset" onClick={reset}>
        <i className="fa fa-refresh fa-2x"></i>
      </button>
      <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </>
  )
}

export default App
