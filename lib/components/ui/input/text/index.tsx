import classNames from "classnames";

type Props = {
  className?: string;
  type?: string;
  name?: string;
  id?: string;
  placeholder?: string;
};

const InputText = ({
  className,
  type = "text",
  name,
  id,
  placeholder,
  ...props
}: Props) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      {...props}
      className={classNames(
        "w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-primary",
        className
      )}
    />
  );
};

export default InputText;
