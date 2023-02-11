import React from 'react';

const ReviewFinder = (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} >
            форма
            {props.children}
        </div>
    );
};

export default ReviewFinder;
