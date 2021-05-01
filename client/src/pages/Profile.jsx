import React, {useState} from 'react';
import EditProfile from "../components/EditProfile";
import Orders from "../components/Orders";
import profileIcon from "../assets/icons/profile.svg"
import ordersIcon from "../assets/icons/package.svg"

const Profile = () => {
    const [currentTab, setCurrentTab] = useState('orders');

    // const setCurrentTab = () => {
    //
    // }

    return (
        <div className="profile">
            <div className="profile__tabs">
                <div onClick={() => {
                    setCurrentTab('profile')
                }} className="profile__tab">
                    <img className="profile__icon" src={profileIcon} alt="profile"/>
                </div>
                <div
                    className="profile__tab"
                    onClick={() => {
                    setCurrentTab('orders')
                }}>
                    <img className="profile__icon" src={ordersIcon} alt="profile"/>
                </div>
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
