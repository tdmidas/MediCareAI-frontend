import React from "react";

const SideContentLayout = ({ children }) => {
    return (
        <div style={{ gap: "2.3rem", width: 350 }}>
            {children}
        </div>
    );
}

export default SideContentLayout;