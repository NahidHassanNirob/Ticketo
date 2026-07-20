"use client";
import OrganizationHeader from "@/components/organizerDasboard/OrganizationHeader";
import { getEvents } from "@/lib/api/event/data";
import { useSession } from "@/lib/auth-client";
import {
  Card,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  TableContent,
  Tooltip,
  Button
} from "@heroui/react";
import { Trash2,SquarePen } from "lucide-react";
import React, { useEffect, useState } from "react";

const OrganizationManageEvent = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getEvent = async () => {
      setLoading(true);
      const res = await getEvents(session?.user?.email);
      setEvents(res);
      setLoading(false);
    };
    getEvent();
  }, [session]);
  console.log(events);

  const handleDelete = (eventId) => {
    
    console.log("Delete event:", eventId);
  };
 
  const handleEdit = (eventId) => {
    
    console.log("Edit event:", eventId);
  };

  // const events=await getEvents();
  // console.log(events,"events are ");

  return (
    <div>
      <div>
        <OrganizationHeader
          title="Manage Events"
          description="Track live schedules, update configurations, and monitor real-time sales performance for all events."
        />
        <div>
          <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
            <div className="p-0 overflow-x-auto">
              {loading ? (
                <div className="py-20 justify-center flex items-center">
                  {" "}
                  <Spinner size="lg"></Spinner>
                </div>
              ) : (
                <Table aria-label="Manage Events Table" removeWrapper>
                  <TableContent>
                    <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                      <TableColumn
                        className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20"
                        isRowHeader
                      >
                        EVENT
                      </TableColumn>
                      <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                        CATEGORY
                      </TableColumn>
                      <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                        DATE
                      </TableColumn>
                      <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                        TICKET PRICE
                      </TableColumn>
                      <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                        AVAILABLE SEATS
                      </TableColumn>
                      <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                        STATUS
                      </TableColumn>
                       <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                        ACTION
                      </TableColumn>
                    </TableHeader>
                    <TableBody>
                      {events?.map((event) => (
                        <TableRow
                          key={event._id || event.id}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0"
                        >
                          
                          <TableCell className="py-4 px-6 align-middle font-bold text-white">
                            <span className="line-clamp-1 truncate max-w-[150px]">
                              {event?.title || "Untitled"}
                            </span>
                          </TableCell>

                         
                          <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                            {event?.category || "N/A"}
                          </TableCell>

                       
                          <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                            {event?.date
                              ? new Date(event.date).toLocaleDateString()
                              : "N/A"}
                          </TableCell>

                          
                          <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">
                            ${event?.price ?? 0}
                          </TableCell>

                          
                          <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                            {event?.availableSeats ?? event?.seats ?? 0}
                          </TableCell>

                         
                          <TableCell className="py-4 px-6 align-middle">
                            <Chip
                              size="sm"
                              className="font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1"
                            >
                              {event?.status || "Pending"}
                            </Chip>
                          </TableCell>
                          <TableCell className="py-4 px-6 align-middle text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Tooltip content="Edit Event">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20"
                              onClick={() => handleEdit(event._id)}
                            >
                              <SquarePen className="w-4 h-4"/> 
                            </Button>
                          </Tooltip>
 
                          <Tooltip content="Delete Event" color="danger">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                              onClick={() => handleDelete(event._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                        </TableRow>
                      ))}
                       
                    </TableBody>
                  </TableContent>
                </Table>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizationManageEvent;
