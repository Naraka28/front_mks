import Sidebar from './sidebar/Sidebar';
import { ReportsGrid } from './reports/ReportsGrid'

function Reports() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
            <Sidebar />
            <ReportsGrid />
        </main>
    );
}

export default Reports;
