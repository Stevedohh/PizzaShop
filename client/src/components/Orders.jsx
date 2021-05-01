import React from 'react';

const Orders = () => {
    return (
        <div className="orders">
            <h1 className="orders__title">Ваши заказы</h1>
            <table className="orders__table">
                <thead>
                    <tr className="orders__row orders__row--head">
                        <td className="orders__row-number">
                            #
                        </td>
                        <td className="orders__row-date">
                            Дата
                        </td>
                        <td className="orders__row-address">
                            Адресс
                        </td>
                        <td className="orders__row-phone">
                            Телефон
                        </td>
                        <td className="orders__row-email">
                            Email
                        </td>
                        <td className="orders__row-cost">
                            Сумма
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="orders__row">
                        <td className="orders__row-number">
                            2
                        </td>
                        <td className="orders__row-date">
                            18:02 19.04.2021
                        </td>
                        <td className="orders__row-address">
                            вулиця Солом'янська, 3Б, Київ, 03110
                        </td>
                        <td className="orders__row-phone">
                            067 540 3131
                        </td>
                        <td className="orders__row-email">
                            stevedoh@mail.com
                        </td>
                        <td className="orders__row-cost">
                            <strong>12313</strong> грн
                        </td>
                    </tr>
                    <tr className="orders__row">
                        <td className="orders__row-number">
                            3
                        </td>
                        <td className="orders__row-date">
                            18:02 19.04.2021
                        </td>
                        <td className="orders__row-address">
                            Харьков, Харьковская область, 61000
                        </td>
                        <td className="orders__row-phone">
                            067 120 1402
                        </td>
                        <td className="orders__row-email">
                            steve@mail.com
                        </td>
                        <td className="orders__row-cost">
                            <strong>112</strong> грн
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
