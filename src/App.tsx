import SessionProvider from "./provider/session-provider";
import RootRoute from "./root-router";

function App() {
  return (
    <SessionProvider>
      <RootRoute />;
    </SessionProvider>
  );
}

export default App;
