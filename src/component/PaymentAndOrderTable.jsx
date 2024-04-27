/* eslint-disable react/prop-types */
import './PaymentAndOrderTable.css';

function PaymentAndOrderTable({ payments, orders }) {
  return (
    <div className="table-container">
      <h2>Payments Details</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Status</th>
            <th>Order ID</th>
            <th>Method</th>
            <th>Description</th>
            <th>VPA</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Fee</th>
            <th>Tax</th>
            <th>RRN</th>
            <th>UPI Transaction ID</th>
            <th>Notes</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.amount}</td>
              <td>{payment.currency}</td>
              <td>{payment.status}</td>
              <td>{payment.order_id}</td>
              <td>{payment.method}</td>
              <td>{payment.description}</td>
              <td>{payment.vpa}</td>
              <td>{payment.email}</td>
              <td>{payment.contact}</td>
              <td>{payment.fee}</td>
              <td>{payment.tax}</td>
              <td>{payment.rrn}</td>
              <td>{payment.upi_transaction_id}</td>
              <td>{JSON.stringify(payment.notes)}</td>
              <td>{payment.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Orders Details</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Amount Paid</th>
            <th>Amount Due</th>
            <th>Currency</th>
            <th>Receipt</th>
            <th>Status</th>
            <th>Attempts</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.amount}</td>
              <td>{order.amount_paid}</td>
              <td>{order.amount_due}</td>
              <td>{order.currency}</td>
              <td>{order.receipt}</td>
              <td>{order.status}</td>
              <td>{order.attempts}</td>
              <td>{order.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentAndOrderTable;
