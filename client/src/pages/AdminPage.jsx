import React, {useState} from 'react';
import {classNames} from "../utils/classNames";
import profileIcon from "../assets/icons/profile.svg";
import ordersIcon from "../assets/icons/package.svg";
import productsIcon from "../assets/icons/box.svg";
import EditProfile from "../components/EditProfile";
import Orders from "../components/Orders";
import Products from "../components/Products";

const AdminPage = () => {
    const [currentTab, setCurrentTab] = useState('products');

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
                <div
                    className={classNames([currentTab === 'products' && 'active', "profile__tab"])}
                    onClick={() => {
                        setCurrentTab('products')
                    }}>
                    <img className="profile__icon" src={productsIcon} alt="profile"/>
                </div>
            </div>
            <div className="profile__content">
                {
                    currentTab === 'profile' && <EditProfile/>
                }
                {
                    currentTab === 'orders' && <Orders admin/>
                }
                {
                    currentTab === 'products' && <Products/>
                }
            </div>
        </div>
    );
};

export default AdminPage;
