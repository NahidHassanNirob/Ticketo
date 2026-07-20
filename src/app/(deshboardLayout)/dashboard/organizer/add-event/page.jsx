"use client";
import OrganizationHeader from "@/components/organizerDasboard/OrganizationHeader";
import { Button, Card, CardHeader, Input } from "@heroui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import Image from "next/image";
import { uplodeImage } from "../../../../../../utils/imageUplode";
import { addEvent } from "@/lib/api/event/action";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

const AddEventPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {data:session}=useSession();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const imageFile = data.eventBanner[0];

      const imageUrl = await uplodeImage(imageFile);
      console.log("Selected Image File:", imageUrl);
      console.log("Other Form Data:", data);

      const eventData = {
        title: data.title,
        banner: imageUrl,
        category: data.category,
        location: data.location,
        date: data.date,
        ticketPrice: data.price,
        availableSeats: data.capacity,
        description: data.description,
        organizationEmail:session?.user?.email,
        status: "pending",
      };
      const sendData = await addEvent(eventData);
      if (sendData.insertedId) {
        toast.success("Event successfully added");
        reset();
        setImagePreview(null);
        setFileName("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
    <div>
      <div>
        <OrganizationHeader
          title={"Add Event"}
          description={"add your events"}
        />
      </div>

      <div className="mt-6 max-w-3xl mx-auto">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">Host a New Event</h3>
            <p className="text-slate-400 text-xs">
              Fill out the detailed event information. Banners and dates are
              required.
            </p>
          </CardHeader>

          <div className="p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="event-category"
                    className="text-sm text-white/70"
                  >
                    Title
                  </label>
                  <Input
                    {...register("title", { required: "Title is required" })}
                    label="Event Title"
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

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white/70">Event Banner</label>
                  <div className="relative border border-dashed border-white/10 hover:border-pink-500/50 rounded-xl bg-slate-900/50 h-11 flex items-center px-3 justify-between overflow-hidden cursor-pointer">
                    <span className="text-sm text-slate-400 truncate max-w-[200px]">
                      {fileName || "Choose Banner Image"}
                    </span>
                    {imagePreview ? (
                      <Image
                        height={20}
                        width={20}
                        src={imagePreview}
                        alt="Preview"
                        className="h-8 w-12 object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs bg-white/10 text-white px-2 py-1 rounded">
                        Browse
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      {...register("eventBanner", {
                        required: "Banner image is required",
                        onChange: (e) => handleImageChange(e),
                      })}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                  {errors.eventBanner && (
                    <span className="text-xs text-red-500 pl-1">
                      {errors.eventBanner.message}
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
                    <option value="" className="bg-slate-950 text-slate-400">
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
                    <option value="" className="bg-slate-950 text-slate-400">
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
                  <label htmlFor="event-date" className="text-sm text-white/70">
                    Date
                  </label>
                  <Input
                    {...register("date", { required: "Date is required" })}
                    id="event-date"
                    type="date"
                    label="Date"
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
                    Price
                  </label>
                  <Input
                    {...register("price", { required: "Price is required" })}
                    id="event-price"
                    type="number"
                    min={0}
                    step="any"
                    label="Ticket Price ($)"
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
                    label="Available Capacity"
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
                <label htmlFor="event-desc" className="text-sm text-white/70">
                  Detailed Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  id="event-desc"
                  placeholder="Outline the detailed schedule, speaker list, and amenities..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-pink-500 min-h-[120px] text-white text-sm"
                />
                {errors.description && (
                  <span className="text-xs text-red-500 pl-1">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
                radius="lg"
              >
                {isSubmitting ? "Hosting..." : "Host Event Now"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddEventPage;
