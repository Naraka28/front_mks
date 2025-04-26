import Sidebar from './sidebar/Sidebar';
import { BodyFlavours } from './auxiliaryComponents/BodyFlavours';

function Flavours() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr] w-full'>
            <Sidebar />
            <BodyFlavours />
        </main>
    );
}

export default Flavours;