import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownIcon } from "../../../icons/arrow-down";
import { Fragment } from "react";
import CheckIcon from "../../../icons/check-icon";
import classNames from "classnames";

type Props<T> = {
  className?: string;
  buttonClassName?: string;
  optionsClassName?: string;
  optionClassName?: string;
  value?: DropdownItem<T>;
  onChange?: (value: any) => void;
  items: DropdownItem<T>[];
  renderItem?: React.FC<{ item: DropdownItem<T>; selected: boolean }>;
  renderSelected?: React.FC<{ item: DropdownItem<T> }>;
  placeholder?: string;
};

type DropdownItem<T> = {
  label: string;
  id: T;
};

const DefaultDropdown = <T,>({
  className,
  buttonClassName,
  optionsClassName,
  optionClassName,
  value,
  onChange,
  items,
  renderItem: RenderItemComponent,
  renderSelected: RenderSelectedComponent,
  placeholder,
}: Props<T>) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={classNames("relative", className)}>
        <Listbox.Button
          className={classNames(
            "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm",
            buttonClassName
          )}
        >
          {value ? (
            RenderSelectedComponent ? (
              <RenderSelectedComponent item={value} />
            ) : (
              <span className="block truncate text-base">{value?.label}</span>
            )
          ) : (
            <span className="block truncate">{placeholder}</span>
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ArrowDownIcon
              className="h-2 w-2 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={classNames(
              "absolute z-50 mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
              optionsClassName
            )}
          >
            {items.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  classNames(
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-primary text-white" : "text-gray-900"
                    }`,
                    optionClassName
                  )
                }
                value={item}
              >
                {({ selected }) => (
                  <Fragment>
                    {RenderItemComponent ? (
                      <RenderItemComponent item={item} selected={selected} />
                    ) : (
                      <Fragment>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.label}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 group-hover:text-white group-focus:text-white">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export type { DropdownItem };
export default DefaultDropdown;
