import React from 'react';
import './index.css';
import Router from './router';

import * as ReactDOMClient from "react-dom/client";
ReactDOMClient.createRoot(document.getElementById("root")).render(
        <Router />
);
