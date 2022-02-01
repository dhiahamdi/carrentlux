import React from 'react';
import Item from './Car.item';

const CarList = ({ loading, data }) => {
    return (

        <div className="row m-0">
            {loading ?
                <div className="col-md-12 p-4 text-ctr">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                (
                    data && Array.isArray(data) &&
                    data.map(car => <Item key={car.id} data={car} />)
                )
            }
        </div>

    );
};

export default CarList;