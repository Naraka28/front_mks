import Sidebar from './sidebar/Sidebar';
import { BodyInventory } from './auxiliaryComponents/BodyInventory';

function Inventory() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr] w-full'>
            <Sidebar />
            <BodyInventory />
        </main>
    );
}

export default Inventory;
