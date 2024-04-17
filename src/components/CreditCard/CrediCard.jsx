import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import { Form, Input, Row, Col } from 'antd';

const CreditCard = () => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    return (
        <div>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <Form layout="vertical">
                <Form.Item label="Name on Card">
                    <Input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </Form.Item>
                <Form.Item label="Card Number">
                    <Input
                        type="text"
                        name="number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Expiry Month">
                            <Input
                                type="text"
                                name="expiry"
                                placeholder="MM"
                                value={state.expiry}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Expiry Year">
                            <Input
                                type="text"
                                name="expiry"
                                placeholder="YY"
                                value={state.expiry}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="CVV">
                            <Input
                                type="text"
                                name="cvc"
                                value={state.cvc}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default CreditCard;
