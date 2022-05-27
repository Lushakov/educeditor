import { useState } from "react"
import styled from "styled-components"
import Slices from "./slices/slices"
import Toolkits from "./toolkits/tool-kits"

const style = {
    heigthMax: '15px',
    padding: '3px 6px',
    fontSize: '14px',
    // backgroundColor: '#fff0',
    borderBottom: '1px solid #fbfbfb'
}

const Tabs = {
    BLOCKS: 'blocks',
    TOOLKITS: 'toolkits',
}

const Wrapper = styled.div`
    
`

const UnitControlBlock = () => {
    const [currentTab, setCurrentTab] = useState(Tabs.BLOCKS)
    return (
        <>
            <nav className="ps-2 mt-2">
                <div className="nav nav-pills" id="nav-tab">
                    <button
                        className={`nav-link ${currentTab === Tabs.BLOCKS ? 'active' : ''}`}
                        style={style}
                        onClick={() => setCurrentTab(Tabs.BLOCKS)}
                    >
                        Блоки
                    </button>
                    <button
                        className={`nav-link ${currentTab === Tabs.TOOLKITS ? 'active' : ''}`}
                        style={style}
                        onClick={() => setCurrentTab(Tabs.TOOLKITS)}
                    >
                        Инструменты
                    </button>
                </div>
            </nav>
            
            <Slices isVisible={currentTab === Tabs.BLOCKS}/>
            <Toolkits isVisible={currentTab === Tabs.TOOLKITS}/>
            

        </>
    )
}
export default UnitControlBlock

