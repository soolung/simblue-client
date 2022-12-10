import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

function Loading() {
    return (
        <div className="contentWrap">
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <MoonLoader
                    color="#C2C2C2"
                    height={15}
                    width={5}
                    radius={2}
                    margin={2}
                />
            </div>
        </div>
    );
}

export default Loading;
