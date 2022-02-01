import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

const CarExplorerHeader = ({ onSearch }) => {

    const handle_maker_change = (e) => {
        set_selected_maker(e.target.value)
    }
    const handle_model_change = (e) => {
        set_selected_model(e.target.value)
    }
    const handle_date_change = (e) => {
        set_selected_date(e.target.value)
    }

    const onSubmit = () => {
        let filter = {}

        if (selected_maker && selected_maker != 'All')
            filter = { ...filter, make: selected_maker }
        if (selected_model && selected_model != 'All')
            filter = { ...filter, model: selected_model }
        if (selected_date)
            filter = { ...filter, date_rent: selected_date }

        console.log(filter)
        onSearch(filter)

    }

    const filter_data = new Map()
        .set('Audi', ['A3', 'A6', 'R8'])
        .set('BMW', ['3 Series', '8 Series', 'M5', 'Z4'])
        .set('Chevrolet', ['Camaro'])
        .set('Ford', ['Mustang', 'Edge'])
        .set('Nissan', ['GT-R', 'Rogue'])
        .set('Porsche', ['911'])

    const [maker_filter, set_maker_filter] = useState(['All'])
    const [model_filter, set_model_filter] = useState([])
    const [selected_maker, set_selected_maker] = useState('')
    const [selected_model, set_selected_model] = useState('')
    const [selected_date, set_selected_date] = useState('')


    useEffect(() => {
        let maker_data = Array.from(filter_data.keys());
        set_maker_filter(['All', ...maker_data])
    }, [])

    useEffect(() => {
        set_selected_model('')
        let model_data = filter_data.get(selected_maker)
        if (model_data)
            set_model_filter(['All', ...model_data])
        else
            set_model_filter([''])
    }, [selected_maker])


    return (
        <div className="row m-0 p-5 header-box">
            <h3 className="text-center pb-3 mb-3 brd-b-dash">Explore our cars</h3>

            <div className="col-md-12">
                <div className="row m-0">
                    <Form>
                        <Form.Group as={Col} className="col-md-3 offset-md-1 d-inline-block ">
                            <Form.Label className="no-marg small-label">Maker</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." onChange={handle_maker_change} className="force-apparence">
                                {
                                    maker_filter.map(maker => <option key={`opt_${maker}`} value={maker}>{maker}</option>)
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} className="col-md-3 d-inline-block ps-2">
                            <Form.Label className="no-marg small-label">Model</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." onChange={handle_model_change} className="force-apparence">
                                {
                                    model_filter.map(maker => <option key={`opt_${maker}`} value={maker}>{maker}</option>)
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} className="col-md-3 d-inline-block ps-2">
                            <Form.Label className="no-marg small-label">Date</Form.Label>
                            <input type="date" className='form-control' onChange={handle_date_change} />
                        </Form.Group>



                        <div className="col-md-1 d-inline-block text-center">
                            <button className="btn btn-success w-50" type="button" onClick={onSubmit}  > <FontAwesomeIcon icon={['fas', 'search']} /> </button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default CarExplorerHeader;