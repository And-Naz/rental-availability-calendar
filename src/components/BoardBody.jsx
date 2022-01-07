import {useState, memo} from 'react';
import BoardEmptyBody from './BoardEmptyBody';

function BoardBody(props) {
    const [isDataEmpty/*, setIsDataEmpty*/] = useState(true)
    console.log("Render: BoardBody");
    return (
        <div className={props.className}>
            {
                isDataEmpty
                ? <BoardEmptyBody isLoading={false} />
                : "Data"
            }
        </div>
    )
}

export default memo(BoardBody);