import "./TouchContainer.css";

export default ({ direction, onClick }) => {
  const icon = direction === "left" ? "👈" : "👉";
  return (
    <div
      className="touch-container"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
    </div>
  );
};
