import React, { Component } from 'react';
import classnames from 'classnames';

export default function chooseScreen(props) {
        const choose = (length) => {
            props.chooseLength(length);
        }
        return (
            <div style={{position: 'absolute', zIndex: 20000, height: '100%', width: '100%', background: 'white'}}>
                <div>
                    <h1 onClick={() => choose('Small')}>Small</h1>
                </div>
                    <h2 onClick={() => choose('Big')}>Big</h2>
                <div>
                </div>
            </div>
        );
}
