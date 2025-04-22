import React from 'react'
import BodyCashier from './BodyCashier'
import CashierSidebar from './CashierSidebar/CashierSidebar'

const CashierPending = () => {
  return (
    <div className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
      <div className="sticky top-0 h-screen">
        <CashierSidebar />
      </div>
      <BodyCashier orderStatus='completed' />
    </div>

  )
}

export default CashierPending