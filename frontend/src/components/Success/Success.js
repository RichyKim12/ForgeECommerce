import { RouteLocations } from "../../RouteLocations";
import "./Success.css";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  return (
    <main className="success">
      <div className="success-container">
        <h1 classNames="success-container-title">
          Thank you for shopping at E-Everything!
        </h1>
        <p className="success-container-text">
          Your order has been placed and will be delivered shortly.
        </p>
        <p
          className="success-container-text"
          onClick={() => {
            navigate(RouteLocations.browse);
          }}
          style={{
            cursor: "pointer",
            fontStyle: "italic",
          }}
        >
          Browse more products!
        </p>
      </div>
    </main>
  );
}
