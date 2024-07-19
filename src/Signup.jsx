// Signup.jsx
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import a from './axios'; 
import './global.css'

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    
    nam: '',
    email: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = formData;
    console.log(data);
    await a.post("/Employee", data);
    alert("Submitted");
    window.location.reload();
    onClose(); 

    
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Signup Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="nam"
              value={formData.nam}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </Form.Group >
          <Button id="sibmit"variant="primary" type="submit">
            Submit
          </Button>
          
          <Button id="sibmit"variant="secondary" type="submit">
            Cancel
          </Button>
          
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
