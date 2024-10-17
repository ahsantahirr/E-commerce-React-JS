import React, { useState } from 'react';
import { Modal } from 'antd';


const App = () => {
  const [open, setOpen] = useState(true); 

  const handleCancel = () => {
    setOpen(false); 
  };

  return (
    <>
      <Modal
        open={open}
        footer={null} 
        onCancel={handleCancel} 
      >
        <div className="flex flex-col items-center text-center mx-auto">
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png" // Green checkmark icon URL
            alt="Success"
            className="w-16 h-16 mb-4"
          />
          <h2 className="text-xl font-semibold">Thank You for Shopping!</h2>
          <p>Your order has been successfully placed.</p>
        </div>
      </Modal>
    </>
  );
};

export default App;
