import React , {useState , useEffect} from 'react';
import {clear , list} from './Car.slice';
import { useDispatch, useSelector } from "react-redux";
import Header from './CarExplorer.header';
import List from './Car.list';

const CarExplorerContainer = () => {

    const dispatch = useDispatch();
    const { loading, error, data } = useSelector(state => state.car);

    const onSearch = (filter) => {
        dispatch(list(filter));
    }

    useEffect(() => {
        onSearch({})

        return () => {
            dispatch(clear());
        }
    }, [])


    return (
        <>
            <Header loading={loading} onSearch={onSearch}/>
            <List loading={loading} data={data} />

        </>
    );
};

export default CarExplorerContainer;