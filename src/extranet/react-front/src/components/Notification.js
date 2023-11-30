import React from 'react'

const Notification = () => {
  return (
    <div className='nodalBackground' >
       <div className='nodalContainer' >
            <button> X </button>
            <div className='title' >
              <h1>Este es el titulo de la notificacion</h1>
            </div>
            <div className='body' >
              <p>Este es el cuerpo de la notificacion</p>
            </div>
            <div className='footer' >
              <button>Volver a Validar</button>
              <button>Cambiar validadicion</button>
              <button>Salir</button>
            </div>
       </div>
    </div>
  )
}

export default Notification;