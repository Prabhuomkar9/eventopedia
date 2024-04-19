import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { api } from "~/utils/api";

const EventCard = () => {
  const { data: rawData } = api.event.getCompletedEvents.useQuery();
  const data = rawData ?? [
    {
      name: "Event Name",
      // startDateTime: new Date(),
      // endDateTime: new Date(),
      // club: {
      //   name: "Club",
      // },
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Event Name",
        size: 150,
      },
      // {
      //   accessorKey: "startDateTime",
      //   header: "Start Date",
      //   size: 150,
      // },
      // {
      //   accessorKey: "endDateTime",
      //   header: "End Date",
      //   size: 150,
      // },
      // {
      //   accessorKey: "club.name",
      //   header: "Club",
      //   size: 150,
      // },
    ],
    [],
  );

  const table = useMaterialReactTable({ columns, data });

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-10 px-10 py-10"
      style={{ paddingBottom: "150px" }}
    >
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
