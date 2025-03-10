import MainDashboard from './mainDashboard/MainDashboard';
import Sidebar from './sidebar/Sidebar';

function Dashboard() {
    return (
        <main className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
            <Sidebar />
            <MainDashboard />
        </main>
    );
}

export default Dashboard;
