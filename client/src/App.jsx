import "./App.css";
import TaskColumn from "./components/TaskColumn";
import TaskArea from "./components/TaskArea";

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-background">
      <TaskArea />
    </div>
  );
}

export default App;
