import React from 'react'
import AccountToggle from './AccountToggle'
import { RouteSelect } from './RouteSelect'
import { SidebarFooter } from './SidebarFooter'

const Sidebar = () => {
    return (
        <div>
            <div className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <AccountToggle />
                <RouteSelect />
            </div>
            <SidebarFooter />
        </div>
    )
}

export default Sidebar