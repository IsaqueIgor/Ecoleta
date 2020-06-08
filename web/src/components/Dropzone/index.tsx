import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {

    const [selectedfileUrl, setSelectedfileUrl] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedfileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*'
    })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />
        { selectedfileUrl  ?
            <img src={selectedfileUrl} alt="Point thumbnail" />
            :
            (<p><FiUpload /> Feel free to choose the Market image or Logo </p>)
        }
    </div>
  )
}

export default Dropzone;