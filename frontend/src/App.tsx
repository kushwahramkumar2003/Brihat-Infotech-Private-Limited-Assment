import "./App.css";
import SignUp from "./pages/SignUp";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUp />
     
    </QueryClientProvider>
  );
}

export default App;
