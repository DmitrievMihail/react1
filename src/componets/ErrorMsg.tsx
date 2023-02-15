import React from 'react';
// eslint-disable-next-line
import classes from './../styles/ErrorMsg.module.css';

const ErrorMsg = (props: {msg: string}) => {
    return (
        <h3 className={classes.Error}>{props.msg}</h3>
    );
};

export default ErrorMsg;
