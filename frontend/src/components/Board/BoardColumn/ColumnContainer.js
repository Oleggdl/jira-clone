import React, {useEffect, useRef, useState} from 'react'
import ColumnComponent from "./ColumnComponent"

const ColumnContainer = ({columnName}) => {

    const [isSettings, setIsSettings] = useState(false)
    const [isSettingsActive, setIsSettingsActive] = useState('')

    const settingsRef = useRef(null)

    useEffect(() => {
        window.addEventListener("click", function (e) {
             if(e.target !== settingsRef.current){
                setIsSettings(false)
                setIsSettingsActive('')
            }
        })

        return window.removeEventListener("click", function (e) {
            if(e.target !== settingsRef.current){
                setIsSettings(false)
                setIsSettingsActive('')
            }
        })
    })

    const settingsColumnHandler = () => {
        !!isSettings ? setIsSettings(false) : setIsSettings(true)
        !!isSettingsActive ? setIsSettingsActive('') : setIsSettingsActive('settings-active')
    }

    return (
        <>
            <ColumnComponent columnName={columnName} settingsColumnHandler={settingsColumnHandler}
                             isSettings={isSettings} isSettingsActive={isSettingsActive} settingsRef={settingsRef}/>
        </>
    )
}

export default ColumnContainer
