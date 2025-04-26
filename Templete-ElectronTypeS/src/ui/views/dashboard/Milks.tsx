import Sidebar from './sidebar/Sidebar';
import { BodyMilks } from './auxiliaryComponents/BodyMilks';

function Milks() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr] w-full'>
            <Sidebar />
            <BodyMilks />
        </main>
    );
}

export default Milks;