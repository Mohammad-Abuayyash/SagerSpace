import Header from "./components/Header";
import MapPage from "./components/MapPage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex w-full flex-1">
        <Sidebar />
        <MapPage />
      </div>
    </div>
  );
}

export default App;
