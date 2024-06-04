import React, { useState } from 'react'
import './App.css'

const APP_STATUS = {
  IDLE: 'idle', // al entrar
  ERROR: 'error',
  READY_UPLOAD: 'ready_upload',
  UPLOADING: 'uploading',
  READY_USAGED: 'ready_used'
} as const

type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS]

function App(){
  const [appStatus, setAppStatus] = React.useState<AppStatusType>(APP_STATUS.IDLE)
  const [file, setFile] = useState<File | null>(null)
const handleInputChange = (event: React.
  ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? []
    if(file){
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if( appStatus !== APP_STATUS.READY_UPLOAD || !file){
      return
    }

    setAppStatus(APP_STATUS.UPLOADING)
  } 

  const getButtonText = () => {
    if(appStatus === APP_STATUS.READY_UPLOAD){
      return 'Subir archivo'
    }
    if(appStatus === APP_STATUS.UPLOADING){
      return 'Subiendo...'
    }
    return 'Subir archivo'
  }


  const showButton = appStatus === APP_STATUS.READY_UPLOAD || appStatus === APP_STATUS.UPLOADING

  return (
    <>
      <h4>Challenge: Upload CSV + Search</h4>
      <form onSubmit={handleSubmit}>
        <label>
        <input 
        disabled={appStatus === APP_STATUS.UPLOADING}
        onChange={handleInputChange} 
        name="file" 
        type="file" 
        accept='.csv' />
        </label>
        {showButton && (<button disabled={ appStatus === APP_STATUS.UPLOADING}>
          {getButtonText()}
          </button>   )}   
      </form>
    </>
  )
}

export default App
