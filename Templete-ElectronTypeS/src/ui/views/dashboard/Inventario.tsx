import Sidebar from './sidebar/Sidebar';
import InventoryTable from './tables/InventoryTable';

function Inventario() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
            <Sidebar />
            <InventoryTable />
        </main>
    );
}

export default Inventario;
