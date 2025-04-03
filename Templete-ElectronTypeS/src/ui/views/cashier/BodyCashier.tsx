import React from 'react'
import { UniversalTopBar } from '../dashboard/auxiliaryComponents/UniversalTopBar'

const BodyCashier = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow h-[200vh]">
      <div className="w-full px-4 grid gap-3 grid-cols-12">
        <div className="col-span-12 w-full">
          <UniversalTopBar />
        </div>
        <div className="col-span-12 grid grid-cols-3 gap-4 p-4 place-items-center">
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div>
      </div>
    </div>
  )
}

export default BodyCashier
