import React, { useEffect, useState } from 'react'
import { API_HOST } from '../../constants/URLS'
export const SideBar = () => {
    const [themes, setThemes] = useState([])

    useEffect(() => {
        getAllThemes();
    }, [])

    const getAllThemes = async () => {
        const url = `${API_HOST}/themes`;
        const resp = await fetch(url)
        const { themes } = await resp.json();
        const temas = themes.map(theme => {
            return {
                id: theme.id,
                name: theme.name,
                image_url: theme.image_url,
            }
        })
        setThemes(temas);
    }

    return (
        <div className="temas__side-bar">
            {themes.map((tema)=>{
                const path = `/main/categoria/${tema.id}`
                return <a 
                className="temas__link-temas" 
                key={tema.id} 
                href={path}>
                    {tema.name.toUpperCase()}
                </a>
            })}
        </div>
    )
}
