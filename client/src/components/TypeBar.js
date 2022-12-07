import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    key={type.id}
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
            <ListGroup.Item
                style={{cursor: 'pointer'}}
                active={device.selectedType === {}}
                onClick={() => device.setSelectedType({})}
            >
                Все
            </ListGroup.Item>
        </ListGroup>
    );
});

export default TypeBar;