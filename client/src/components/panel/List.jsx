/**
 * @file List.jsx
 * @author denglingbo
 *
 * Des
 */
import React from 'react';
import Item from './Item';
import classNames from 'classnames';

const List = (props) => (
    <div>
        {props.data.map(d => (
            <div
                className={classNames('ec-panel-list', {
                    'ec-panel-list-sub': props.isSub,
                })}
            >
                <Item
                    key={d.guid}
                    item={d}
                    isSub={props.isSub}
                >
                    {d.children &&
                        <List
                            data={d.children}
                            isSub={true}
                        />
                    }
                </Item>
            </div>
        ))}
    </div>
)

List.defaultProps = {
    data: [],
    isSub: false,
}

export default List;
