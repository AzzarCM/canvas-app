import {useState, useEffect} from 'react'

export const useFetch = ( url ) => {
    const [state, setstate] = useState({data: ["hola"], loading: true, error: null});

    useEffect(() => {
        fetch(url)
        .then( resp => resp.json() )
        .then( data => {
            setstate({
                loading: false,
                error: null,
                data
            })
        });
        
    }, [url])

    return state;
}
