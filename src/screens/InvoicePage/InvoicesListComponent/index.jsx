import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx"; // Import xlsx library

import { selectInvoices } from "../../../features/invoices/invoicesSelectors";
import { listInvoices } from "../../../features/invoices/invoicesOperations";
import tableHeaderInvoices from "./tableHeaderInvoices.json";

import { formatNumberForExcel } from "../../../utils/formatNumber";
import { formatNumber } from "../../../features/invoices/invoiceUtils";
import { transformDate, transformDateFormat } from "../../../utils/formatDate";

import InvoiceActionsComponent from "../InvoicesListComponent/InvoiceActionsComponent";

import "./style.scss";

const InvoicesListComponent = () => {
  const dispatch = useDispatch();
  const invoicesList = useSelector(selectInvoices);
  console.log("Invoices List", invoicesList);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(listInvoices());
  }, []);

  const sortedInvoices = [...invoicesList].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  const filteredInvoices = sortedInvoices.filter((invoice) => {
    const invoicingDate = new Date(invoice.invoicing_date);
    // Check if the invoice date is within the range (inclusive)
    if (startDate && invoicingDate < startDate) return false; // Outside the range
    if (endDate && invoicingDate > endDate) return false; // Outside the range

    return true; // Within the range
  });

  // Function to handle Excel export
  const exportToExcel = () => {
    // Check if dates are selected
    if (!startDate || !endDate) {
      alert("Ви повинні спочатку обрати дати.");
      return;
    }

    const confirmExcelExport = window.confirm(
      "Ви впевнені, що хочете вивантажити таблицю в Excel?"
    );
    if (!confirmExcelExport) {
      return;
    }

    // Format data for export
    const exportData = filteredInvoices.map((invoice) => [
      transformDate(invoice.created_at),
      invoice.invoicing_date !== null ? "Не оплачено" : "Оплачено",
      transformDateFormat(invoice.invoicing_date),
      invoice.number,
      formatNumberForExcel(invoice.price),
      formatNumberForExcel(invoice.vat),
      formatNumberForExcel(invoice.total_price),
      invoice.currency,
      invoice.order_number,
      invoice.customer,
      invoice.service_name,
      invoice.truck,
      invoice.trailer,
      transformDateFormat(invoice.loading_date),
      transformDateFormat(invoice.unloading_date),
    ]);

    // Add header row
    const header = [
      "Дата створення",
      "Статус",
      "Дата виставлення рахунку",
      "Номер рахунку",
      "Ціна",
      "ПДВ",
      "Загальна ціна",
      "Валюта",
      "Номер замовлення",
      "Замовник",
      "Послуга",
      "Вантажівка",
      "Причіп",
      "Дата завантаження",
      "Дата розвантаження",
    ];

    // Combine header and data
    const worksheetData = [header, ...exportData];

    // Create worksheet and append data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Auto-fit column widths
    const colWidths = worksheetData[0].map((_, colIndex) =>
      Math.max(
        ...worksheetData.map((row) =>
          row[colIndex] ? row[colIndex].toString().length : 0
        )
      )
    );
    worksheet["!cols"] = colWidths.map((width) => ({ wch: width + 1 }));

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

    // Trigger download
    const fileName = `Рахунки ${transformDate(startDate)} - ${transformDate(
      endDate
    )}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="invoices-table-container">
      <div className="invoices-table-block">
        <h2 className="table__name">Рахунки</h2>
      </div>
      <InvoiceActionsComponent
        onExcelDownload={exportToExcel}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={(date) => setStartDate(date)}
        onEndDateChange={(date) => setEndDate(date)}
      />
      <div className="table-container">
        <table className="invoices-table">
          <thead className="invoices-table__header">
            <tr className="invoices-table__header-row">
              {tableHeaderInvoices.map((col, index) => (
                <th
                  key={index}
                  className="orders-table__header-th"
                  id={Object.values(col)}
                >
                  {Object.values(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="invoices-table__body">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="invoices-table__body-row">
                <td className="invoices-table__body-td">
                  {transformDateFormat(invoice.invoicing_date)}
                </td>
                <td className="invoices-table__body-td">{invoice.number}</td>
                <td
                  className="invoices-table__body-td"
                  style={{ textAlign: "right" }}
                >
                  {formatNumber(invoice.price)}
                </td>
                <td
                  className="invoices-table__body-td"
                  style={{ textAlign: "right" }}
                >
                  {formatNumber(invoice.vat)}
                </td>
                <td
                  className="invoices-table__body-td"
                  style={{ textAlign: "right" }}
                >
                  {formatNumber(invoice.total_price)}
                </td>
                <td className="invoices-table__body-td">{invoice.currency}</td>
                <td className="invoices-table__body-td">
                  {transformDateFormat(invoice.due_date)}
                </td>
                <td className="invoices-table__body-td">
                  {invoice.paid_date && transformDateFormat(invoice.paid_date)}
                </td>
                <td headers={"Status"} className="invoices-table__body-td">
                  {invoice.invoicing_date !== null ? (
                    <div style={{ color: "red" }}>Не оплачено</div>
                  ) : (
                    <div style={{ color: "green" }}>Оплачено</div>
                  )}
                </td>
                <td className="invoices-table__body-td">
                  {invoice.order_number}
                </td>
                <td className="invoices-table__body-td">{invoice.customer}</td>
                <td className="invoices-table__body-td">
                  {invoice.service_name}
                </td>
                <td className="invoices-table__body-td">{invoice.truck}</td>
                <td className="invoices-table__body-td">{invoice.trailer}</td>
                <td className="invoices-table__body-td">
                  {transformDateFormat(invoice.loading_date)}
                </td>
                <td className="invoices-table__body-td">
                  {transformDateFormat(invoice.unloading_date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesListComponent;
