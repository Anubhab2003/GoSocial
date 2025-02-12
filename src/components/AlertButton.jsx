import React from 'react';
import Swal from 'sweetalert2';

const AlertButton = () => {
  const showAlert = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Post submitted successfully',
      icon: 'success',
      confirmButtonText: 'Okay'
    });
  };

  return (
    <button onClick={showAlert}>
      Show Alert
    </button>
  );
};

export default AlertButton;
