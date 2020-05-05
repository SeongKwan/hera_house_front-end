import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loading from 'react-loader-spinner';

const Loader = () => {
    return (
        <Loading type="Rings" color="#003366" height={120} width={120} />
    );
};

export default Loader;