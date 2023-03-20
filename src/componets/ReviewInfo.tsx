import {FC} from 'react';
import {showReviewerType} from './../types/ReviewFinder';
// eslint-disable-next-line
import classes from './../styles/ReviewFinder.module.css';

const ReviewInfo: FC<showReviewerType> = (props:showReviewerType) => {
    return (
        <div className={classes.ReviewerInfo}>
            {props.id ?
                <div>
                    <img src={props.avatar ? props.avatar : '/img/no-user.jpg'} style={{width: '100px'}} alt={props.login} />
                    <h3>id: <b>{props.id as unknown as string}</b></h3>
                    <h3>login: <b>{props.login}</b></h3>
                </div>
            :
                <h3>Ревьюер отсутствует</h3>
            }
        </div>

    );
};

export default ReviewInfo;
