import React, { useEffect, useState } from 'react'
import { API_HOST } from '../../constants/URLS'
export const SideBar = () => {
    const [themes, setThemes] = useState([])
console.log(themes);
    useEffect(() => {
        getAllThemes();
    }, [])

    const getAllThemes = async () => {
        const url = `${API_HOST}/themes`;
        const resp = await fetch(url)
        const { themes } = await resp.json();
        setThemes(themes);
    }

    return (
        <div className="temas__side-bar">
            {themes.map((tema)=>{
                const path = `/main/categoria/${tema.id}`
                return (tema.active ? 
                    <div className="temas__links-temas-container" key={tema.id}>
                        <a 
                        className="temas__link-temas" 
                        key={tema.id} 
                        href={path}
                        >
                        {tema.name.toUpperCase()}{tema.discount && tema.discount > 0 ? (<p style={{margin:0, color: 'red'}}>{`- ${tema.discount*100}%`}</p>) : <></>}
                        </a>
                        
                        
                    </div>
                    :
                    <></>)
            })}
        </div>
    )
}
