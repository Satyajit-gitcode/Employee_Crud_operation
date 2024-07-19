import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'; 
import Signup from './Signup';
import Update from './Update';
import a from './axios';
import { MdAutoDelete, MdModeEdit } from "react-icons/md";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchUsers = () => {
      a.get('/Employee')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    };

    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    setSelectedIds([userId]);
    setShowDeleteModal(true);
  };

  const handleDeleteEmployees = () => {
    selectedIds.forEach(userId => {
      a.delete(`/Employee/${userId}`)
        .then(response => {
          setUsers(users.filter(user => user.id !== userId));
          window.location.reload();
        })
        .catch(error => {
          console.error('Error deleting employee:', error);
        });
    });
    setSelectedIds([]);
    setShowDeleteModal(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal1(true);
  };

  const handleSaveChanges = (formData) => {
    if (formData) {
      console.log(formData);
      a.put(`/Employee/${editingUser.id}`, formData)
        .then(response => {
          setUsers(users.map(user => (user.id === editingUser.id ? response.data : user)));
          setShowModal1(false);
          setEditingUser(null);
        })
        .catch(error => {
          console.error('Error updating employee:', error);
        });
    }
  };

  const handleAddEmployees = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
    setEditingUser(null);
  };

  const handleCheckbox = (id) => (event) => {
    if (event.target.checked) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    } else {
      setSelectedIds((prevSelectedIds) => prevSelectedIds.filter(selectedId => selectedId !== id));
    }
    console.log(selectedIds);
  };

  // Pagination functions
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(users.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container>
      <div id="heading">
        <h2 id="heading1" className="text-left">Manage Employees</h2>
        <div id="heading2" className="mb-3">
          <Button variant="danger" className="mr-2" onClick={() => setShowDeleteModal(true)}>Delete</Button>
          <Button variant="success" onClick={handleAddEmployees}>Add Employees</Button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map(user => (
            <tr key={user.id}>
              <td>
                <input type="checkbox" onChange={handleCheckbox(user.id)} />
              </td>
              <td>{user.nam}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td>
                <button id='btn' onClick={() => handleEdit(user)}><MdModeEdit /></button>
                <button id='btn2' onClick={() => handleDelete(user.id)}><MdAutoDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          Showing <b>{currentRecords.length}</b> users out of <b>{users.length}</b>
        </div>
        <div className="pagination-controls">
          <Button variant="primary" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Button>
          <div>
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={index + 1 === currentPage ? "primary" : "secondary"}
                onClick={() => paginate(index + 1)}
                className="mx-1"
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button variant="primary" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </div>
      {showModal1 && 
        <Update
          showModal1={showModal1}
          handleCloseModal={handleCloseModal1}
          editingUser={editingUser}
          handleSaveChanges={handleSaveChanges}
        />}
      {showModal && (<Signup onClose={handleCloseModal} />)}

      {/* i have created the the delete popup in the same page here  */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the selected employee(s)?
          <h4>This action cannot be undone</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteEmployees}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;