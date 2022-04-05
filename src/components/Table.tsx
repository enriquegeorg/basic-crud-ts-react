import Client from "../core/Client";
import { trashIcon, editIcon } from "./Icons.tsx";

interface TableProps {
  clients: Client[];
  selectedClient?: (client: Client) => void;
  removedClient?: (client: Client) => void;
}

export default function Table(props: TableProps) {
  const avaibleOptions = props.selectedClient || props.removedClient;

  function renderHeader() {
    return (
      <tr>
        <th className="text-left p-4">Código</th>
        <th className="text-left p-4">Nome</th>
        <th className="text-left p-4">Idade</th>
        {avaibleOptions ? <th className="text-center p-4">Ações</th> : false}
      </tr>
    );
  }

  function renderBody() {
    return props.clients?.map((client, i) => {
      return (
        <tr
          key={client.id}
          className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
        >
          <td className="text-left p-4">{client.id}</td>
          <td className="text-left p-4">{client.name}</td>
          <td className="text-left p-4">{client.age}</td>
          {avaibleOptions ? renderActions(client) : false}
        </tr>
      );
    });
  }

  function renderActions(client: Client) {
    return (
      <td className="flex justify-center">
        {avaibleOptions ? (
          <button
            onClick={() => props.selectedClient(client)}
            className="
            flex justify-center items-center p-2 m-1 
            text-blue-500 hover:bg-blue-200 rounded-full"
          >
            {editIcon}
          </button>
        ) : (
          false
        )}
        {avaibleOptions ? (
          <button
            onClick={() => props.removedClient(client)}
            className="
            flex justify-center items-center p-2 m-1 
            text-red-500 hover:bg-red-200 rounded-full"
          >
            {trashIcon}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead
        className={`
        bg-gradient-to-r from-purple-500 to-purple-800 text-gray-100
      `}
      >
        {renderHeader()}
      </thead>
      <tbody>{renderBody()}</tbody>
    </table>
  );
}
