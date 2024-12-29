import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { setDoc, serverTimestamp, doc, getDocs, collection, deleteDoc } from 'firebase/firestore/lite';
import { firestore } from 'config/firebase';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const initialState = {
    title: "",
    location: "",
    description: ""
};

export default function Alltodo() {
    const [documents, setDocuments] = useState([]);
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const [todo, setTodo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setProcessing] = useState(false);
    const [state, setState] = useState(initialState);
    const [search, setSearch] = useState(''); // New state for search input

    const handleChange = (e) => {
        setTodo(s => ({ ...s, [e.target.name]: e.target.value }));
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterDocuments(e.target.value);
    };

    const filterDocuments = (searchTerm) => {
        const filtered = documents.filter(doc =>
            doc.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDocuments(filtered);
    };

    const fetchDocuments = async () => {
        let array = [];
        try {
            const querySnapshot = await getDocs(collection(firestore, "todos"));
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                data.id = doc.id;  // Add the document ID to the data object
                array.push(data);
            });
            setDocuments(array);
            setFilteredDocuments(array); // Initialize filtered documents
            setIsLoading(false);
        } catch (error) {
            message.error("Error fetching documents: " + error.message);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleDelete = async (todo) => {
        try {
            await deleteDoc(doc(firestore, "todos", todo.id));
            setDocuments(docs => docs.filter(doc => doc.id !== todo.id));
            setFilteredDocuments(docs => docs.filter(doc => doc.id !== todo.id)); // Update filtered documents
            message.success("Document deleted successfully");
        } catch (error) {
            message.error("Error deleting document: " + error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        todo.dateModified = serverTimestamp();
        setProcessing(true);
        try {
            await setDoc(doc(firestore, "todos", todo.id), todo, { merge: true });
            setDocuments(docs => docs.map(doc => doc.id === todo.id ? todo : doc));
            setFilteredDocuments(docs => docs.map(doc => doc.id === todo.id ? todo : doc)); // Update filtered documents
            message.success("Todo Updated successfully");
            setState(initialState);
        } catch (error) {
            message.error("Something went wrong while updating todo: " + error.message);
        }
        setProcessing(false);
    };

    return (
        <>
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            {/* search for todos */}
                            <input
                                type="search"
                                name='search'
                                className='w-50 form-control mx-auto my-5'
                                placeholder='Search by title'
                                value={search}
                                onChange={handleSearchChange}
                            />
                            <h2 className='text-center mb-4'>My Event</h2>

                            <div className="card p-3 p-md-4 p-lg-5">
                                {!isLoading ?
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                <Th>Sr.No</Th>
                                                <Th>Title</Th>
                                                <Th>Upload Image</Th>
                                                <Th>Description</Th>
                                                <Th>Action</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                filteredDocuments.map((todo, index) => (
                                                    <Tr key={todo.id}>
                                                        <Td>{index + 1}</Td>
                                                        <Td>{todo.title}</Td>
                                                        <Td>{todo.UploadImage}</Td>
                                                        <Td>{todo.description}</Td>
                                                        <Td>
                                                            <button
                                                                className='btn btn-info me-2'
                                                                onClick={() => setTodo(todo)}
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className='btn btn-danger'
                                                                onClick={() => handleDelete(todo)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </Td>
                                                    </Tr>
                                                ))
                                            }
                                        </Tbody>
                                    </Table>
                                    : <div className="text-center"><div className="spinner-grow"></div></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update NOTS</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className='form-control'
                                            name='title'
                                            placeholder='Enter Title'
                                            value={todo.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <input
                                            type="image"
                                            className='form-control'
                                            name='uploadimage'
                                            placeholder='uploadimage'
                                            value={todo.uploadimage}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <textarea
                                            name="description"
                                            className='form-control'
                                            rows="5"
                                            placeholder='Enter description here ...'
                                            value={todo.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleUpdate}
                            >
                                {!isProcessing ? "Update Nots" :
                                    <div className="spinner-border spinner-border-sm"></div>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
