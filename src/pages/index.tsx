import React, { useState } from "react";

import Button from "../components/Button.tsx";
import Form from "../components/Form.tsx";
import Layout from "../components/Layout.tsx";
import Table from "../components/Table.tsx";
import Client from "../core/Client.ts";

const clients = [
  new Client("1", "Ana", 34),
  new Client("2", "Bia", 30),
  new Client("3", "Julia", 27),
  new Client("4", "Anderson", 11),
  new Client("5", "Fabio", 50),
];

export default function Home() {

  const [client, setClient] = useState<Client>(Client.void());
  const [changeView, setChangeView] = useState<"table" | "form">("table");

  function selectedClient(client: Client) {
    setClient(client);
    setChangeView("form");
  }

  function removedClient(client: Client) {
    console.log(client.name);
  }

  function saveClient(client: Client) {
    console.log(client);
    setChangeView('table')
  }

  function newClient() {
    setClient(Client.void());
    setChangeView('form')
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
              <Button 
              color="yellow" 
              onClick={newClient}>
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
