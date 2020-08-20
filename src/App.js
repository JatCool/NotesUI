import React from 'react'
import axios from './API'
import Modal from 'react-modal'
import { useState, useEffect } from 'react';
import i18n from './i18n';
import { withTranslation } from 'react-i18next';
import { ReactComponent as EditImage } from './icons/edit-solid.svg'
import { ReactComponent as DeleteImage } from './icons/trash-alt-solid.svg'
import { ReactComponent as Circle } from './icons/times-circle-regular.svg'
import { ReactComponent as AddImage } from './icons/plus-solid.svg'
import './App.scss'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

function App({ t }) {

  const [notes, setNotes] = useState([])
  const [isOpenModal, setModalStatus] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));
  const notify = () => toast(t('DeletedMessage'))
  const [currentId, setCurrentId] = useState(0);
  let cleanupFunction = false;

  Modal.setAppElement('#root');

  const changeLanguage = () => {
    let changedLanguage = language === 'en' ? "ru" : "en"
    setLanguage(changedLanguage);
    i18n.changeLanguage(changedLanguage)
  }
  const fetchData = async () => {
    const response = await axios.get("notes");
    if (!cleanupFunction) setNotes(response.data);
  };

  const deleteNote = async () => {
    await axios.delete(`notes/${currentId}`);
    await fetchData();
    setModalStatus(false);
    notify();
  }

  const openModal = (id) => {
    setCurrentId(id)
    setModalStatus(!isOpenModal);
  }

  useEffect(() => {
    fetchData();
    return () => cleanupFunction = true;
  }, [])

  return (
    <div>
      <div className="header">
        <button onClick={changeLanguage}>{t('ChangeButtonMessage')}</button>
        <h1 className = "title">{t('Title')}</h1>
        <Link to='/create' className='link'><AddImage className="add" /></Link>
      </div>
      <div className="notes-wrapper">
        {notes.map(m => (
          <div key={m.id}>
            <Modal
              isOpen={isOpenModal}
              className="Modal"
              overlayClassName="Overlay"
            >
              <Circle className="circle-button" onClick={setModalStatus.bind(this, false)} />
              <span>{t('ModalDelete.Title')}</span>
              <br />
              <button className="positive-button" onClick={deleteNote}>{t('ModalDelete.PositiveButton')}</button>
              <button className="negative-button" onClick={setModalStatus.bind(this, false)}>{t('ModalDelete.NegativeButton')}</button>
            </Modal>
            <Link className="link" to={`/edit/${m.id}`}><EditImage className="edit" /></Link>
            <DeleteImage className="delete" onClick={openModal.bind(this, m.id)} />
            <Link className="link" to={`/detail/${m.id}`} ><div className="note">{m.text}</div></Link>
          </div>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
}

export default withTranslation()(App);
