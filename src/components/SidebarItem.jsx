const SidebarItem = ({ icon, label, isActive, onClick }) => (
  <div
    className={`flex flex-col items-center justify-center px-4 py-3 gap-2 w-full ${
      isActive ? "active border-l-4 border-red-700" : ""
    }`}
    onClick={onClick}
    style={{
      cursor: "pointer",
      backgroundColor: isActive ? "#272727" : "#111111",
      marginBottom: "0.4rem",
      transition: "all 0.2s ease",
    }}
  >
    <img
      src={icon}
      alt={label}
      style={{ width: "20px", marginRight: "10px" }}
    />
    <p style={{ color: isActive ? "white" : "gray" }}>{label}</p>
  </div>
);

export default SidebarItem;
