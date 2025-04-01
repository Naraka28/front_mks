import Sidebar from './sidebar/Sidebar';
import { BodyCat } from './auxiliaryComponents/BodyCat';

function Toppings() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr] w-full'>
            <Sidebar />
            <BodyCat />
        </main>
    );
}

export default Toppings;