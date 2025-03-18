import Sidebar from './sidebar/Sidebar';
import { EmployeesTable } from './tables/EmployeesTable';

function Trabajadores() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
            <Sidebar />
            <EmployeesTable />
        </main>
    );
}

export default Trabajadores;