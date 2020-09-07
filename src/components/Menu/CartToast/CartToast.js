import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

// const CartToast = ({ appearance, children }) => (
//     <div style={{ background: appearance === 'error' ? 'red' : 'green' }}>
//         {children}
//     </div>
// );



export default function CartToast({ appearance, children }) {
    return (
        <div style={{ background: appearance === 'error' ? 'red' : 'green' }}>
        {   children}
        </div>
    )
}
