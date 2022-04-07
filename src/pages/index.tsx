import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useClients from "../hooks/useClients";


export default function Home() {
  const {
    newClient,
    selectedClient,
    removedClient,
    saveClient,
    client,
    clientsList,
    table,
    changeToTable,
  } = useClients();

  return (
    <div
      className={`
      flex h-screen justify-center items-center
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}
    >
      <Layout title="Cadastro simples">
        {table ? (
          <>
            <div className="flex justify-end">
              <Button color="green" onClick={newClient}>
                Novo cliente
              </Button>
            </div>
            <Table
              clients={clientsList}
              selectedClient={selectedClient}
              removedClient={removedClient}
            />
          </>
        ) : (
          <Form
            client={client}
            cancel={changeToTable}
            changeClient={saveClient}
          />
        )}
      </Layout>
    </div>
  );
}
