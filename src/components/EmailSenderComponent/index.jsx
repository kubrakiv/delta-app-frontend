import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaEnvelope, FaEnvelopeOpenText } from "react-icons/fa";

const EmailSenderComponent = () => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.ordersInfo.order.data);
  const documents = useSelector(
    (state) => state.documentsInfo.documents.data.documents
  );

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    const confirmSending = window.confirm(
      "Ви впевнені що хочете відправити Email?"
    );
    if (!confirmSending) {
      return; // Exit if the user cancels the deletion
    }

    setIsSending(true);
    try {
      // Extracting necessary information
      // const customerEmail = "kubrak.ivan@gmail.com";
      const customerEmail = [
        "ymailo096@gmail.com",
        "maylo.ya@agromat.ua",
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

      await axios.post("/api/send-email/", emailData);
      setMessage("Email sent successfully.");
    } catch (error) {
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
