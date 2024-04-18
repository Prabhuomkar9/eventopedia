import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    firstName: "Hack-Expo",
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    firstName: "Jane",
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    firstName: "Joe",
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    firstName: "Kevin",
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    firstName: "Joshua",
    address: "32188 Larkin Turnpike",
    city: "Charleston",
    state: "South Carolina",
  },
];

const EventCard = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName", //access nested data with dot notation
        header: "Event Name",
        size: 150,
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Organised By",
        size: 200,
      },
      {
        accessorKey: "city",
        header: "Completed On",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <div className="relative px-10 py-10" style={{ paddingBottom: "150px" }}>
      <h1 className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 py-6 text-center text-4xl font-bold text-gray-100 shadow-lg lg:text-5xl">
        Completed Events
      </h1>
      <hr className="absolute left-0 mt-2 w-full border-t border-gray-600" />
      <div className="mt-8 max-w-full overflow-x-auto">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default EventCard;
