import React, {useState} from 'react';
import EditProfile from "../components/EditProfile";
import Orders from "../components/Orders";

const Profile = () => {
    const [currentTab, setCurrentTab] = useState('profile');

    // const setCurrentTab = () => {
    //
    // }

    return (
        <div className="profile">
            <div className="profile__tabs">
                <button onClick={() => {
                    setCurrentTab('profile')
                }}>
                    Profile
                </button>
                <button onClick={() => {
                    setCurrentTab('orders')
                }}>
                    Orders
                </button>
            </div>
            <div className="profile__content">
                {
                    currentTab === 'profile' && <EditProfile/>
                }
                {
                    currentTab === 'orders' && <Orders/>
                }
            </div>
        </div>
    );
};

export default Profile;
