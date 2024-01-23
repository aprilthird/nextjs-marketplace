"use client";
import classNames from "classnames";
import React, { useState } from "react";

type TabsProps = {
  className?: string;
};

const Tabs = ({ className, children }: React.PropsWithChildren<TabsProps>) => {
  const [activeTab, setActiveTab] = useState(
    (children as any[])[0].props.label
  );

  const handleClick = (e: any, newActiveTab: any) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className={classNames("max-w-xxl mx-auto", className)}>
      <div className="flex border-b border-gray-300">
        {(children as any[]).map((child) => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? "border-b-2 border-primary" : ""
            } flex-1 text-gray-700 font-medium py-2 text-lg`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      {(children as any[]).map((child) => {
        if (child.props.label === activeTab) {
          return <div key={child.props.label}>{child.props.children}</div>;
        }
        return null;
      })}
    </div>
  );
};

type TabProps = {
  label: string;
};

const Tab = ({ label, children }: React.PropsWithChildren<TabProps>) => {
  return (
    <>
      <h6>{label}</h6>
      <div className="hidden">{children}</div>
    </>
  );
};
export { Tabs, Tab };
