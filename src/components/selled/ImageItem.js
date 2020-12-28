import React from 'react'

export const ImageItem = (props) => {
    const { img } = props;
    const titulo = img.name;

    const path = `/main/themes/${img.id}`
    return (
        <div className="selled__image-item">
            <a href={path}>
            <img
                src={img.url}
                alt={img.name}
                className="selled__imagen"
            />
            </a> 
            <p
                className="selled__title-image"
            >{titulo.toUpperCase()}</p>
            <p
                className="selled__price-image"
            >{`$${img.price}`}</p>
        </div>
    )
}
