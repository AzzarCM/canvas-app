import React from 'react'

export const ImageItem = (props) => {
    const { img } = props;
    const titulo = img.name;

    const path = `/main/imagen/id/${img.id}`
    return (
        <div className="selled__image-item">
            <a href={path}>
            <img
                src={img.image_url}
                alt={img.name}
                className="selled__imagen"
            />
            </a> 
            <p
                className="selled__title-image"
            >{titulo.toUpperCase()}</p>
        </div>
    )
}
