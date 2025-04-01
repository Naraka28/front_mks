import Sidebar from './sidebar/Sidebar';
import { BodyInventory } from './auxiliaryComponents/BodyInventory';

function Products() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr] w-full'>
            <Sidebar />
            <BodyInventory />
        </main>
    );
}

export default Products;
