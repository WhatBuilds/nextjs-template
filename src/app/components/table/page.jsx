import TableComponent from "@/src/components/common/TableComponent";
import React from "react";
import { data, columns } from "@/src/constants/constant";

const page = () => {
  return (
    <div className="grid grid-cols-2 p-10 gap-5">
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default page;
