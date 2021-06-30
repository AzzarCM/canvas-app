import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from '../main/Navbar'
import { ImageItem } from '../selled/ImageItem';
import { useLoading, BallTriangle } from '@agney/react-loading';
import { Footer } from '../main/Footer';
import { SearchBar } from './SearchBar';
import { API_HOST } from '../../constants/URLS'

export const Search = () => {

    const { searchText } = useSelector(state => state.ui)
    const [cuadros, setCuadros] = useState([]);
    const [loading, setLoading] = useState(true);
    const { containerProps, indicatorEl } = useLoading({
        loading: loading,
        indicator: <BallTriangle width="50" />,
    });

    function getItemsSearched() {
        const url = `${API_HOST}/paintings/search/${searchText}`
        return fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                return result
            })
    }

    useEffect(() => {
        getItemsSearched()
            .then((resp) => {
                setCuadros(resp.results);
                setLoading(false);
            })
    }, [searchText])


    return (
        <div className="home__main-container animate__animated animate__fadeIn">
            <Navbar />
            <SearchBar />
            <h1
                className="temas__title-busqueda"
            >
                Busqueda: <span className="temas__span-busqueda">"{searchText}"</span>
            </h1>

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
                    <div className="temas__wrap-container"  >
                        {
                            cuadros.length >= 1 ?
                                cuadros.map((cuadro) => {
                                    return <ImageItem key={cuadro.id} img={cuadro} />
                                })
                                :
                                <h1 className="temas__no-cuadros">No hay resultados de la busqueda</h1>
                        }

                    </div>

            }
            <Footer />
        </div>
    )
}
