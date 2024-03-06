import { Table } from "flowbite-react";

function TableItemLoader() {
  return (
    <Table.Row >
      <Table.Cell className="hidden md:table-cell">
        <div className="w-12 h-12 bg-gray-300 rounded-md animate-pulse"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="placeholder"></div>
      </Table.Cell>
      <Table.Cell className="hidden lg:table-cell">
        <div className="placeholder"></div>
      </Table.Cell>
      <Table.Cell className="hidden lg:table-cell">
        <div className="placeholder"></div>
      </Table.Cell>
      <Table.Cell className="hidden md:table-cell">
        <div className="placeholder"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="placeholder"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="placeholder"></div>
      </Table.Cell>
      <Table.Cell>
        <div className="placeholder"></div>
      </Table.Cell>
    </Table.Row>
  );
}

export default TableItemLoader;
