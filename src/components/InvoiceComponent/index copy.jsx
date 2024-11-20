import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { setCustomerDetailsData } from "../../features/customers/customersSlice";
import { calculateDueDate, transformDate } from "../../utils/formatDate";
import { findTrailer } from "../OrdersTableComponent/OrdersTableComponent";
import { FaArrowLeft, FaFilePdf } from "react-icons/fa";
import {
  createInvoice,
  listInvoiceDetails,
  updateInvoice,
} from "../../features/invoices/invoicesOperations";
import { listOrderDetails } from "../../actions/orderActions";
import {
  compareInvoiceWithOrder,
  renderRouteTitle,
  totalPrice,
  formatNumber,
} from "../../features/invoices/invoiceUtils";
import { setInvoiceUpdateNeeded } from "../../features/invoices/invoicesSlice";
import { listCustomers } from "../../features/customers/customersOperations";

import { listCurrencies } from "../../features/currencies/currenciesOperations";
import { selectCurrencies } from "../../features/currencies/currenciesSelectors";

import "./style.scss";

const { REACT_APP_COMPANY_CURRENCY: COMPANY_CURRENCY } = import.meta.env;

const InvoiceComponent = () => {
  const isInvoiceUpdateNeeded = useSelector(
    (state) => state.invoicesInfo.isInvoiceUpdateNeeded
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialInvoiceData = location.state?.initialInvoiceData;
  const { invoiceId } = useParams();

  console.log("initialInvoiceData", initialInvoiceData);

  const order = useSelector((state) => state.ordersInfo.order.data);
  const customers = useSelector((state) => state.customersInfo.customers.data);
  const currencies = useSelector(selectCurrencies);

  const customer = useSelector((state) => state.customersInfo.customer.data);
  const trucks = useSelector((state) => state.trucksInfo.trucks.data);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [invoiceNumber, setInvoiceNumber] = useState(
    initialInvoiceData?.number || ""
  );
  const [currencyRate, setCurrencyRate] = useState(
    initialInvoiceData?.currency_rate || COMPANY_CURRENCY
  );

  // useEffect(() => {
  //   if (!initialInvoiceData && invoiceId) {
  //     dispatch(listInvoiceDetails(invoiceId)).then((data) => {
  //       setInvoiceNumber(data.number);
  //       setCurrencyRate(data.currency_rate);
  //     });
  //   }
  // }, [dispatch, invoiceId, initialInvoiceData]);

  const getCurrencyId = (currencyName) => {
    return currencies.filter(
      (currency) => currency.short_name === currencyName
    )[0]?.id;
  };

  const invoiceDataFromDB = useMemo(() => {
    if (initialInvoiceData) {
      return {
        ...initialInvoiceData,
      };
    }
  }, [initialInvoiceData]);

  const invoiceDataFromOrder = useMemo(() => {
    if (!initialInvoiceData && order) {
      return {
        invoice_number: invoiceNumber,
        service_name: renderRouteTitle(order),
        truck: order?.truck,
        trailer: findTrailer(order?.truck, trucks),
        loading_date: order?.loading_end_date,
        unloading_date: order?.unloading_end_date,
        order_number: order?.order_number,
        company_id: 1,
        order_id: order?.id,
        price: parseFloat(order?.price),
        vat: order?.vat ? parseFloat(order.price) * 0.21 : 0,
        total_price: parseFloat(totalPrice(order?.vat, order.price)),
        currency: order?.currency,
        currency_rate: parseFloat(COMPANY_CURRENCY),
        customer: order?.customer,
        customer_id: customer?.id,
        invoicing_date: order?.unloading_end_date,
        vat_date: order?.unloading_end_date,
        due_date: calculateDueDate(
          order?.unloading_end_date,
          order?.payment_period
        ),
        send_date: null,
        accepted_date: null,
        payment_date: null,
        user: userInfo?.id,
      };
    }
  }, [order]);

  const invoiceData = invoiceDataFromDB || invoiceDataFromOrder;

  // useEffect(() => {
  //   dispatch(
  //     setInvoiceUpdateNeeded(compareInvoiceWithOrder(order, invoiceData))
  //   );
  // }, [order, order.invoice]); // Include `order.invoice` to track changes

  useEffect(() => {
    dispatch(listCustomers());
    dispatch(listCurrencies());
    dispatch(listOrderDetails(invoiceData?.order_id));
  }, [dispatch, invoiceData?.order_id]);

  useEffect(() => {
    if (invoiceData) {
      const customer = customers.find(
        (cust) => cust.name === invoiceData.customer
      );
      dispatch(setCustomerDetailsData(customer));
    }
  }, [customers, invoiceData]);

  const handleDownloadPDF = () => {
    const element = document.getElementById("invoice");

    html2canvas(element, {
      scale: 3,
      onclone: (clonedDoc) => {
        // Hide the button in the cloned document for PDF generation
        clonedDoc.getElementById("downloadButton").style.display = "none";
        clonedDoc.getElementById("returnButton").style.display = "none";
        !order.invoice
          ? (clonedDoc.getElementById("saveInvoiceButton").style.display =
              "none")
          : null;
        !invoiceData
          ? (clonedDoc.getElementById("updateInvoiceButton").style.display =
              "none")
          : null;
        initialInvoiceData
          ? (clonedDoc.getElementById("createdInfo").style.display = "none")
          : null;
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `Invoice_${invoiceNumber || ""}_${transformDate(
          order.unloading_end_date
        )}.pdf`
      );
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateInvoice = () => {
    let newInvoiceData = {
      invoice_number: invoiceNumber || "",
      service_name: renderRouteTitle(order),
      truck: order.truck,
      trailer: findTrailer(order.truck, trucks),
      loading_date: order.loading_end_date,
      unloading_date: order.unloading_end_date,
      order_number: order.order_number,
      company_id: 1,
      order_id: order.id,

      price: parseFloat(order.price),
      vat: order.vat ? order.price * 0.21 : 0,
      total_price: parseFloat(totalPrice(order.vat, order)),

      currency_id: getCurrencyId(order?.currency),

      currency_rate: currencyRate,
      customer_id: customer.id,
      invoicing_date: order.unloading_end_date,
      vat_date: order.unloading_end_date,
      due_date: calculateDueDate(
        order.unloading_end_date,
        order.payment_period
      ),
      send_date: null,
      accepted_date: null,
      payment_date: null,
      user: userInfo.id,
    };

    console.log("Invoice data", newInvoiceData);
    dispatch(createInvoice(newInvoiceData));
    dispatch(listOrderDetails(order.id));
  };

  // const handleUpdateInvoice = () => {
  //   const updatedInvoiceData = {
  //     ...invoiceData,
  //   };

  //   dispatch(updateInvoice(updatedInvoiceData));
  //   // dispatch(listOrderDetails(order_id));

  //   console.log("Updated Invoice Data", updatedInvoiceData);
  // };
  const handleUpdateInvoice = () => {
    // Compare fields between invoiceData and order
    const updatedFields = {};

    if (invoiceData.service_name !== renderRouteTitle(order)) {
      updatedFields.service_name = renderRouteTitle(order);
    }
    if (invoiceData.truck !== order?.truck) {
      updatedFields.truck = order?.truck;
    }
    if (invoiceData.trailer !== findTrailer(order?.truck, trucks)) {
      updatedFields.trailer = findTrailer(order?.truck, trucks);
    }
    if (invoiceData.price !== order?.price) {
      updatedFields.price = order?.price;
    }
    if (invoiceData.vat !== order?.vat) {
      updatedFields.vat = order?.vat;
    }
    if (invoiceData.currency !== order?.currency) {
      updatedFields.currency = order?.currency;
    }
    if (invoiceData.loading_date !== order?.loading_end_date) {
      updatedFields.loading_date = order?.loading_end_date;
    }
    if (invoiceData.unloading_date !== order?.unloading_end_date) {
      updatedFields.unloading_date = order?.unloading_end_date;
    }
    if (invoiceData.invoicing_date !== order?.unloading_end_date) {
      updatedFields.invoicing_date = order?.unloading_end_date;
    }
    if (invoiceData.vat_date !== order?.unloading_end_date) {
      updatedFields.vat_date = order?.unloading_end_date;
    }
    if (invoiceData.currency_rate !== COMPANY_CURRENCY) {
      updatedFields.currency_rate = COMPANY_CURRENCY;
    }

    // If no fields have changed, exit early
    if (Object.keys(updatedFields).length === 0) {
      console.log("No fields changed. Update not required.");
      return;
    }

    // Merge the changes into the current invoiceData
    const updatedInvoiceData = {
      ...invoiceData,
      ...updatedFields,
    };

    // const orderId = order?.id || invoiceData.order_id;

    // if (!orderId) {
    //   console.error("Order ID is missing. Cannot fetch order details.");
    //   return;
    // }

    // Dispatch update action
    dispatch(updateInvoice(updatedInvoiceData))
      .then(() => {
        console.log("Invoice updated successfully:", updatedInvoiceData);
        dispatch(listOrderDetails(order.id));
      })
      .catch((error) => {
        console.error("Failed to update invoice:", error);
      });
  };

  return (
    <div
      id="invoice"
      className="invoice"
      style={{
        padding: "20px",
        paddingTop: "10px",
        paddingBottom: "50px",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "1.4",
        width: "800px",
        margin: "0 auto",
        color: "#000",
        backgroundColor: "#fff",
      }}
    >
      {/* Show Invoice Created Message */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          height: "35px",
        }}
      >
        <div
          id="returnButton"
          className="invoice__return-btn"
          onClick={handleGoBack}
          title="Go back"
        >
          <FaArrowLeft />
        </div>
        {initialInvoiceData && (
          <div id="createdInfo" className="invoice__created-info">
            Invoice created at {transformDate(invoiceData.created_at)}
          </div>
        )}
        {!invoiceId && (
          <button
            type="button"
            id="saveInvoiceButton"
            className="invoice__save-invoice-btn"
            onClick={handleCreateInvoice}
            title="Створити інвойс"
          >
            Зберегти інвойс
          </button>
        )}

        {/* Download PDF Button */}
        <button
          type="button"
          onClick={handleDownloadPDF}
          id="downloadButton"
          className="invoice__create-pdf-btn"
          title="Створити PDF файл"
        >
          <FaFilePdf />
        </button>
      </div>
      {/* Invoice Actions */}
      <div className="invoice__actions">
        {/* Update Invoice Button */}
        {invoiceData && (
          <button
            type="button"
            id="updateInvoiceButton"
            className="invoice__update-invoice-btn"
            onClick={handleUpdateInvoice}
            title="Оновити інвойс"
          >
            Оновити інвойс
          </button>
        )}
      </div>

      {/* Invoice Header */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px" }}>INVOICE No {invoiceNumber}</h3>
        <div style={{ fontSize: "12px" }}>
          <strong>Contract:</strong> Objednávka č. (Transport Order Nr.):
        </div>
        <div style={{ fontSize: "12px" }}>
          <strong>{invoiceData?.order_number || ""}</strong>
        </div>
      </div>

      {/* Customer Details */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
          paddingBottom: "10px",
        }}
      >
        <div style={{ width: "70%" }}>
          <strong>Dodavatel (Consignor):</strong>
          <br />
          DELTA LOGISTICS s.r.o.
          <br />
          Kodymova 2536/14 Stodulky,
          <br />
          158 00 Praha 5, Czech Republic
          <br />
          IČ (CRN): 24295540
          <br />
          DIČ (VAT): CZ24295540
          <br />
          Mobil: 607106698, 602305069
          <br />
          E-mail: lenex@email.cz
          <br />
          <strong>Bank details:</strong>
          <br />
          Ceska sporitelna, a.s.
          <br />
          Olbrachtova 1929/62, 140 000 Praha 4, Czech Republic
          <br />
          IBAN: CZ78 0800 0000 0000 0785 7082 (for EUR)
          <br />
          č.ú. (Account Nr.): 7857082/0800 (EUR)
          <br />
          SWIFT (BIC): GIBACZPX
          <br />
        </div>
        <div style={{ textAlign: "left", width: "50%" }}>
          <strong>Odběratel (Consignee):</strong>
          <br />
          {customer?.name}
          <br />
          {customer?.nip_number}
          <br />
          {customer?.post_address}
          <br />
          {customer?.email}
          <br />
          {customer?.phone}
        </div>
      </div>

      {/* Invoice Dates */}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          gap: "20px",
          paddingTop: "10px",
          borderBottom: "1px solid black",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
            paddingBottom: "10px",
            gap: "5px",
          }}
        >
          <div>
            <strong>Datum vystaveni: (Date of invoicing)</strong>
          </div>
          <div>
            <strong>Datum uskutečnění plnění: (VAT Date)</strong>{" "}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "10px",
            paddingBottom: "10px",
            gap: "5px",
          }}
        >
          <div>{transformDate(invoiceData?.invoicing_date)}</div>
          <div>{transformDate(invoiceData?.vat_date)}</div>
        </div>
      </div>

      {/* Invoice Table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          borderBottom: "1px solid black",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid black" }}>
            <th>Označení dodávky (Service name)</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price {invoiceData?.currency}</th>
            <th>VAT</th>
            <th>Gross value</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: "50px", textAlign: "center" }}>
            <td>
              Transportation:
              <br />
              <span>{invoiceData?.service_name}</span>
            </td>
            <td>1</td>
            <td>TIR</td>
            <td>{formatNumber(invoiceData?.price)}</td>
            <td>{invoiceData?.vat ? "21%" : "0%"}</td>
            <td>
              {formatNumber(totalPrice(invoiceData?.vat, invoiceData?.price))}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Invoice Trucks details */}
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          marginTop: "10px",
          marginBottom: "20px",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "20px",
            }}
          >
            <strong>Loading date:</strong>
            <span>{transformDate(invoiceData?.loading_date)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <strong>Unloading date:</strong>
            <span>{transformDate(invoiceData?.unloading_date)}</span>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "20px",
            }}
          >
            <strong>Truck No.:</strong>
            <span>{invoiceData?.truck}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <strong>Trailer No.:</strong>
            <span>{invoiceData?.trailer}</span>
          </div>
        </div>
      </div>

      {/* VAT Tables */}
      {invoiceData.vat && (
        <>
          <div style={{ marginTop: "20px" }}>
            {/* Top Row Tables */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Left Table: Přehled DPH */}
              <div
                style={{
                  border: "1px solid black",
                  width: "60%",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "12px",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "center",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        colSpan="3"
                        style={{
                          border: "1px solid black",
                          padding: "5px",
                        }}
                      >
                        Přehled DPH (v Kč)
                      </th>
                    </tr>
                    <tr>
                      <th style={{ border: "1px solid black", padding: "5px" }}>
                        bez DPH
                      </th>
                      <th style={{ border: "1px solid black", padding: "5px" }}>
                        Výše DPH
                      </th>
                      <th style={{ border: "1px solid black", padding: "5px" }}>
                        Celkem
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: "1px solid black", padding: "5px" }}>
                        {invoiceData?.price && currencyRate
                          ? formatNumber(
                              invoiceData?.currency === "EUR"
                                ? invoiceData?.price * currencyRate
                                : invoiceData?.price
                            )
                          : "N/A"}
                      </td>
                      <td style={{ border: "1px solid black", padding: "5px" }}>
                        {invoiceData?.price && currencyRate
                          ? formatNumber(
                              invoiceData?.currency === "EUR"
                                ? invoiceData?.price * currencyRate * 0.21
                                : invoiceData?.price * 0.21
                            )
                          : "N/A"}
                      </td>
                      <td style={{ border: "1px solid black", padding: "5px" }}>
                        {invoiceData?.currency === "CZK" &&
                          formatNumber(
                            totalPrice(invoiceData?.vat, invoiceData?.price)
                          )}
                        {invoiceData?.currency === "EUR" &&
                          formatNumber(
                            (
                              totalPrice(invoiceData?.vat, invoiceData?.price) *
                              currencyRate
                            ).toFixed(2)
                          )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Right Table: Částky v EUR */}
              <div
                style={{
                  border: "1px solid black",
                  width: "25%",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "12px",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "center",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        colSpan="1"
                        style={{
                          border: "1px solid black",
                          padding: "5px",
                        }}
                      >
                        Částky v EUR
                      </th>
                    </tr>
                    <tr>
                      <th
                        colSpan="1"
                        style={{ border: "1px solid black", padding: "5px" }}
                      >
                        Celkem vč. DPH
                      </th>
                    </tr>
                    <tr>
                      <th
                        colSpan="1"
                        style={{ border: "1px solid black", padding: "5px" }}
                      >
                        {formatNumber(
                          totalPrice(invoiceData?.vat, invoiceData?.price)
                        )}
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            <br />

            {/* Amount Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
                marginTop: "20px",
                fontFamily: "Arial, sans-serif",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              <strong>Částka k úhradě EUR:</strong>{" "}
              <div
                style={{
                  fontWeight: "bold",
                  border: "2px solid black",
                  padding: "5px",
                  width: "25%",
                  marginLeft: "20px",
                }}
              >
                {formatNumber(totalPrice(invoiceData?.vat, invoiceData?.price))}
              </div>
            </div>
          </div>

          {/* Final Kurs Table */}
          <div
            style={{
              border: "1px solid black",
              marginTop: "20px",
              width: "40%",
              fontFamily: "Arial, sans-serif",
              fontSize: "12px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th
                    colSpan="1"
                    style={{ border: "1px solid black", padding: "5px" }}
                  >
                    Kurs {invoiceData?.vat_date?.slice(0, 4)}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan="1"
                    style={{ border: "1px solid black", padding: "5px" }}
                  >
                    {currencyRate}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Total Price in Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          flexDirection: "column",
          gap: "5px",
          textAlign: "right",
          marginTop: "20px",
          fontWeight: "bold",
        }}
      >
        <div>
          Součet: EUR{" "}
          {formatNumber(totalPrice(invoiceData?.vat, invoiceData?.price))}
        </div>
        <div>
          TOTAL: EUR{" "}
          {formatNumber(totalPrice(invoiceData?.vat, invoiceData?.price))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
