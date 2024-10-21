import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Spin } from "antd";
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
  const [loading, setLoading] = useState(false); // Loading state for form submission

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      // console.log("modal", user);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setContinueAsGuest(false); // Reset guest mode when user logs out
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true); // Start the loader
    try {
      await checkoutOrder(values);
    } catch (error) {
      console.error("Checkout submission error:", error);
    } finally {
      setLoading(false); // Stop the loader once the submission is done
    }
  };

  return (
    <div className="font-poppins">
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
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name={"username"}
              label={"Username"}
              initialValue={user?.displayName}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"email"}
              label={"Email"}
              initialValue={user?.email}
              required
            >
              <Input type="email" disabled={!!user} />
            </Form.Item>
            <Form.Item name={"number"} label={"Phone Number"} required>
              <Input type="number" />
            </Form.Item>
            <Form.Item name={"address"} label={"Address"} required>
              <Input.TextArea placeholder="Address" />
            </Form.Item>
            <Form.Item>
              {loading ? (
                <div className="flex justify-center">
                  <Spin /> {/* Ant Design Spinner */}
                </div>
              ) : (
                <Button
                  type="secondary"
                  htmlType="submit"
                  className="bg-black text-white hover:bg-gray-700"
                >
                  Submit
                </Button>
              )}
            </Form.Item>
          </Form>
        )}

        {user && (
          <div className="text-center mt-4">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CheckOutModal;
