import React, { useEffect, useState } from 'react'
import axios from './API'
import {ReactComponent as BackButton} from './icons/long-arrow-alt-left-solid.svg'
import './NoteDetail.scss'
import { Link } from 'react-router-dom';

function NoteDetail({ match }) {
    const [note, setNote] = useState();

    const fetchData = async () => {
        const response = await axios.get(`notes/${match.params.id}`);
        setNote(response.data);
    };

    useEffect(() => {
        fetchData();
      }, [])

    return (
        <div className="notes-wrapper-detail">
            <Link to = "/" className = "link"><BackButton className = "back"/></Link>
            <div>
                {note &&
                    <div className="note-detail">{note.text}</div>}
            </div>
        </div>
    );
}

export default NoteDetail;