import { useState } from 'react';
import ImageAd from '../../assets/Ad.png';
import Menu from '../user/Menu';

function UserHome() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div>
            <img
                src={ImageAd}
                alt="Publicidad"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowMenu(true)}
            />
            {showMenu && <Menu />}
        </div>
    );
}

export default UserHome;
