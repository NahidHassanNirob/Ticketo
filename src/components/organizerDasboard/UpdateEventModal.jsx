"use client";

import { useEffect } from "react";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Modal, Surface } from "@heroui/react";
import { useForm } from "react-hook-form";
import { updateEvent } from "@/lib/api/event/action";
import { useRouter } from "next/navigation";

export function UpdateEventModal({ event, openModal, setOpenModal }) {
  const router = useRouter();
  const handleClose = () => {
    setOpenModal(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (event && openModal) {
      const formattedDate = event.date
        ? new Date(event.date).toISOString().split("T")[0]
        : "";

      reset({
        title: event.title || "",
        category: event.category || "",
        location: event.location || "",
        date: formattedDate,
        price: event.price ?? event.ticketPrice ?? 0,
        capacity: event.capacity ?? event.availableSeats ?? 0,
        description: event.description || "",
      });
    }
  }, [event, openModal, reset]);

  const onSubmit = async (data) => {
    try {
      const update = await updateEvent(data, event._id);
      if (update) {
        handleClose();
        router.refresh();
      }
    } catch (error){
      console.error("something went wrong", error);

    }
  };

  const CATEGORIES = [
    "Music",
    "Tech",
    "Sports",
    "Arts",
    "Business",
    "Food",
    "Other",
  ];

  const LOCATIONS = [
    "New York",
    "San Francisco",
    "London",
    "Dhaka",
    "Tokyo",
    "Berlin",
    "Online",
  ];

  return (
    <Modal isOpen={openModal} onOpenChange={setOpenModal}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger onClick={handleClose} />

            <Modal.Header>
              <div className="flex items-center gap-2">
                <Envelope className="size-5 text-primary" />
                <Modal.Heading className="text-xl font-bold">
                  Edit Event
                </Modal.Heading>
              </div>
              {event?._id && (
                <p className="text-xs text-muted mt-1">
                  Event ID: {event?._id}
                </p>
              )}
            </Modal.Header>

            <Modal.Body>
              <Surface variant="default">
                <form
                  id="update-event-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  {/* Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="title" className="text-sm text-white/70">
                        Title
                      </label>
                      <Input
                        {...register("title", {
                          required: "Title is required",
                        })}
                        id="title"
                        labelPlacement="outside"
                        placeholder="e.g. Rock Fest 2026"
                        className="w-full bg-slate-900/50 py-3 mt-1 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                      />
                      {errors.title && (
                        <span className="text-xs text-red-500 pl-1">
                          {errors.title.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="event-category"
                        className="text-sm text-white/70"
                      >
                        Category
                      </label>
                      <select
                        {...register("category", {
                          required: "Category is required",
                        })}
                        id="event-category"
                        className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm outline-none focus:border-pink-500"
                      >
                        <option
                          value=""
                          className="bg-slate-950 text-slate-400"
                        >
                          Select Category
                        </option>
                        {CATEGORIES.map((cat) => (
                          <option
                            key={cat}
                            value={cat}
                            className="bg-slate-950 text-white"
                          >
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <span className="text-xs text-red-500 pl-1">
                          {errors.category.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label
                        htmlFor="event-location"
                        className="text-sm text-white/70"
                      >
                        Location
                      </label>
                      <select
                        {...register("location", {
                          required: "Location is required",
                        })}
                        id="event-location"
                        className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm outline-none focus:border-pink-500"
                      >
                        <option
                          value=""
                          className="bg-slate-950 text-slate-400"
                        >
                          Select Location
                        </option>
                        {LOCATIONS.map((loc) => (
                          <option
                            key={loc}
                            value={loc}
                            className="bg-slate-950 text-white"
                          >
                            {loc}
                          </option>
                        ))}
                      </select>
                      {errors.location && (
                        <span className="text-xs text-red-500 pl-1">
                          {errors.location.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date, Price & Capacity */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="event-date"
                        className="text-sm text-white/70"
                      >
                        Date
                      </label>
                      <Input
                        {...register("date", { required: "Date is required" })}
                        id="event-date"
                        type="date"
                        labelPlacement="outside"
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                      />
                      {errors.date && (
                        <span className="text-xs text-red-500 pl-1">
                          {errors.date.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="event-price"
                        className="text-sm text-white/70"
                      >
                        Price ($)
                      </label>
                      <Input
                        {...register("price", {
                          required: "Price is required",
                        })}
                        id="event-price"
                        type="number"
                        min={0}
                        step="any"
                        labelPlacement="outside"
                        placeholder="0.00"
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                      />
                      {errors.price && (
                        <span className="text-xs text-red-500 pl-1">
                          {errors.price.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="event-seats"
                        className="text-sm text-white/70"
                      >
                        Capacity
                      </label>
                      <Input
                        {...register("capacity", {
                          required: "Capacity is required",
                        })}
                        id="event-seats"
                        type="number"
                        min={1}
                        labelPlacement="outside"
                        placeholder="100"
                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                      />
                      {errors.capacity && (
                        <span className="text-xs text-red-500 pl-1">
                          {errors.capacity.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2 w-full">
                    <label
                      htmlFor="event-desc"
                      className="text-sm text-white/70"
                    >
                      Detailed Description
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      id="event-desc"
                      placeholder="Outline the detailed schedule..."
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-pink-500 min-h-[120px] text-white text-sm"
                    />
                    {errors.description && (
                      <span className="text-xs text-red-500 pl-1">
                        {errors.description.message}
                      </span>
                    )}
                  </div>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-2">
              <Button onClick={handleClose} variant="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                form="update-event-form"
                isLoading={isSubmitting}
                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold"
              >
                Update Event
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
