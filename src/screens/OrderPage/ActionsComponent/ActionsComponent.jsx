import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEditModeDocument } from "../../../reducers/documentReducers";
import {
  listOrderDetails,
  setAddTaskMode,
  setShowTaskModal,
} from "../../../actions/orderActions";
import { FaEnvelope, FaFileInvoiceDollar } from "react-icons/fa";
import EmailSenderComponent from "../../../components/EmailSenderComponent";
import cn from "classnames";

import "./ActionsComponent.scss";
import { transformDate } from "../../../utils/formatDate";
import { listInvoiceDetails } from "../../../features/invoices/invoicesOperations";

const ActionsComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editModeDocument = useSelector((state) => state.documentsInfo.editMode);
  const order = useSelector((state) => state.ordersInfo.order.data);

  const isInvoiceUpdateNeeded = useSelector(
    (state) => state.invoicesInfo.isInvoiceUpdateNeeded
  );

  const handleDocumentModalOpen = () => {
    dispatch(setEditModeDocument(!editModeDocument));
  };

  const handleAddTaskButtonClick = (e) => {
    e.stopPropagation();
    dispatch(setAddTaskMode(true));
    dispatch(setShowTaskModal(true));
  };

  const handleCreateInvoiceButtonClick = () => {
    if (!order.invoice) {
      navigate("/invoices/create", { state: { initialInvoiceData: null } });
    } else {
      dispatch(listInvoiceDetails(order.invoice.id));
      dispatch(listOrderDetails(order.id));

      navigate(`/invoices/${order.invoice.id}`);
    }
  };

  return (
    <>
      <div className="order-details__actions">
        <button
          className="order-details__action-add-task-btn"
          onClick={handleAddTaskButtonClick}
        >
          Додати завдання
        </button>
        <button
          className="order-details__action-add-documents-btn"
          onClick={handleDocumentModalOpen}
        >
          Документи
        </button>
        {!order.invoice && (
          <button
            className="order-details__action-create-invoice-btn"
            onClick={handleCreateInvoiceButtonClick}
            title="Створити інвойс"
          >
            <FaFileInvoiceDollar />
          </button>
        )}
        {order.invoice && (
          <button
            // className="order-details__action-open-invoice-btn"
            className={cn("order-details__action-open-invoice-btn", {
              "order-details__action-open-invoice-btn_update":
                isInvoiceUpdateNeeded,
            })}
            onClick={handleCreateInvoiceButtonClick}
            title="Відкрити інвойс"
          >
            {isInvoiceUpdateNeeded
              ? "Оновити інвойс № " + order.invoice.number
              : "Інвойс № " +
                order.invoice.number +
                " від " +
                transformDate(order.invoice.invoicing_date)}
            {/* {"Інвойс № " +
              order.invoice.number +
              " від " +
              transformDate(order.invoice.invoicing_date)} */}
          </button>
        )}

        <EmailSenderComponent />
      </div>
    </>
  );
};

export default ActionsComponent;
