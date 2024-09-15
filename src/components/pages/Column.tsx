import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IHero } from '../utils/types';
import Hero from './Hero';
import { DroppableStrict } from './DropableStrict';

const Column = ({id, title, heroes }: { id: string, title: string, heroes: Array<IHero> }) => {

    useEffect(() => {

    }, [])

    return (
        <>
            <div className='column'>

                <div className='col-head'>
                    <h2>{ title }</h2>
                </div>

                <DroppableStrict droppableId={id} isDropDisabled={ id === 'bench' ? true : false }>

                {(provided, snapshot) => (

                    <div className={`hero-list ${snapshot.isDraggingOver ? 'active' : ''}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >

                        {
                            heroes.length > 0 &&
                            heroes.map((hero, index) => {
                                return <Hero data={hero} index={index} />
                            })
                        }

                        { provided.placeholder }

                    </div>

                )}

                </DroppableStrict>
                
            </div>
        </>
    )

}

export default Column;