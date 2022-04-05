interface EntryProps {
  type?: "text" | "number";
  text: string;
  value: any;
  readOnly?: boolean;
  className?: string;
  onChange?: (value: any) => void;
}

export default function Entry(props: EntryProps) {
  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className="mb-4">{props.text}</label>
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        readOnly={props.readOnly}
        className={`
            border border-purple-500 rounded-lg
            focus:outline-none bg-gray-100
            ${props.readOnly ? "" : "focus:bg-white"}
            px-4 py-2
        `}
      />
    </div>
  );
}
