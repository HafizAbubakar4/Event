import { message } from 'antd';
// import { AuthContext } from 'context/AuthContext';
import React, { useState } from 'react';
import { setDoc, serverTimestamp, doc } from 'firebase/firestore/lite';
import { firestore } from 'config/firebase';

const initialState = {
    Date: "",
    Year: "",
    Celebration: ""
};

export default function AddEvent() {
    const [state, setState] = useState(initialState);
    const [isProcessing, setProcessing] = useState(false);
    // const [user] = useContext(AuthContext)

    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Trim the inputs before validation
        let { Date, Year, Celebration } = state;
        Date = Date.trim();
        Year = Year.trim();
        Celebration = Celebration.trim();

        if (Date.length < 3) {
            return message.error("Title should be at least 3 characters long");
        }
        if (Year.length < 3) {
            return message.error("location should be at least 3 characters long");
        }
        if (Celebration.length < 10) {
            return message.error("description should be at least 10 characters long");
        }

        let formData = { Date, Year, Celebration }
        formData.dateCreated = serverTimestamp();
        formData.id = Math.random().toString(36).slice(2);
        formData.status = "active";

        createDocument(formData);
    };

    const createDocument = async (formData) => {
        setProcessing(true)
        try {
            await setDoc(doc(firestore, "Event", formData.id), formData);
            setTimeout(() => {
                message.success("Event added successfully");
                setState(initialState);
            }, 2000);
        } catch (e) {
            message.error("somthing went wrong while adding Event: ", e);
        }
        setProcessing(false)
    }

    return (
        <div className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card p-3 p-md-4 p-lg-5">
                            <h2 className='text-center mb-4'>Add Event</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className='form-control'
                                            name='Date'
                                            placeholder='Enter Date'
                                            value={state.Date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className='form-control'
                                            name='Year'
                                            placeholder='Enter Year'
                                            value={state.Year}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <textarea
                                            name="Celebration"
                                            className='form-control'
                                            rows="5"
                                            placeholder='Enter Celebration here ...'
                                            value={state.Celebration}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button
                                            type="submit"
                                            className='btn btn-danger w-100'
                                            disabled={isProcessing}
                                        >
                                            {
                                                !isProcessing ? "Add Event" :
                                                    <div className="spinner-border spinner-border-sm"></div>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
