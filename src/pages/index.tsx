import React, { useEffect, useState } from "react";
import ClientColection from "../../firebase/db/ClientColection";

import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";

const clients = [];

export default function Home() {
  const repo: ClientRepository = new ClientColection();

  const [client, setClient] = useState<Client>(Client.void());
  const [clientsList, setClientsList] = useState<Client[]>([]);
  const [changeView, setChangeView] = useState<"table" | "form">("table");

  useEffect(getAll, [])

  function getAll() {
    repo.getAll().then(clients => {
      setClientsList(clients)
      setChangeView('table')
    });
  }

  function selectedClient(client: Client) {
    setClient(client);
    setChangeView("form");
  }

  function removedClient(client: Client) {
    console.log(client.name);
  }

  async function saveClient(client: Client) {
    await repo.save(client);
    setChangeView("table");
    getAll()
  }

  function newClient() {
    setClient(Client.void());
    setChangeView("form");
  }

  return (
    <div
      className={`
      flex h-screen justify-center items-center
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}
    >
      <Layout title="Cadastro simples">
        {changeView === "table" ? (
          <>
            <div className="flex justify-end">
              <Button color="green" onClick={newClient}>
                Novo cliente
              </Button>
            </div>
            <Table
              clients={clients}
              selectedClient={selectedClient}
              removedClient={removedClient}
            />
          </>
        ) : (
          <Form
            client={client}
            cancel={() => setChangeView("table")}
            changeClient={saveClient}
          />
        )}
      </Layout>
    </div>
  );
}
