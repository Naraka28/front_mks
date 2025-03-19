import Sidebar from './sidebar/Sidebar';
import { BodySales } from './auxiliaryComponents/BodySales';

function Sales() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
            <Sidebar />
            <BodySales />
        </main>
    );
}

export default Sales;
