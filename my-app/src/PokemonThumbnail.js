import React from 'react';

function PokemonThumbnail ({id, name, image, type1, type2}) {
    const style = `thumb-container ${type1}`;
    return (
        <div className={style} onClick={e => alert(name)}>
            <div className="number">
                <small>#{id.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping: false})}</small>
            </div>
            <img src={image} alt={name} />
            <div className='detail-wrapper'>
                <h3>{name}</h3>
                <small>Type: {type1}{type2 ? " / " + type2 : ""}</small>
            </div>
        </div>
    )
}

export default PokemonThumbnail;