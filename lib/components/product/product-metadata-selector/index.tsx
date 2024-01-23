"use client";
import classNames from "classnames";
import React, { useState } from "react";

type Props = {
  className?: string;
  label: string;
  options: string[];
  onChange: (selectedOption: string) => void;
};

export default function ProductMetadataSelector({
  className,
  label,
  options,
  onChange,
}: React.PropsWithChildren<Props>) {
  const [selectedOption, setSelectedOption] = useState("");

  const selectOption = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption("");
      onChange("");
    } else {
      setSelectedOption(option);
      onChange(option);
    }
  };

  return (
    <React.Fragment>
      <div className={classNames("", className)}>
        <div>
          <span>{label}:</span>
          {selectedOption && (
            <span className="ml-2 text-primary font-medium">
              {selectedOption}
            </span>
          )}
        </div>
        <div className="flex space-x-2 mt-1">
          {options.map((option, index: number) => {
            return (
              <div
                key={`product_metadata_${index}_${option}`}
                onClick={() => selectOption(option)}
                className={classNames(
                  "text-white text-xs font-bold p-2 rounded-lg cursor-pointer lg:text-sm",
                  option == selectedOption ? "bg-secondary" : "bg-secondary/60"
                )}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
