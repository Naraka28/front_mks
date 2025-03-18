import Sidebar from './sidebar/Sidebar';
import { SalesTable } from './tables/salesTable';

function Ventas() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
            <Sidebar />
            <SalesTable />
        </main>
    );
}

export default Ventas;
