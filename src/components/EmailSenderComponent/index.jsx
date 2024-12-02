import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { FaEnvelope, FaEnvelopeOpenText } from "react-icons/fa";

import { DELIVERY_CONSTANTS } from "../../constants/global";
const { LOADING, UNLOADING } = DELIVERY_CONSTANTS;

const EmailSenderComponent = () => {
  const order = useSelector((state) => state.ordersInfo.order.data);
  const documents = useSelector(
    (state) => state.documentsInfo.documents.data.documents
  );

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const isOrderFinished = order.tasks?.every(
    (task) =>
      (task.type === LOADING || task.type === UNLOADING) &&
      task.end_date &&
      task.end_time
  );

  const handleSendEmail = async () => {
    console.log("Sending email...");
    const confirmSending = window.confirm(
      "Ви впевнені що хочете відправити Email?"
    );
    if (!confirmSending) {
      console.log("Email sending cancelled.");
      return; // Exit if the user cancels the deletion
    }

    setIsSending(true);
    try {
      // Extracting necessary information
      const customerEmail = [
        "ymailo096@gmail.com",
        // "maylo.ya@agromat.ua",
        "kubrak.i@agromat.ua",
        "kubrak.ivan@gmail.com",
      ];
      const documentFiles = documents.map((doc) => doc.file);

      // Prepare data to be sent to the backend
      const emailData = {
        order_number: order.order_number,
        customer_email: customerEmail,
        customer_manager: order.customer_manager,
        price: order.price,
        file_name: "Документи",
        documents: documentFiles,
      };

      if (isOrderFinished) {
        await axios.post("/api/send-email/", emailData);
        toast.success("Email sent successfully.", {
          position: "top-right",
          style: { color: "black", marginTop: "0rem" },
        });
        setMessage("Email sent successfully.");
      } else {
        toast.error("Order is not finished yet.", {
          position: "top-right",
          style: { color: "black", marginTop: "0rem" },
        });
        setMessage("Order is not finished yet.");
      }
    } catch (error) {
      toast.error("Failed to send email.", {
        position: "top-right",
        style: { color: "black", marginTop: "0rem" },
      });
      setMessage("Failed");
    }
    setIsSending(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button
        onClick={handleSendEmail}
        disabled={isSending}
        className="order-details__action-send-documents-btn"
        title="Відправити Email"
      >
        {isSending ? <FaEnvelopeOpenText /> : <FaEnvelope />}
      </button>
    </div>
  );
};

export default EmailSenderComponent;
