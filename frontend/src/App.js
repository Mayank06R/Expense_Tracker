import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { TransactionsProvider } from "@/lib/store";
import Dashboard from "@/pages/Dashboard";

function App() {
  return (
    <div className="App">
      <TransactionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(28,28,26,0.08)",
              color: "#1A1A18",
              fontFamily: "Manrope, sans-serif",
              borderRadius: "16px",
            },
          }}
        />
      </TransactionsProvider>
    </div>
  );
}

export default App;
