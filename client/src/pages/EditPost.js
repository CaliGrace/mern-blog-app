import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

const EditPost = () => {
    const [title,setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  
  const submitHandler = () => {

  }
  if(redirect) {
    return <Navigate to={'/'} />
  }
  
  return (      
        <form onSubmit={submitHandler}>
          <input type="title" placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)}/>
          <input type="summary" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)}/>
          <input type="file" onChange={(e) => setFiles(e.target.files)}/>
          <ReactQuill modules={modules} formats={formats} onChange={(newValue) => setContent(newValue)}/>
          <button type="sumbit" style={{marginTop: '1rem'}}>Post</button>
        </form>
  )
}

export default EditPost