import React from 'react'
import SideBarContainer from "../../common/SideBar/SideBarContainer"
import {Route, Routes} from "react-router-dom"
import BoardContainer from "../../Board/BoardComponent/BoardContainer"
import BacklogContainer from "../../Backlog/BacklogComponent/BacklogContainer";

const ScrumComponent = () => {


    return (
        <>
            <SideBarContainer/>
            <Routes>
                <Route path='board' element={<BoardContainer/>}/>
                <Route path='backlog' element={<BacklogContainer/>}/>
            </Routes>
        </>
    )
}

export default ScrumComponent