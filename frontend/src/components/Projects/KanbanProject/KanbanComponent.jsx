import React from 'react'
import SideBarContainer from "../../common/SideBar/SideBarContainer"
import {Route, Routes} from "react-router-dom"
import KanbanContainer from "./KanbanContainer"
import BoardContainer from "../../Board/BoardComponent/BoardContainer";

const KanbanComponent = () => {


    return (
        <>
            <SideBarContainer/>
            <Routes>
                {/*<Route path={'/'} exact element={<KanbanContainer/>}/>*/}
                <Route path={'/board'} exact element={<BoardContainer/>}/>
            </Routes>
        </>
    )
}

export default KanbanComponent
