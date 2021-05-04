import React, {useEffect} from 'react';
import Input from "./shared/Input";
import {Button} from "./index";
import {useForm} from "react-hook-form";
import {ProductService} from "../services/product";
import {toast, ToastTypes} from "../utils/toast";
import {useDispatch} from "react-redux";
import {fetchPizzas} from "../redux/actions/pizzasActions";

const ProductModal = ({product, hideModal}) => {
    const {register, handleSubmit, errors, reset} = useForm();
    const productService = new ProductService();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        if (product) {
            productService.update(product.id, data, (res) => {
                toast(ToastTypes.SUCCESS, "Успех", "Товар успешно обновлен");
                dispatch(fetchPizzas());
                hideModal();
            })
        } else {
            productService.create(data, (res) => {
                toast(ToastTypes.SUCCESS, "Успех", "Товар добавлен");
                dispatch(fetchPizzas());
                hideModal();
            })
        }
    }

    useEffect(() => {
        if(product) {
            reset({
                imageUrl: product.imageUrl,
                name: product.name,
                type: product.type,
                category: product.category,
                size: product.size,
                price: product.price,
            })
        }
    }, [product])

    return (
        <div className="product-modal">
            <form onSubmit={handleSubmit(onSubmit)} className="product-modal__form">
                <Input
                    type="text"
                    label="Ссылка на картинку"
                    name="imageUrl"
                    register={register({required: true})}
                >
                    {errors.imageUrl && (<span className="error-message">
                                Обязательное поле
                            </span>)}
                </Input>
                <Input
                    type="text"
                    label="Название"
                    name="name"
                    register={register({required: true})}
                >
                    {errors.name && (<span className="error-message">
                                Обязательное поле
                            </span>)}
                </Input>
                <Input
                    type="text"
                    label="Тип теста"
                    name="type"
                    register={register({required: true})}
                >
                    {errors.type && (<span className="error-message">
                                Обязательное поле
                            </span>)}
                </Input>
                <Input
                    type="text"
                    label="Категория"
                    name="category"
                    register={register({required: true})}
                >
                    {errors.category && (<span className="error-message">
                                Обязательное поле
                            </span>)}
                </Input>
                <Input
                    type="number"
                    label="Размер"
                    name="size"
                    register={register({required: true})}
                >
                    {errors.size && (<span className="error-message">
                                Обязательное поле
                            </span>)}
                </Input>
                <Input
                    type="number"
                    label="Цена"
                    name="price"
                    register={register({required: true})}
                >
                    {errors.price && (<span className="error-message">
                                Обязательное поле
                            </span>)}
                </Input>
                <Button submit className="sign__form-submit">
                    {
                        product ? 'Обновить' : 'Добавить'
                    }
                </Button>
            </form>
        </div>
    );
};

export default ProductModal;
