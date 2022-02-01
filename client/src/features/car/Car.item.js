import React from 'react';
import { api_file_url } from '../../config/Params.constant';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CarItem = ({ data }) => {
    return (
        <div className="col-md-3 p-2">
            <div className="row m-0 car-box">

                <div className="col-md-12 p-2 pt-4">
                    <h4 className="color-primary mb-0">{`${data.make} - ${data.model}`}</h4>
                    {
                        data.status == "available" ?
                            <span className="badge bg-success float-end">available</span>
                            :
                            <span className="badge bg-secondary float-end">unavailable</span>
                    }
                    <b className="d-block fnt-w5 txt-gray fnt-sm"><FontAwesomeIcon icon={['fas', 'digital-tachograph']} /> {data.plate}</b>

                </div>
                <div className="col-md-12 p-0 text-center brand-container">
                    <img src={`${api_file_url}${data.img}`} alt="" className="brand-img" />
                </div>

                <div className="col-md-12 p-2">
                    <h5 className="fnt-wb">{data.cost} €</h5>
                    <b className="d-block fnt-w5">Extra KM <span className="float-end">{data.extra_km} €/KM</span> </b>
                    <b className="d-block fnt-w5">Available from <span className="float-end">{data.availableAt}</span> </b>

                </div>

                <div className="col-md-12 p-2 text-end">
                    <button className="btn btn-success w-25">Rent</button>
                </div>


            </div>
        </div>
    );
};

export default CarItem;