import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { auth, googleProvider } from "../firebaseutils";
import { signInWithPopup, signOut } from "firebase/auth";

const CheckOutModal = ({
  isModalOpen,
  handleOk,
  checkoutOrder,
  handleCancel,
}) => {
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setContinueAsGuest(false); // Reset guest mode when user logs out
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Modal
      title="Checkout Modal"
      open={isModalOpen}
      onOk={handleOk}
      closable={false}
      footer={null}
      onCancel={handleCancel}
    >
      {!user && !continueAsGuest ? (
        <div className="flex flex-col items-center">
          <h1 className="text-center my-5">
            Login to Save your Order and See Progress
          </h1>
          <Button type="primary" onClick={handleGoogleLogin}>
            Continue with Google
          </Button>
          <h1 className="text-center my-5">----- OR -----</h1>
          <Button onClick={() => setContinueAsGuest(true)}>
            Continue as a Guest
          </Button>
        </div>
      ) : (
        <Form onFinish={checkoutOrder} layout="vertical">
          <Form.Item name={"username"} label={"Username"} initialValue={user?.displayName}>
            <Input disabled={!!user} />
          </Form.Item>
          <Form.Item name={"email"} label={"Email"} initialValue={user?.email} required>
            <Input type="email" disabled={!!user} />
          </Form.Item>
          <Form.Item name={"number"} label={"Phone Number"} required>
            <Input type="number" />
          </Form.Item>
          <Form.Item name={"address"} label={"Address"} required>
            <Input.TextArea placeholder="Address" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-black text-white">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}

      {user && (
        <div className="text-center mt-4">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </Modal>
  );
};

export default CheckOutModal;
