import { createRoot } from "react-dom/client";
import App from './UI/components/App/App';

import './styles/index.scss';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
    <App />
);
