import React from 'react'

export const ImageItem = ({ img }) => {

    const titulo = img.name;
    const descuento = img.theme.discount;
    const path = `/main/imagen/id/${img.id}`
    return (
        <div>
            {
                img && (
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
                            >{titulo.toUpperCase()}{descuento > 0 ? <p style={{ textAlign: 'center', color: 'red' }}>{`- ${descuento * 100}%`}</p> : <></>}</p>
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
                            <p style={{ color: 'red' }}>
                                No disponible
                            </p>
                        </div>
                )
            }
        </div>
    )
}
