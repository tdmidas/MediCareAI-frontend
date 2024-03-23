import React from "react";
const MainContentLayout = ({ children }) => {
    return (
        <div style={{ flex: 1 }}>
            {children}
        </div>
    );
}

export default MainContentLayout;