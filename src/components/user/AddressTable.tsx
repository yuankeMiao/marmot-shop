import { useEffect, useRef } from "react";
import { Table } from "flowbite-react";
import { AddressReadDto } from "../../misc/userTypes";

function AddressTable({ address }: { address: AddressReadDto }) {
  const mapRef = useRef<HTMLIFrameElement>(null);

  return (
    <div>
      <Table>
        <Table.Body className="divide-y dark:bg-gray-800">
          <Table.Row>
            <Table.Cell className="font-bold">Address</Table.Cell>
            <Table.Cell>{address.line1}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="font-bold">City</Table.Cell>
            <Table.Cell>{address.line2}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="font-bold">State</Table.Cell>
            <Table.Cell>{address.city}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="font-bold">Postal code</Table.Cell>
            <Table.Cell>{address.postalCode}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default AddressTable;
