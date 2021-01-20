import React, {ButtonHTMLAttributes, MouseEvent, PropsWithChildren} from 'react';

interface ButtonProps {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    id?: string;
    className?: string;
    color?: 'primary' | 'secondary' | 'inherit';
    size?: 'small' | 'medium' | 'large';
    tabIndex?: number;
    onClick?: (event: MouseEvent) => void;
    variant?: 'contained' | 'outlined';
}

const Button = React.forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>((props, ref) => {

    const {
        type,
        onClick,
        children,
        size = 'medium',
        className,
        tabIndex,
        id,
        color = 'primary',
        variant = 'contained',
    } = props;

    const sizeClass = ` size-${size}`;
    const variantClass = ` ${variant}`;
    const colorClass = ` color-${color}`;
    const modifierClasses = variantClass + sizeClass + colorClass;

    return (
        <button
            ref={ref}
            type={type}
            className={`button ${modifierClasses} ${className ?? ""}`}
            id={id}
            onClick={onClick}
            tabIndex={tabIndex}
        >
            {children}
        </button>
    );
});

export default Button;
