import React from 'react'

export const ImageItem = (props) => {
    const {img} = props;
    const titulo = img.name;
    return (
        <div className="selled__image-item">
            <img 
                src={img.url} 
                alt={img.name}
                className="selled__imagen"
                
            />
            <p
                className="selled__title-image"
            >{titulo.toUpperCase()}</p>
            <p
                className="selled__price-image"
            >{`$${img.price}`}</p>
        </div>
    )
}
