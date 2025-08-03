import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function SendRequest({
  text = "Submit",
  method = "post",
  url,
  data = {},
  redirect = false,
  onResponse,
  className = "",
  type = "button",
  showReset = true,
  disabled = false,
  awaitConfirmation = false,
  loadingText = "Processing...",
  title = "Submit",
  confirmationTitle = "Are you sure?",
  confirmationButtonText = "Yes",
  useIcon = false,
  get = false,
  deleteBtn = false
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [eventRef, setEventRef] = useState<null | React.MouseEvent<HTMLButtonElement>>(null);

  const appUrl = 'http://localhost/phi/public';

  const executeRequest = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);

    let requestData = data;
    let headers: any = {};

    const hasFile = Object.values(data).some(
      (value) => value instanceof FileList || value instanceof File
    );


    if (hasFile) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => {
            formData.append(`${key}[]`, file);
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      requestData = formData;
      headers["Content-Type"] = "multipart/form-data";
    }

    const mainUrl = appUrl + url;

    try {
      const response = await axios({
        method,
        url: mainUrl,
        data: requestData,
        headers,
      });

      toast.success(response?.data?.message || "Success!");
      onResponse?.(response);

      console.log(response)

      if (response?.data?.redirectUrl && redirect) {
        if(response?.data?.intended === true){
          window.location.href = response.data.redirectUrl;
        }else{
          window.location.href = appUrl + response.data.redirectUrl;
        }
      }
    } catch (error) {
      console.log(error.data)
      const responseData = error?.response?.data;
      if (responseData?.errors && typeof responseData.errors === "object") {
        Object.values(responseData.errors).forEach((errArr) => {
          if (Array.isArray(errArr)) {
            errArr.forEach((msg) => toast.error(msg));
          }
        });
      } else {
        const message = responseData?.message || "Something went wrong, try again";
        toast.error(message);
      }
      onResponse?.(error.response || error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (awaitConfirmation) {
      setEventRef(e); // Save event for later use
      setShowConfirm(true);
    } else {
      executeRequest(e);
    }
  };

  const handleConfirm = async () => {
    if (eventRef) await executeRequest(eventRef);
    setShowConfirm(false);
    setEventRef(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setEventRef(null);
  };

  return (
    <>
      {!deleteBtn ? (
        <button
          onClick={handleClick}
          className={`bg-[#00FFD1] hover:bg-[#00ccaa] text-black font-medium px-5 py-2 rounded-md transition duration-200 ${isProcessing ? "opacity-70 cursor-not-allowed" : ""} ${className}`}
          disabled={isProcessing || disabled}
          title={title}
        >
          {isProcessing ? loadingText : text}
        </button>
      ) : (
        <Button 
        onClick={handleClick}
        icon={<DeleteOutlined/>}
        />
      )}

      <Modal
        open={showConfirm}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={confirmationButtonText}
        cancelText="Cancel"
        title={confirmationTitle}
        confirmLoading={isProcessing}
        maskClosable={false}
        className="z-[99999]"
        style={{ zIndex: 99999 }}
        modalRender={modal => (
          <div className="z-[99999]" style={{ zIndex: 99999 }}>
        {modal}
          </div>
        )}
      >
        <p>Are you sure?</p>
      </Modal>
    </>
  );
}
