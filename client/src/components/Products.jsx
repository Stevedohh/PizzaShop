import React, {useEffect, useState} from 'react';
import Button from "./shared/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchPizzas} from "../redux/actions/pizzasActions";
import {useModal} from "react-modal-hook";
import Modal from "react-modal";
import ProductModal from "./ProductModal";
import {ProductService} from "../services/product";
import {toast, ToastTypes} from "../utils/toast";

const Products = () => {
    Modal.setAppElement('#root')
    const products = useSelector(({ pizzas }) => pizzas.items);
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const productService = new ProductService();

    useEffect(() => {
        dispatch(fetchPizzas());
    }, [])

    const onEditClick = (product) => {
        setSelectedProduct(product);
        showModal();
    }

    const onDeleteClick = (id) => {
        if (window.confirm('Вы действительно хотите удалить?')) {
            productService.delete(id, (res) => {
                toast(ToastTypes.SUCCESS, 'Успех', 'Товар успешно удален');
                dispatch(fetchPizzas());
                hideModal();
            }, (e) => {
                toast(ToastTypes.DANGER, 'Ошибка', e.message);
            })
        }
    }

    const onHideModal = () => {
        setSelectedProduct(null);
        hideModal()
    }

    const [showModal, hideModal] = useModal(() => (
        <Modal
            overlayClassName="overlay"
            className="modal-content"
            isOpen
            onRequestClose={onHideModal}
            shouldCloseOnOverlayClick={true}
        >
            <ProductModal product={selectedProduct} hideModal={hideModal}/>
        </Modal>
    ), [selectedProduct]);

    const renderProducts = () =>
        products.map((product) => {
            return (
                <tr className="products__row" key={product.id}>
                    <td className="products__row-img">
                        <img src={product.imageUrl} alt=""/>
                    </td>
                    <td className="products__row-name">
                        <span>
                            {product.name}
                        </span>
                        <span>
                            {product.type} тесто, {product.size} см
                        </span>
                    </td>
                    <td className="products__row-category">
                        {product.category}
                    </td>
                    <td className="products__row-price">
                        {product.price}
                    </td>
                    <td className="products__row-actions">
                        <Button outline onClick={() => {onEditClick(product)}}>Редактировать</Button>
                        <Button outline onClick={() => {onDeleteClick(product.id)}}>Удалить</Button>
                    </td>
                </tr>
            )
        })

    return (
        <div className="products">
            <div className="products__header">
                <h1 className="products__title">Товары</h1>
                <Button className="products__add-btn" onClick={showModal}>Добавить товар</Button>
            </div>
            <table className="products__table">
                <tbody>
                    {renderProducts()}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
