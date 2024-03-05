import { useEffect, useRef } from "react";
import { Table } from "flowbite-react";
import { AddressType } from "../../misc/userTypes";

function AddressTable({ address }: { address: AddressType }) {
  const mapRef = useRef<HTMLIFrameElement>(null);

  /*
    https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
    IntersectionObserver(callback, options)
    callback = (entries, observer) => {}
    options = {
        root: document.querySelector('.scrollArea'),
        rootMargin: '0px',
        threshold: 1.0
    }
    */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && mapRef.current) {
            mapRef.current.src = `https://www.google.com/maps/place?&q=${address.coordinates.lat},${address.coordinates.lng}&output=embed`;
        }
      },
      { threshold: 0.2 }
    );

    if(mapRef.current) observer.observe(mapRef.current);

    return () => observer.disconnect();
  }, [address.coordinates.lat, address.coordinates.lng]);

  
  return (
    <div>
      <Table>
        <Table.Body className="divide-y dark:bg-gray-800">
          <Table.Row>
            <Table.Cell className="font-bold">Address</Table.Cell>
            <Table.Cell>{address.address}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="font-bold">City</Table.Cell>
            <Table.Cell>{address.city}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="font-bold">State</Table.Cell>
            <Table.Cell>{address.state}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className="font-bold">Postal code</Table.Cell>
            <Table.Cell>{address.postalCode}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <iframe
        ref={mapRef}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen={false}
        width="100%"
        height="300px"
        className="rounded-xl my-8"
        title="Google map"
      />
    </div>
  );
}

export default AddressTable;
