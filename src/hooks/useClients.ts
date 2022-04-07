import { useEffect, useState } from "react";
import ClientColection from "../../firebase/db/ClientColection";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";
import useChangeView from "./useChangeView";

export default function useClients() {
  const repo: ClientRepository = new ClientColection();

  const { table, changeToForm, changeToTable } = useChangeView()

  const [client, setClient] = useState<Client>(Client.void());
  const [clientsList, setClientsList] = useState<Client[]>([]);

  useEffect(getAll, []);

  function getAll() {
    repo.getAll().then((clients) => {
      setClientsList(clients);
      changeToTable
    });
  }

  function selectedClient(client: Client) {
    setClient(client);
    changeToForm
  }

  async function removedClient(client: Client) {
    await repo.remove(client);
    getAll();
  }

  async function saveClient(client: Client) {
    await repo.save(client);
    changeToTable
    getAll();
  }

  function newClient() {
    setClient(Client.void());
    changeToForm
  }

  return {
    clientsList,
    client,
    table,
    changeToTable,
    saveClient,
    newClient,
    selectedClient,
    removedClient,
    getAll,
  };
}
