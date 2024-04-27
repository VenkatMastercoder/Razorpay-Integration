import { useEffect, useState } from "react";
import PaymentAndOrderTable from "./component/PaymentAndOrderTable";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [ordersData, setOrdersData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  const amount = 100;
  const currency = "INR";
  const receiptId = "venkatesan";

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  const publishable_key = import.meta.env.VITE_PUBLISHABLE_KEY;

  const paymentHandler = async () => {
    const response = await fetch(`${apiUrl}/order`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_n8QTTMDuVYOUrb", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(`${apiUrl}/order/validate`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Venkatesan", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const paymentHandlerEcommerce = async () => {
    const response = await fetch(`${apiUrl}/order`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
        notes: {
          product_id: "0001",
          user_id: "user001",
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: razorpayKey, // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(`${apiUrl}/order/validate`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Venkatesan", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };

  const fetchData = async () => {
    const response = await fetch(`${apiUrl}/data`);
    const data = await response.json();
    setOrdersData(data.orders);
    setPaymentData(data.payments);
  };

  // Payement Stripe Integration
  const makePaymentStripe = async () => {
    try {
      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: [
            {
              id: 1,
              dish: "punjabi",
              imgdata:
                "https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp",
              address: "North Indian, Biryani, Mughlai",
              delimg:
                "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
              somedata: " 1175 + order placed from here recently",
              price: 350,
              rating: "3.8",
              arrimg:
                "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
              qnty: 1,
            },
            {
              id: 2,
              dish: "Jugaadi Adda vadapav",
              imgdata:
                "https://b.zmtcdn.com/data/pictures/chains/5/19295245/089cbcf1d3307542c72f77272556b28b_o2_featured_v2.jpg?output-format=webp",
              address: "Street Food",
              delimg:
                "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
              somedata: " 2525 + order placed from here recently",
              price: 25,
              rating: "3.9",
              arrimg:
                "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
              qnty: 1,
            },
            {
              id: 3,
              dish: "La Milano Pizza",
              imgdata:
                "https://b.zmtcdn.com/data/pictures/chains/1/19708611/10f90d4a69678d98662514d173b29665_o2_featured_v2.jpg",
              address: "Pizza, Fast Food, Pasta",
              delimg:
                "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
              somedata: " 650 + order placed from here recently",
              price: 70,
              rating: "4.2",
              arrimg:
                "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
              qnty: 1,
            },
            {
              id: 4,
              dish: "Momoman Momos",
              imgdata:
                "https://b.zmtcdn.com/data/pictures/chains/1/113401/59f29399060caefcc575d59dc9402ce8_o2_featured_v2.jpg",
              address: "Momos",
              delimg:
                "https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp",
              somedata: " 300 + order placed from here recently",
              price: 70,
              rating: "3.8",
              arrimg:
                "https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp",
              qnty: 1,
            },
          ],
        }),
      });

      const session = await response.json();

      const stripe = await loadStripe(publishable_key);
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="button-container">
          <button className="button-primary" onClick={paymentHandler}>
            Pay Now
          </button>
          <button
            className="button-secondary"
            onClick={paymentHandlerEcommerce}>
            Ecommerce Product
          </button>
          <button className="button-tertiary" onClick={fetchData}>
            Refresh Data
          </button>
          <button className="button-primary" onClick={makePaymentStripe}>Stripe Payment</button>
        </div>
      </div>

      <div>
        <PaymentAndOrderTable payments={paymentData} orders={ordersData} />
      </div>
    </>
  );
}

export default App;
