import { RouteLocations } from "../../RouteLocations";
import "../Success/Success.css";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  return (
    <main className="success">
      <div className="success-container">
        <h1 classNames="success-container-title">
          Looks like your order was cancelled.
        </h1>
        <p className="success-container-text">
          Please try again later.
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
