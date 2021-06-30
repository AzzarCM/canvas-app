import React, {useState,useEffect}  from 'react'
import { useLoading, BallTriangle } from '@agney/react-loading';
import { TemaItem } from '../selled/TemaItem'
import { API_HOST } from '../../constants/URLS'

export const TemasHome = () => {

    const [themes, setThemes] = useState([])
    const [loading, setLoading] = useState(true);
    const { containerProps, indicatorEl } = useLoading({
        loading: loading,
        indicator: <BallTriangle width="50" />,
      });
    
    function getThemes() {
        const url = `${API_HOST}/themes/home`
        return fetch(url).then((res)=>{
            return res.json()
        })
        .then((result)=>{
            return result
        })
    }
    
    useEffect(() => {
        getThemes()
        .then((res)=>{
            if(res.error){
                console.log('hubo un error cargando los temas :C');
            }else{
                setThemes(res.paintings);
                setLoading(false);
            }
        })
    }, [])
    
      

    return (
        <div  className="temas__themes-container animate__animated animate__fadeIn">
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
