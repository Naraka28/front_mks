import Sidebar from './sidebar/Sidebar';
import { BodySizes } from './auxiliaryComponents/BodySizes';

function Sizes() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr] w-full'>
            <Sidebar />
            <BodySizes />
        </main>
    );
}

export default Sizes;