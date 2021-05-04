import React, {useState} from 'react';
import EditProfile from "../components/EditProfile";
import Orders from "../components/Orders";
import profileIcon from "../assets/icons/profile.svg"
import ordersIcon from "../assets/icons/package.svg"
import {classNames} from "../utils/classNames";

const ProfilePage = () => {
    const [currentTab, setCurrentTab] = useState('orders');

    return (
        <div className="profile">
            <div className="profile__tabs">
                <div
                    className={classNames([currentTab === 'profile' && 'active', "profile__tab"])}
                    onClick={() => {
                    setCurrentTab('profile')
                }}>
                    <img className="profile__icon" src={profileIcon} alt="profile"/>
                </div>
                <div
                    className={classNames([currentTab === 'orders' && 'active', "profile__tab"])}
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

export default ProfilePage;
