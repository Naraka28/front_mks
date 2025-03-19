import Sidebar from './sidebar/Sidebar';
import { BodyEmployees } from './auxiliaryComponents/BodyEmployees';

function Employees() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
            <Sidebar />
            <BodyEmployees />
        </main>
    );
}

export default Employees;