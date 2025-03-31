"use client";

import Header from "@/components/Header";
import { useState } from "react";

// Define the conversions for all units
const conversions = {
  ropani: 5476,
  aana: 342.25,
  paisa: 85.56,
  daam: 21.39,
  bigha: 72900,
  kattha: 3645,
  dhur: 182.25,
  sqFeet: 1,
  sqMeter: 10.7639
} as const;

// Type for the values state
type UnitKey = keyof typeof conversions;

export default function LandConverter() {
  // Initialize state with empty strings for all fields
  const [values, setValues] = useState<{ [key in UnitKey]: string }>({
    ropani: "",
    aana: "",
    paisa: "",
    daam: "",
    bigha: "",
    kattha: "",
    dhur: "",
    sqFeet: "",
    sqMeter: ""
  });

  const handleChange = (field: string, value: string) => {
    // If the value is empty, reset all fields
    if (value === "") {
      setValues({
        ropani: "",
        aana: "",
        paisa: "",
        daam: "",
        bigha: "",
        kattha: "",
        dhur: "",
        sqFeet: "",
        sqMeter: ""
      });
      return;
    }

    // Ensure valid numeric input
    const numericValue = value ? parseFloat(value) : 0;
    if (isNaN(numericValue)) return;

    // Convert the numeric value based on the current field
    let baseSqFeet =
      field === "sqMeter"
        ? numericValue * conversions.sqMeter
        : numericValue * conversions[field as UnitKey];

    // Update the state with the correct formatted values
    setValues((prevValues) => {
      const updatedValues: { [key in UnitKey]: string } = {
        ropani: (baseSqFeet / conversions.ropani).toFixed(5),
        aana: (baseSqFeet / conversions.aana).toFixed(5),
        paisa: (baseSqFeet / conversions.paisa).toFixed(5),
        daam: (baseSqFeet / conversions.daam).toFixed(5),
        bigha: (baseSqFeet / conversions.bigha).toFixed(5),
        kattha: (baseSqFeet / conversions.kattha).toFixed(5),
        dhur: (baseSqFeet / conversions.dhur).toFixed(5),
        sqFeet: (baseSqFeet / conversions.sqFeet).toFixed(5),
        sqMeter: (baseSqFeet / conversions.sqMeter).toFixed(5)
      };

      // Only set the value of the current field to the user's input while others are updated
      updatedValues[field as UnitKey] = value;

      return updatedValues;
    });
  };

  // Render input fields dynamically for each unit
  function renderInput(name: UnitKey, label: string) {
    return (
      <div>
        <label className="block text-gray-600 mb-1">{label}</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={values[name]}
          onChange={(e) => handleChange(name, (e.target as HTMLInputElement).value)}  // Cast the event target to HTMLInputElement
          onInput={(e) => handleChange(name, (e.target as HTMLInputElement).value)}   // Cast the event target to HTMLInputElement
          placeholder="Enter value"
        />
      </div>
    );
  }

  return (
    <div className="h-full">
      <Header/>
      <div className="bg-[#ffdc14] py-6 mt-4">
        <h1 className="text-4xl font-bold text-center text-[#a39f9f]">Land Area Unit Converter</h1>
      </div>
      <div className="p-6 max-w-4xl mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Ropani System</h2>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {renderInput("ropani", "Ropani")}
          {renderInput("aana", "Aana")}
          {renderInput("paisa", "Paisa")}
          {renderInput("daam", "Daam")}
        </div>
        <h2 className="text-2xl font-bold mb-4">Bigha System</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {renderInput("bigha", "Bigha")}
          {renderInput("kattha", "Kattha")}
          {renderInput("dhur", "Dhur")}
        </div>
        <h2 className="text-2xl font-bold mb-4">Feet/Meter</h2>
        <div className="grid grid-cols-2 gap-4">
          {renderInput("sqFeet", "Sq. Feet")}
          {renderInput("sqMeter", "Sq. Meter")}
        </div>
      </div>
    </div>
  );
}
