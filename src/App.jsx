import "./App.css";
import FinishedTable from "./components/FinishedTable";
import LiveTable from "./components/LiveTable";
import MoveTable from "./components/MoveTable";
import ScheduleTable from "./components/ScheduleTable";

function App() {
  return (
    <>
      <h2>LiveScore Application</h2>
      <div className="container">
        <div className="coluna">
          <ScheduleTable />
          <LiveTable />
        </div>
        <MoveTable />
        <div className="coluna">
          <FinishedTable />
          {/* <MatchesByDateTable />
          <FinishedByDateTable /> */}
        </div>
      </div>
    </>
  );
}

export default App;
