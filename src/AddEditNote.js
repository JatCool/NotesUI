import React, { useState, useEffect } from 'react'
import axios from './API'
import './AddEditNote.scss'
import { ToastContainer, toast } from 'react-toastify';
import { withTranslation } from 'react-i18next';
import { ReactComponent as BackButton } from './icons/long-arrow-alt-left-solid.svg'
import { Redirect, Link } from 'react-router-dom';

function AddEditNote({ match, t }) {
    let isCreate = Object.keys(match.params).length == 0;
    const [note, setNote] = useState('');
    const [isOpertaionEnded, setOperationStatus] = useState(false)

    const fetchData = isCreate ? () => { } : async () => {
        const response = await axios.get(`notes/${match.params.id}`);
        setNote(response.data.text);
    };

    const UpdateNote = () => {
        if (note !== '') {
            const newNote = {
                Text: note
            }
            axios.put(`notes/${match.params.id}`, newNote).then(() => {
                toast(t('UpdatedMessage'));
            })
                .catch(t('ErrorMessage'))
            setOperationStatus(true)
        }
        else {
            toast(t('NoteErrorMessage'))
        }
    }

    const CreateNote = () => {
        if (note !== '') {
            const newNote = {
                Text: note
            }
            axios.post('notes', newNote).then(() => {
                toast(t('CreatedMessage'));
            })
                .catch(t('ErrorMessage'))
            setOperationStatus(true)
        }
        else {
            toast(t('NoteErrorMessage'))
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const inputText = ({ target: input }) => {
        setNote(input.value)
    }

    return (
        <div>
            <ToastContainer />
            {isOpertaionEnded && <Redirect to='/' />}
            <div className="header">
                <BackButton className='back' onClick={setOperationStatus.bind(this, true)} />
                <button onClick={isCreate ? CreateNote : UpdateNote}>{t(isCreate ? 'CreateButton' : 'UpdateButton')}</button>
                <h1 className = "title">{t(isCreate ? 'CreateTitle' : 'UpdateTitle')}</h1>
            </div>
            <div className='notes-wrapper-edit'>
                <textarea className='note-edit' onInput={(e) => inputText(e)} defaultValue={note}></textarea>
            </div>
        </div>
    )
}

export default withTranslation()(AddEditNote);