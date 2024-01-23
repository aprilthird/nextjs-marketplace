import { Switch } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";

type Props = {
  className?: string;
  label?: string;
  isChecked: boolean;
  onChange?: (checked: boolean) => void;
};

const DefaultSwitch = ({ className, label, isChecked, onChange }: Props) => {
  return (
    <Switch checked={isChecked} onChange={onChange} as={Fragment}>
      {({ checked }) => (
        /* Use the `checked` state to conditionally style the button. */
        <button
          className={`${
            checked ? "bg-primary" : "bg-gray-400"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          {label && <span className="sr-only">{label}</span>}
          <span
            className={`${
              checked ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </button>
      )}
    </Switch>
  );
};

export default DefaultSwitch;
