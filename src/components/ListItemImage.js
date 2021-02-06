import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const ListItemImage = ({ src, alt }) => {
    const ref = useRef();
    const [height, setHeight] = useState(0);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (load) {
            setHeight(ref.current.clientHeight);
            console.log(ref);
            console.log(ref.current.clientHeight);
        }
    }, [load]);

    console.log(height);
    return (
        <ImageBlock height={height !== 0 ? height : undefined}>
            <img ref={ref} src={src} alt={alt} onLoad={() => setLoad(true)} />
        </ImageBlock>
    );
};

const ImageBlock = styled.div`
    ${({ height }) => css`
        height: ${height};
        width: 100%;
        background-color: #e0e0e0;
    `}
`;
export default ListItemImage;
