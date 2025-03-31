"use client";

import { createListingAction } from '@/action/createListingAction';
import ApartmentInfo from '@/components/createListingComponent/ApartmentInfo';
import Category from '@/components/createListingComponent/Category';
import GeneralInformation from '@/components/createListingComponent/GeneralInformation';
import HouseInfo from '@/components/createListingComponent/HouseInfo';
import ImageUpload from '@/components/createListingComponent/ImageUpload';
import LandInfo from '@/components/createListingComponent/LandInfo';
import RoomInfo from '@/components/createListingComponent/RoomInfo';
import Loading from '@/components/Loading';
import { CreateListingSchema } from '@/zod/schema';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import amenityIcons from '@/components/amenityIcons'; // Import the amenityIcons mapping


type Amenity = "Lawn" | "Drainage" | "Jacuzzi" | "Garage" | "Parking" | "Air Condition" | "Balcony" | "Deck" | "Fencing" | "Water Supply" | "Garden" | "CCTV" | "Gym" | "Microwave" | "Modular Kitchen" | "Security Staff";

const CreateListingForm = () => {
    // State management
    const [formData, setFormData] = useState<CreateListingSchema>({
        title: '',
        description: '',
        price: 1,
        type: 'rent',
        category: 'house',
        location: '',
        bedrooms: null,
        bathrooms: null,
        images: [],
        landArea: null,
        numberOfFloors: null,
        houseArea: null,
        area: null,
        amenities: [], // Initialize as an empty array
        verified: false,
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'message' | 'error'>('idle');
    const { data: session } = useSession();
    const router = useRouter();
   

    

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'price' || name === 'landArea' || name === 'numberOfFloors' || name === 'houseArea' || name === 'area' ? Number(value) : value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                images: Array.from(e.target.files),
            });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('idle');
        setLoading(true);

        const response: any = await createListingAction(formData);
        console.log("Response", response);
        setLoading(false);
        if (response.error) {
            setError(response.error);
            setFormStatus('error');
            return;
        }

        setMessage(response.message);
        setFormStatus('message');
        router.push("/");
    };

    useEffect(() => {
        if (formData.category === "house") {
            setFormData(prev => ({
                ...prev,
                area: null
            }));
        } else if (formData.category === "land") {
            setFormData(prev => ({
                ...prev,
                bedrooms: null,
                bathrooms: null,
                houseArea: null,
                numberOfFloors: null,
                area: null,
            }));
        } else if (formData.category === "apartment" || formData.category === "business" || formData.category === "flat") {
            setFormData(prev => ({
                ...prev,
                landArea: null,
                houseArea: null,
                numberOfFloors: null
            }));
        } else if (formData.category === "room") {
            setFormData(prev => ({
                ...prev,
                numberOfFloors: null,
                area: null,
                houseArea: null,
                landArea: null
            }));
        } else if (formData.category === "hostel_boys" || formData.category === "hostel_girls") {
            setFormData(prev => ({
                ...prev,
                landArea: null,
                numberOfFloors: null,
                area: null,
                houseArea: null,
                bathrooms: null,
                bedrooms: null
            }));
        }
    }, [formData.category]);

    const handleAmenitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        // Assert that `name` is of type `Amenity`
        const amenityKey = name as Amenity;

        setFormData(prev => ({
            ...prev,
            amenities: checked
                ? [...prev.amenities, amenityKey] // Add the amenity
                : prev.amenities.filter(amenity => amenity !== amenityKey) // Remove the amenity
        }));
    };

    return (
        <>
            <div className='p-6 bg-white'>
                <h3 className="text-4xl text-center text-gray-800 my-4">
                    POST YOUR PROPERTY
                </h3>
                <form onSubmit={handleSubmit} className=" mx-auto mt-2 p-6 shadow-md rounded-lg space-y-6 bg-[#f6f1ed]">
                    <Category formData={formData} handleChange={handleChange} />
                    <GeneralInformation formData={formData} handleChange={handleChange} setFormData={setFormData} />
                    {formData.category === 'house' && <HouseInfo formData={formData} handleChange={handleChange} />}
                    {(formData.category === 'apartment' || formData.category === 'flat' || formData.category === 'business') && <ApartmentInfo formData={formData} handleChange={handleChange} />}
                    {formData.category === 'land' && <LandInfo formData={formData} handleChange={handleChange} />}
                    {formData.category === 'room' && <RoomInfo formData={formData} handleChange={handleChange} />}
                    <ImageUpload formData={formData} handleFileChange={handleFileChange} />

                    {/* Admin Verified Check */}
                    {session?.user?.role === 'ADMIN' && (
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="verified"
                                name="verified"
                                checked={formData.verified}
                                onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                                className="h-5 w-5"
                            />
                            <label htmlFor="verified">Mark as Verified</label>
                        </div>
                    )}

                    {/* Amenities Section with Icons */}
                    <div className="space-y-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                        <h3 className="text-lg font-semibold col-span-full">AMENITIES</h3>
                        {[
                            "Parking", "Furnished", "Drainage", "Safety Tank", "Lawn", "Jacuzzi", "Garage", "Air Condition", "Balcony", "Deck", "Fencing", "Water Supply", "Garden", "CCTV", "Gym", "Microwave", "Modular Kitchen", "Swimming Pool", "TV Cable", "Washing Machine", "Wifi", "Solar Water", "Water Well", "Water Tank", "Cafeteria", "Electricity Backup", "Intercom", "Internet", "Kids Playground", "Lift", "Maintenance", "Security Staff"
                        ].map((amenity) => {
                            // Assert that `amenity` is of type `Amenity`
                            const amenityKey = amenity as Amenity;
                            return (
                                <div key={amenityKey} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name={amenityKey}
                                        checked={formData.amenities.includes(amenityKey)}
                                        onChange={handleAmenitiesChange}
                                        className="h-5 w-5"
                                    />
                                    <label htmlFor={amenityKey} className="flex items-center space-x-2">
                                        <span className="amenity-icon text-xl text-gray-600">{amenityIcons[amenityKey]}</span>
                                        <span>{amenityKey}</span>
                                    </label>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? "bg-indigo-300" : "bg-indigo-700 hover:bg-lime-800 text-white"
                            }`}
                    >
                        {loading ? (
                            <Loading />
                        ) : (
                            "Create Listing"
                        )}
                    </button>

                    <div>
                        {formStatus === 'message' && (
                            <div className="bg-green-500 text-white p-4 rounded-md text-center">
                                {message}
                            </div>
                        )}
                        {formStatus === 'error' && (
                            <div className="bg-red-500 text-white p-4 rounded-md text-center">
                                {error}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateListingForm;