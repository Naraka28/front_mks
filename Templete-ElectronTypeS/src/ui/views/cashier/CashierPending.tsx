import React from 'react'
import BodyCashier from './BodyCashier'
import CashierSidebar from './CashierSidebar/CashierSidebar'

const CashierPending = () => {
  return (
    <div className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
      <CashierSidebar />
      <BodyCashier />
    </div>
  )
}

export default CashierPending