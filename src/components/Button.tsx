interface ButtonProps {
  color?: "green" | "red" | "blue" | "gray";
  children: any;
  className?: string;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  const color = props.color ? props.color : "green";
  return (
    <button
      onClick={props.onClick}
      className={`
        bg-gradient-to-r from-${color}-500 to-${color}-700 
        text-white rounded-md px-4 py-2
        my-2 ${props.className}
        `}
    >
      {props.children}
    </button>
  );
}
