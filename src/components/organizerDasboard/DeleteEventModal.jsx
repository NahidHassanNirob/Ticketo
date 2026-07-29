"use client";

import { eventDelete } from "@/lib/api/event/action";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";

export function DeleteEventModal({deleteEvent,openDeleteModal,setOpenDeleteModal}) {
  const router = useRouter()
  const handelModelClose=()=>{
    setOpenDeleteModal(false);
  }
  const handelDelete=async()=>{
    const remove=await eventDelete(deleteEvent);
    if (remove?.deletedCount > 0) {
    handelModelClose();
    router.push('/dashboard/organizer/manage-events');
    
  }
    


  }
  return (
    <AlertDialog isOpen={openDeleteModal}>
     
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger onClick={()=>handelModelClose()} />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete event permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>Event</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button onClick={()=>handelModelClose()} slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={()=>handelDelete()} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}