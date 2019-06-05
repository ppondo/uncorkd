import React from 'react';
import { Link } from 'react-router-dom';
import BeverageIndexItem from '../beverages/beverage_index_item'

class BeerBreweryShow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filterObj: {
                beverage_id: null,
                brewery_id: this.props.match.params.breweryId
            }
        }
    }

    componentDidMount() {
        this.props.fetchBrewery(this.props.match.params.breweryId);
        this.props.fetchBeverages(this.state.filterObj);
        // debugger
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.breweryId !== this.props.match.params.breweryId) {
            this.props.fetchBrewery(this.props.match.params.breweryId);
        }
    }


    render() {
        if (this.props.brewery === undefined || this.props.brewery.beverages === undefined) {
            return null
        }

        let avgRate;
        if (this.props.brewery.avgRating <= 0) {
            avgRate = 0;
        } else {
            avgRate = this.props.brewery.avgRating.toFixed(2);
        }


        const unique = (beer, index, self) => {
            return self.indexOf(beer) === index;
        }

        let youCheckins = [];
        this.props.brewery.userCheckins.forEach(checkin => {
            if (this.props.currentUserId === checkin.user_id) {
                youCheckins.push(checkin.user_id)
            }
        });

        const userCheckins = this.props.brewery.userCheckins.map(ch => {
            return (
                ch.user_id
            )
        })

        let beers = [];

        for (let i = 0; i < this.props.brewery.beverages.length; i++) {
            let beerId = this.props.brewery.beverages[i].id
            if (this.props.beverages[beerId]) {
                beers.push(this.props.beverages[beerId])
            }
           
        }

        const beerItems = beers.map( beer => {
            return(
                <BeverageIndexItem
                    key={beer.id}
                    beer={beer}
                />
            )
        })

        if (beerItems === undefined) {
            return null
        }

        let dateObj = new Date(this.props.brewery.created_at);
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        const date = month + "/" + day + "/" + year;

        // debugger
        return (
            <div className='brewery-show'>
                <div className='show-content'>
                    <div className='show-info'>
                        <div className='show-info-basic'>
                            <div className='show-info-basic-left'>
                                <img className='show-info-img' src={this.props.brewery.imgUrl} alt="" />
                                <div className='show-info-name'>
                                    <h1>{this.props.brewery.name}</h1>
                                    <p>{this.props.brewery.location}</p>
                                </div>
                            </div>
                            <div className='show-info-basic-right'>
                                <div className='flex-box1'>
                                    <div className='show-stat1'>
                                        <span className='stat'>TOTAL</span>
                                        <span className='count'>
                                            {this.props.brewery.checkins.length}
                                        </span>
                                    </div>
                                    <div className='show-stat'>
                                        <span className='stat'>UNIQUE</span>
                                        <span className='count'> 
                                            {userCheckins.filter(unique).length} 
                                        </span>
                                    </div>
                                </div>
                                <div className='flex-box'>
                                    <div className='show-stat1'>
                                        <span className='stat'>MONTHLY</span>
                                        <span className='count'>
                                            {this.props.brewery.checkins.length}
                                        </span>
                                    </div>
                                    <div className='show-stat'>
                                        <span className='stat'>YOU</span>
                                        <div className='count'>
                                            {youCheckins.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='show-info-ratings'>
                            <div className='show-avg-rating'>
                                <i className="fas fa-circle"></i><i className="fas fa-circle"></i><i className="fas fa-circle"></i><i className="fas fa-circle"></i><i className="fas fa-circle"></i>
                                <div>({avgRate})</div>
                                {/* <div className='rate2'><i className="fas fa-circle"></i><i className="fas fa-circle"></i><i className="fas fa-circle"></i><i className="fas fa-circle"></i><i className="fas fa-circle"></i></div> */}
                            </div>
                            <div className='show-num-ratings'>{this.props.brewery.checkins.length} Ratings</div>
                            <div className='show-num-ratings'>{this.props.brewery.beverages.length} Beers</div>
                            <div className='show-num-ratings'>{`Added ${date}`}</div>
                            {/* date added ^ */}
                        </div>
                        <div className='show-info-description'>
                            <div className='desc'>{`${this.props.brewery.description}`}
                            </div>
                            <div className='desc-boxes'>
                                <div className='box1'></div>
                                <div className='box2'></div>
                                <div className='box3'></div>
                                <div className='box4'></div>
                            </div>
                        </div>
                    </div>
                    <div className='beer-list-box'>
                        <div className='beer-list'>Beer List</div>
                    </div>
                    <div className='brewery-beers'>
                        {beerItems}
                    </div>
                </div>
                <div className='show-sidebar'>
                </div>
            </div>
        );
    }
}

export default BeerBreweryShow;