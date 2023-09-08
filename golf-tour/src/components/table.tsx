'use client';

import { useState,useEffect, useRef } from "react";
import { IoTriangleOutline } from "react-icons/io5";

interface TableProps {
  header: { value: number; label: string }[];
  data: { nama: string; angkatan: string; skor: number[] }[];
}

function Table({ header, data}: TableProps) {
  const [sortedData,SetSortedData] = useState(data.slice(0,3))

  let slicing = useRef(0)
useEffect(() => {
  const intervalId = setInterval(() => {
  const startIndex = (slicing.current) % data.length;
    const endIndex = (startIndex + 4) % data.length; // startIndex + {max row shown-1} change based on preferences

    if (startIndex <= endIndex) {
      SetSortedData(data.slice(startIndex, endIndex + 1));
    } else {
      SetSortedData(data.slice(startIndex).concat(data.slice(0, endIndex + 1)));
    }

    slicing.current = (slicing.current + 1) % data.length;
  }, 2000)
  
  return () => clearInterval(intervalId); //This is important
 
},[data])


  
  
  return (
    <>
      <table className="min-w-full overflow-visible border-separate border-spacing-y-1">
        <thead>
          <tr className="h-fit">
            <th
              className="border-[1px] border-r-0  border-grey-primary headerTable p-2 bg-white text-black text-center align-middle"
              rowSpan={2}
            >
              #
            </th>
            <th className="border-[1px] border-l-grey-secondary border-r-0 border-grey-primary headerTable p-2 bg-white text-black text-center align-middle">
              HOLE
            </th>
            {header.map((obj, idx: number) => {
              return (
                <th
                  key={idx}
                  className="h-auto w-auto align-middle text-center headerTable p-2 border-[1px] border-r-0 bg-white text-black border-grey-primary border-l-grey-secondary"
                >
                  {obj.label}
                </th>
              );
            })}
            <th
              className="border-[1px] border-r-0  border-grey-primary headerTable p-2 bg-white text-black text-center align-middle"
              rowSpan={2}
            >
              TOTAL
            </th>
          </tr>
          <tr className="h-fit">
            <th className="border-[1px] border-l-grey-secondary border-r-0 border-grey-primary headerTable p-2 bg-white text-black text-center align-middle">
              PAR
            </th>
            {header.map((obj, idx: number) => {
              return (
                <th
                  key={idx}
                  className="h-auto w-auto align-middle text-center headerTable p-2 border-[1px] border-r-0 bg-white text-black  border-grey-primary border-l-grey-secondary"
                >
                  {obj.value}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="overflow-visible">
          {sortedData.length > 0 ? (
            sortedData.map((obj: any, idx: number) => {
              let total = 0;
              return (
                <tr key={idx+slicing.current} className={`${idx == 0 ? "fade-row" : ""} h-fit`}>
                  <td
                    className={`${
                      obj.rank == 1
                        ? "bg-gradient-to-r from-gold-primary to-gold-secondary"
                        : obj.rank == 2
                        ? "bg-gradient-to-r from-silver-primary to-silver-secondary"
                        : obj.rank == 3
                        ? "bg-gradient-to-r from-copper-primary to-copper-secondary"
                        : "bg-white border-[1px] border-r-0 border-grey-primary border-l-grey-secondary"
                    } h-auto w-auto align-middle text-center headerTable p-2 text-black`}
                  >
                    {obj.rank}
                  </td>
                  <td
                    className={`${
                      obj.rank == 1
                        ? "bg-gradient-to-r from-gold-primary to-gold-secondary"
                        : obj.rank == 2
                        ? "bg-gradient-to-r from-silver-primary to-silver-secondary"
                        : obj.rank == 3
                        ? "bg-gradient-to-r from-copper-primary to-copper-secondary"
                        : "bg-white border-[1px] border-r-0 border-grey-primary border-l-grey-secondary"
                    } h-auto w-auto align-middle bodyText p-2 text-black truncate`}
                  >
                    {obj.nama} [{obj.angkatan}]
                  </td>
                  {obj.skor.map((skor: any, idx: number) => {
                    total += skor;
                    return (
                      <td
                        key={idx}
                        className="h-auto w-auto align-middle text-center bodyText p-2 border-[1px] border-r-0 bg-white text-black  border-grey-primary border-l-grey-secondary"
                      >
                        <div
                          className={`${
                            skor == header[idx].value + 1
                              ? "border-[1px] border-red-primary"
                              : skor == header[idx].value + 2
                              ? "border-[1px] border-red-primary before:border-[1px] before:border-red-primary before:h-full before:w-full before:scale-[85%] before:absolute"
                              : skor == header[idx].value - 1 && skor != 0
                              ? "border-[1px] rounded-full border-green-primary"
                              : skor == header[idx].value - 2 && skor != 0
                              ? "border-[1px] rounded-full border-green-primary before:border-[1px] before:border-green-primary before:h-full before:w-full before:scale-90 before:absolute before:rounded-full"
                              : skor <= header[idx].value - 3 && skor != 0
                              ? "border-[1px] rounded-full border-green-primary before:border-[1px] before:border-green-primary before:h-full before:w-full before:scale-90 before:absolute before:rounded-full after:border-[1px] after:border-green-primary after:h-full after:w-full after:scale-75 after:absolute after:rounded-full"
                              : ""
                          } w-[25px] h-[25px] mx-auto flex items-center justify-center shrink-0 relative`}
                        >
                          <div
                            className={`${
                              skor > header[idx].value + 2 ? "" : "hidden"
                            } absolute text-red-600 text-3xl bottom-[1px]`}
                          >
                            <IoTriangleOutline className={"stroke-custom"} />
                          </div>
                          {skor > 0 ? skor : "-"}
                        </div>
                      </td>
                    );
                  })}
                  <td
                    key={idx}
                    className="h-auto w-auto align-middle text-center headerTable p-2 border-[1px] border-r-0 bg-white text-black  border-grey-primary border-l-grey-secondary"
                  >
                    {total}
                  </td>
                </tr>
              );
            })
          ) : (
            <td colSpan={header.length}>
              <p className="text-center text-[20px] py-5">
                Data tidak ditemukan
              </p>
            </td>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Table;
