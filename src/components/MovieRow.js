import React from "react";
import './MovieRow.css';
import { NavigateBefore } from "@mui/icons-material";
import { NavigateNext } from "@mui/icons-material";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({title, items}) => {
    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left">
                <NavigateBefore style={{fontSize: 50}} />
            </div>
            <div className="movieRow--right">
                <NavigateNext style={{fontSize: 50}} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow-list">
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}