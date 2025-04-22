import Sidebar from './sidebar/Sidebar';
import { BodyToppings } from './auxiliaryComponents/BodyToppings';

function Toppings() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr] w-full'>
            <Sidebar />
            <BodyToppings />
        </main>
    );
}

export default Toppings;