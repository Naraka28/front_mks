import Sidebar from './sidebar/Sidebar';
import { BodyProducts } from './auxiliaryComponents/BodyProducts';

function Products() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr] w-full'>
            <Sidebar />
            <BodyProducts />
        </main>
    );
}

export default Products;
