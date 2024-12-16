export const getEmailsFromOrder = (order, customer) => {
  const emails = new Set(); // Use a Set to avoid duplicates

  // Add the customer manager email
  if (customer?.email) {
    emails.add(customer.email);
  }

  // Add customer manager email from the order
  const managerName = order.customer_manager;
  const manager = customer?.managers?.find(
    (manager) => manager.full_name === managerName
  );
  if (manager?.email) {
    emails.add(manager.email);
  }

  // Return the email list as an array
  return Array.from(emails);
};
