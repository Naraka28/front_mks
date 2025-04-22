import React from 'react'
import { UniversalTopBar } from '../auxiliaryComponents/UniversalTopBar'
import Sidebar from '../sidebar/Sidebar'
import ToppingsForm from '../forms/ToppingsForm'

const CreateCatRegister = () => {
  return (
    <div className='grid gap-4 p-4 grid-cols-[220px,_1fr] w-full'>
        <Sidebar />
        <div className="w-full px-4 grid gap-3 grid-cols-12">
            <div className="col-span-12 w-full">
                <UniversalTopBar />
            </div>
            <div className="col-span-12 w-full">
                <ToppingsForm />
            </div>
        </div>
    </div>
  )
}

export default CreateCatRegister