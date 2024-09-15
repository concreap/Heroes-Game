import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IHero } from '../utils/types';
import { Draggable } from 'react-beautiful-dnd';

const Hero = ({ data, index }: { data: IHero, index: number }) => {

    useEffect(() => {

    }, [])

    return (
        <>
            <Draggable key={data.id} draggableId={data.id} index={index}>

                {(provided, snapshot) => (

                    <div className='hero-item'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                        <img src={`../../../images/assets/${data.name.toLowerCase().replace(' ','-')}.svg`} alt="hero-image" />
                        <p style={{ margin: '0 0' }}>{ data.name }</p>
                    </div>

                )}

            </Draggable>
        </>
    )

}

export default Hero;