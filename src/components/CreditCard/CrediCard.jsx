import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Form, Input, Row, Col } from 'antd';

const CreditCard = (props) => {
    const [state, setState] = useState({
        number: '',
        expiryMonth: '', // Separate expiry into month and year
        expiryYear: '',
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
    const handleSubmit = () => {
        // Check if all required fields are filled
        if (state.number && state.expiryMonth && state.expiryYear && state.cvc && state.name) {
            // Pass credit card details to parent component
            props.onCreditCardDetails(state);
        } else {
            // Handle error if any required field is missing
            console.error("Please fill all required fields.");
        }
    }
    return (
        <div>
            <Cards
                number={state.number}
                expiry={`${state.expiryMonth}/${state.expiryYear}`} // Combine expiryMonth and expiryYear
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
                onCardDetails={(details) => props.onCreditCardDetails(details)}
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
                                name="expiryMonth" // Update name to expiryMonth
                                placeholder="MM"
                                value={state.expiryMonth}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Expiry Year">
                            <Input
                                type="text"
                                name="expiryYear" // Update name to expiryYear
                                placeholder="YY"
                                value={state.expiryYear}
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
