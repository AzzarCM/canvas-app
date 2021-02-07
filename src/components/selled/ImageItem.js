import React from 'react'

export const ImageItem = (props) => {
    const { img } = props;
    const activo = img.active
    const titulo = img.name;
    const path = `/main/imagen/id/${img.id}`
    return (
        img.active ?
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
        :
        <div className="selled__image-item">
            <img
                src={img.image_url}
                alt={img.name}
                className="selled__imagen no-active"
            />
            <p
                className="selled__title-image"
            >{titulo.toUpperCase()}</p>
            <p style={{color:'red'}}>
                No disponible
            </p>
        </div>
        
    )
}
