import React from 'react'
import CashierAccountToggle from './CashierAccountToggle'
import { CashierRouteSelect } from './CashierRouteSelect'
import { CashierSidebarFooter } from './CashierSidebarFooter'

const CashierSidebar = () => {
    return (
        <div>
            <div className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <CashierAccountToggle />
                <CashierRouteSelect />
            </div>
            <CashierSidebarFooter />
        </div>
    )
}

export default CashierSidebar
