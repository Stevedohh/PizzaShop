import React from 'react';
import {classNames} from '../../utils/classNames'

const Input = (props) => {
    const {label, onChange, className, placeholder, type, register, name, children, ...rest} = props;

    return (
        <div className={classNames(['input', className, `input--${type}`])}>
            <label className='input__label'>
                {label}
                    <input
                        ref={register}
                        name={name}
                        className={classNames(['input__element'])}
                        placeholder={placeholder}
                        type={type}
                        onChange={onChange}
                        {...rest}
                    />
            </label>
            {children}
        </div>
    );
};

export default Input;
