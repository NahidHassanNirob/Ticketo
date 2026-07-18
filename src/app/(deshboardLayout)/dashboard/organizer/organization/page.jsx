"use client";
import OrganizationHeader from "@/components/organizerDasboard/OrganizationHeader";
import { Card, CardHeader, Form, TextArea, Input, Button } from "@heroui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { uplodeImage } from "../../../../../../utils/imageUplode";
import { useSession } from "@/lib/auth-client";
import { addOrganization } from "@/lib/api/organization/action";
import toast from "react-hot-toast";
import { getOrganizationData } from "@/lib/api/organization/data";


const OrganizationPage = () => {
  const [myOrg, setMyOrg] = useState(null);
  
   const { data: session } = useSession();
    const [imagePreview, setImagePreview] = useState(null);
    const [fileName, setFileName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const {
      handleSubmit,
      register,
      formState: { errors },
      reset,
    } = useForm();
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImagePreview(URL.createObjectURL(file));
        setFileName(file.name);
      }
    };
  
    const onSubmit = async (data) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Creating organization...");
  
      try {
        const imageFile = data.organizationLogo[0];
  
        const imageUrl = await uplodeImage(imageFile);
  
        if (!imageUrl) {
          throw new Error("Image upload failed");
        }
  
        const newData = {
          organizationName: data.organizationName,
          description: data.Description,
          logo: imageUrl,
          website: data.organizationWebsite,
          organizationEmail: session?.user?.email,
        };
  
        const sendData = await addOrganization(newData);
  
        if (sendData?.success || sendData?.id || sendData) {
          toast.success("Organization added successfully!", { id: toastId });
  
          reset();
          setImagePreview(null);
          setFileName("");
        } else {
          throw new Error(sendData?.message || "Failed to add organization");
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error(error.message || "Something went wrong!", { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const logoRegister = register("organizationLogo", {
      required: "Logo is required",
      onChange: (e) => handleImageChange(e),
    });
  

  useEffect(() => {
    const myOrg = async () => {
      const org=await getOrganizationData( session?.user?.email)
      setMyOrg(org)
      console.log(myOrg,"org");

    };
    myOrg();
  }, [session]);

  return (
    <div>
      <div>
        <OrganizationHeader
          title="Organization Profile"
          description="Manage your organization's identity, public branding, and verified credentials."
        />
      </div>

       <div className="mt-6 mx-auto space-y-6 max-w-3xl">
              <Card
                className="border border-white/5 bg-slate-900/40 backdrop-blur-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden"
                radius="lg"
              >
                <CardHeader className="flex flex-col gap-1 pb-5 border-b border-white/5 p-8 relative overflow-hidden bg-gradient-to-b from-white/[0.02] to-transparent">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                  <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
                    Organization Details
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Review and update your organization credentials.
                  </p>
                </CardHeader>
      
                <div className="p-8">
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 w-full"
                  >
                    <Input
                      defaultValue={myOrg?.organizationName}
                      {...register("organizationName", {
                        required: "Name is required",
                      })}
                      id="organizationName"
                      label="Organization Name"
                      labelPlacement="outside"
                      placeholder="TechEvents Corp"
                      required
                      className="w-full bg-slate-950/40 border-white/10 hover:border-indigo-500/30 focus-within:!border-indigo-500 transition-colors"
                    />
      
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-sm font-medium text-slate-300">
                        Organization Logo
                      </span>
      
                      <label
                        htmlFor="organizationLogo"
                        className="group w-full border border-dashed border-white/10 hover:border-indigo-500/50 bg-slate-950/40 rounded-xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden min-h-[160px]"
                      >
                        <input
                          type="file"
                          id="organizationLogo"
                          accept="image/*"
                          className="hidden"
                          name={logoRegister.name}
                          ref={logoRegister.ref}
                          onBlur={logoRegister.onBlur}
                          onChange={logoRegister.onChange}
                        />
      
                        {!imagePreview ? (
                          <div className="flex flex-col items-center justify-center gap-2">
                            <svg
                              className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="text-xs font-semibold text-slate-300">
                              Click to upload
                            </p>
                            {errors.organizationLogo && (
                              <p className="text-red-400 text-xs mt-1 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                                {errors.organizationLogo.message}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="absolute inset-0 w-full h-full bg-slate-950 flex items-center justify-center p-2 transition-all duration-300">
                            <div className="relative w-full h-full rounded-lg border border-white/10 overflow-hidden flex flex-col items-center justify-center bg-slate-900/50">
                              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-indigo-500 rounded-tl-sm"></div>
                              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-indigo-500 rounded-tr-sm"></div>
                              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-indigo-500 rounded-bl-sm"></div>
                              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-indigo-500 rounded-br-sm"></div>
      
                              <div className="relative w-full h-full rounded-md overflow-hidden bg-slate-950/60 flex items-center justify-center shadow-lg">
                                <Image
                                  fill
                                  unoptimized
                                  src={imagePreview}
                                  alt="Preview"
                                  className="object-contain p-4"
                                />
                              </div>
      
                              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/5 flex items-center justify-between gap-2 max-w-[90%] mx-auto shadow-md z-10">
                                <span className="text-[11px] text-slate-200 font-medium truncate">
                                  {fileName}
                                </span>
                                <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider shrink-0 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                                  Selected
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
      
                    <Input
                    defaultValue={myOrg?.website}
                      {...register("organizationWebsite", {
                        required: "Website is required",
                      })}
                      type="text"
                      id="organizationWebsite"
                      label="Organization Website"
                      labelPlacement="outside"
                      placeholder="https://techevents.corp"
                      required
                      className="w-full bg-slate-950/40 border-white/10 hover:border-indigo-500/30 focus-within:!border-indigo-500 transition-colors"
                    />
      
                    <TextArea
                    defaultValue={myOrg?.description}
                      {...register("Description", {
                        required: "Description is required",
                      })}
                      id="Description"
                      label="Description"
                      labelPlacement="outside"
                      placeholder="Hosting global developer conferences and software hacking marathons."
                      required
                      className="w-full bg-slate-950/40 border-white/10 hover:border-indigo-500/30 focus-within:!border-indigo-500 transition-colors min-h-[120px] text-white text-sm"
                    />
      
                    <div className="flex gap-4 pt-2">
                      <Button
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold h-11 px-8 shadow-[0_4px_20px_rgba(79,70,229,0.3)] transition-all duration-300 rounded-xl"
                      >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </Form>
                </div>
              </Card>
            </div>
    </div>
  );
};

export default OrganizationPage;
