import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const ListItemImage = ({ src, alt, title }) => {
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
            {load && <PostTitle>{title}</PostTitle>}
        </ImageBlock>
    );
};

const ImageBlock = styled.div`
    ${({ height }) => css`
        height: ${height};
        min-height: 510px;
        width: 100%;
    `}
`;

const PostTitle = styled.div`
    white-space: normal;
    word-break: break-all;
    width: 400px;

    font-family: Spartan;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 30px;
    letter-spacing: 0em;
    margin-top: 10px;

    @include media('sm') {
        width: 100%;
        font-size: 10px;
        line-height: 20px;
        letter-spacing: 0em;
    }
`;
export default ListItemImage;
