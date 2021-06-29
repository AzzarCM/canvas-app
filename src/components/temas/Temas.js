import React, {useState,useEffect} from 'react'
import { useLoading, BallTriangle } from '@agney/react-loading';
import { TemaItem } from '../selled/TemaItem'
import { API_HOST } from '../../constants/URLS'
export const Temas = () => {

    const [themes, setThemes] = useState([])
    const [loading, setLoading] = useState(true);
    const { containerProps, indicatorEl } = useLoading({
        loading: loading,
        indicator: <BallTriangle width="50" />,
      });

    useEffect(() => {
        getAllThemes();
    }, [])

    const getAllThemes = async () => {
        const url = `${API_HOST}/themes`
        const resp = await fetch(url)
        const { themes } = await resp.json();
        setThemes(themes);
        setLoading(false);
    }

    return (
        <div className="temas__themes-container animate__animated animate__fadeIn">
            {
                loading ?
                <section style={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                }} {...containerProps}>
                    {indicatorEl}
                </section>
                :
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    { themes.map(item => {
                        return (
                            <TemaItem key={item.id} item={item}/>
                        )
                    })}
                </div> 
            }
        </div>
    )
}
