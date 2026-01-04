import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import WhatsAppWidget from "./components/WhatsAppWidget";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <WhatsAppWidget />
    </BrowserRouter>
  );
}
