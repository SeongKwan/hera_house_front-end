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
        <FlexBox>
            <ImageBlock height={height !== 0 ? height : undefined}>
                <img
                    ref={ref}
                    src={src}
                    alt={alt}
                    onLoad={() => setLoad(true)}
                />
            </ImageBlock>
            {load && <PostTitle>{title}</PostTitle>}
        </FlexBox>
    );
};

const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImageBlock = styled.div`
    ${({ height }) => css`
        height: ${`${height}px;`};
        /* min-height: 510px; */
    `}
    width: 400px;

    @media screen and (max-width: 624px) {
        width: 100%;
    }
`;

const PostTitle = styled.div`
    width: 400px;
    white-space: normal;
    word-break: break-all;

    font-family: Spartan;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 30px;
    letter-spacing: 0em;
    margin-top: 10px;

    @media screen and (max-width: 624px) {
        width: 100%;
        font-size: 13px;
        line-height: 20px;
        letter-spacing: 0em;
    }
`;
export default ListItemImage;
