import React, { Component } from 'react'
import loading from '../loading.gif'

const spinner=()=> {
    
        return (
            <div className="text-center">
             <img src={loading} alt="" />   
            </div>
        )
  
}

export default spinner
