import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full static z-50">
      <span className="loader">
        <span className="third-line"></span>
      </span>
    </div>
  );
}
