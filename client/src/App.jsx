import "./App.css";
import Page from "./pages/dashboard/page";
import { LoginPage } from "./pages/LoginPages";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <>
      <header></header>
      <div>
        <aside>
          <Page />
        </aside>
        <main></main>
      </div>

      <footer></footer>
    </>
  );
}

export default App;
