import React from "react";
import "../../../styles/devices.css";

/**
 * MobileShell - Wrapper component for mobile-in-frame presentation
 *
 * Behavior:
 * - Mobile (<=768px): Renders children directly with no wrapper (via CSS display:contents)
 * - Tablet/Desktop (>768px): Renders children inside an iPhone X device frame
 *
 * The device frame creates a containing block via CSS transform, which makes
 * position:fixed elements inside anchor to the frame instead of the browser viewport.
 */
function MobileShell({ children }) {
  return (
    <div className="mobile-shell">
      <div className="device-frame">

        <div className="device-screen">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MobileShell;
