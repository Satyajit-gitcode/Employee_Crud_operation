import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import './global.css';

const Update = ({ showModal1, handleCloseModal, editingUser, handleSaveChanges }) => {
  const [formData, setFormData] = useState(editingUser);

  useEffect(() => {
    setFormData(editingUser);
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveChanges(formData);
  };

  return (
    <Modal show={showModal1} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formData && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="nam" value={formData.nam} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" type="text" name="address" value={formData.address} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" name="phone" value={formData.phone} onChange={handleChange}required />
            </Form.Group>
            <Form.Group id="updatebtmn">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
             Close
            </Button>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      
    </Modal>
  );
};

export default Update;