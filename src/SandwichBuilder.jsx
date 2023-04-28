import React, { useEffect } from "react";
import { useSandwichContext } from "./SandwichContext";

export default function SandwichBuilder() {
  const { selectedOptions } = useSandwichContext();

  return (
    <div>
      <div className="sandwich-header">
        {selectedOptions.length === 0 || selectedOptions[0] === "" ? (
          <div>The Ultimate Sandwich Awaits...</div>
        ) : (
          selectedOptions.map((s, i) => {
            return (
              <div className="sandwich-list-text" key={i}>
                {s}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
