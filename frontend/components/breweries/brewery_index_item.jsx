import React from 'react';
import { Link } from 'react-router-dom';
import brewery_index_container from './brewery_index_container';

const BreweryIndexItem = props => (
    <div className='box'>
        <div className='brewery-box'>
            <Link to='brewery/:breweryId'>
                <img className='brewery-img'src={props.brewery.imgUrl} alt="" />
                {/* img will be a link to the brewery */}
            </Link> 
            <div className='brewery-details'>
                <div className='brewery-name-box'>
                    <Link className='brewery-name' to='/breweries/:breweryId'>{props.brewery.name}</Link> 
                </div>
                <div className='brewery-location'>{props.brewery.location}</div>
            </div>
        </div>
        <div className='brewery-item'>
            <div className='brewery-stats'>
                <div className='stat-box'>
                    <div className='num-beers'>
                        <Link className='num-beers-link' to='brewery/:breweryId/beverages'> # Beers </Link>
                    </div> 
                    <div className='num-ratings'>
                        4 ratings{/* this will have brewery.checkins.length (thru assoc.) */}
                    </div> 
                </div>
                <div className='avg-rating'>
                    3.98{/* this will have the sum of all ratings divided by length of checkin assoc.*/}
                </div> 
            </div>
        </div>
    </div>
);

export default BreweryIndexItem;