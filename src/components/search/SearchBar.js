import React from 'react'
import { changeSearchText } from '../../actions/ui';
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'

export const SearchBar = () => {

    const dispatch = useDispatch();

    const handleSearchBar = (text) =>{
        dispatch(changeSearchText(text));
    }


    return (
        <div className="input-search">
            <input onChange={(e) => handleSearchBar(e.target.value)} name="search" className="navbar__search-input" type="text" placeholder="Buscar..." />

            <button className="navbar__search-button" type="button">
                <Link className="navbar__shopping-cart-icon" to="/main/search">
                    <i className="fas fa-search"></i>
                </Link>
            </button>
        </div>
    )
}
