import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {id: Date.now(), title: '', description: ''}])
    }

    const removeInfo = (removeId) => {
        setInfo(info.filter(i => i.id !== removeId))
    }

    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }

    const selectFile = event => {
        setFile(event.target.files[0])
    }

    const addDevice = () => {
        // Нужна не JSON строка, а FormData, чтобы отправлять изображение
        const formData = new FormData()
        // Формируем данные .append(ключ, значение)
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        // Массив info невозможно передать, поэтому конвертируем его в json строку
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className={"d-flex justify-content-around"}>
                        <Dropdown className={"mt-2 mb-2"}>
                            <DropdownToggle>{device.selectedType.name || "Выберите тип"}</DropdownToggle>
                            <DropdownMenu>
                                {device.types.map(type =>
                                    <Dropdown.Item
                                        key={type.id}
                                        onClick={() => device.setSelectedType(type)}
                                    >
                                        {type.name}
                                    </Dropdown.Item>
                                )}
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown className={"mt-2 mb-2"}>
                            <DropdownToggle>{device.selectedBrand.name || "Выберите бренд"}</DropdownToggle>
                            <DropdownMenu>
                                {device.brands.map(brand =>
                                    <Dropdown.Item
                                        key={brand.id}
                                        onClick={() => device.setSelectedBrand(brand)}
                                    >
                                        {brand.name}
                                    </Dropdown.Item>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <Form.Control
                        className={"mt-3"}
                        type={"text"}
                        placeholder={"Введите название устройства..."}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Form.Control
                        className={"mt-3"}
                        type={"number"}
                        placeholder={"Введите стоимость устройства..."}
                        value={price}
                        onChange={(event) => setPrice(Number(event.target.value))}
                    />
                    <Form.Control
                        className={"mt-3"}
                        type={"file"}
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className={"mt-3"} key={i.id}>
                            <Col md={4}>
                                <Form.Control
                                    type={"text"}
                                    value={i.title}
                                    onChange={(event) => changeInfo('title', event.target.value, i.id)}
                                    placeholder={"Введите название свойства..."}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    type={"text"}
                                    value={i.description}
                                    onChange={(event) => changeInfo('description', event.target.value, i.id)}
                                    placeholder={"Введите описание свойства..."}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => removeInfo(i.id)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;