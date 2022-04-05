import { useState } from "react";
import Client from "../core/Client.ts";
import Button from "./Button.tsx";
import FormEntry from "./FormEntry.tsx";

interface FormProps {
  client: Client;
  cancel?: () => void;
  changeClient?: (client: Client) => void;
}

export default function Form(props: FormProps) {
  const id = props.client?.id;
  const [name, setName] = useState(props.client?.name);
  const [age, setAge] = useState(props.client?.age ?? 0);

  return (
    <div>
      {id ? <FormEntry readOnly text="Código" value={id} /> : false}
      <FormEntry text="Nome" value={name} onChange={setName} className="mb-4" />
      <FormEntry
        text="Idade"
        type="number"
        value={age}
        className="mb-4"
        onChange={setAge}
      />
      <div className="flex justify-end">
        <Button
          color="green"
          className="mr-2"
          onClick={() => props.changeClient?.(new Client(id, name, +age))}
        >
          Salvar
        </Button>
        <Button color="blue" onClick={props.cancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
