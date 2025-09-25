import UserInput from "./components/UserInput/UserInput";
import Table from "./components/Table/Table";
import { MatrixProvider } from "./context/MatrixProvider";

function App() {
  return (
    <MatrixProvider>
      <div className="app-container">
        <h1>Frontend React Test Task</h1>
        <UserInput />
        <Table />
      </div>
    </MatrixProvider>
  );
}

export default App;
