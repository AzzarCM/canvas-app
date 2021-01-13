import React, { useEffect, useState } from 'react'

export const SideBar = () => {
    const [themes, setThemes] = useState([])
    console.log(themes);

    useEffect(() => {
        getAllThemes();
    }, [])

    const getAllThemes = async () => {
        const url = "https://canvas-api-rest.herokuapp.com/api/themes";
        const resp = await fetch(url)
        const { themes } = await resp.json();
        const temas = themes.map(theme => {
            return {
                id: theme.id,
                name: theme.name,
                description: theme.description,
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
