export const getAllPaintings =()=> {
    const url = 'https://canvas-api-rest.herokuapp.com/api/paintings';
    return fetch(url)
        .then((res)=>{
            return res.json()
        })
        .then((result)=>{
            return result
        })
}