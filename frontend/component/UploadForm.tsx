"use client";
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomSelectField from './CustomSelectField';

const UploadForm = () => {
  // Initial form values
  const initialValues = {
    file: null,
    pump1: 'Glucose',
    pump2: 'Base',
  };

  // Supported file formats for upload
  const SUPPORTED_FORMATS = ['text/csv'];

  // Validation schema for the form
  const validationSchema = Yup.object({
    file: Yup.mixed()
      .required("File is required")
      .test("format", "Please upload as CSV", (value) => {
        if (!value) return false; 
        const file = value as File; 
        return SUPPORTED_FORMATS.includes(file.type);
      }),
    pump1: Yup.string().required('Pump1 selection is required'),
    pump2: Yup.string().required('Pump2 selection is required'),
  });

  // Handle form submission
  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('pump1', values.pump1);
    formData.append('pump2', values.pump2);

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        // Handle successful response, e.g., display a chart
      } else {
        console.error('Upload failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, errors, touched }) => {
        return (
          <Form className="grid max-w-screen-2xl mx-auto w-full mt-12">
            <div className="mb-4">
              <label className="block text-gray-700 text-md md:text-lg font-normal mb-2">
                Upload CSV File:
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 text-md md:text-lg leading-tight focus:outline-none focus:shadow-outline ${
                  touched.file && errors.file ? 'border-red-500' : ''
                }`}
                type="file"
                accept=".csv"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }
                }}
              />
              {touched.file && typeof errors.file === 'string' ? (
                <p className="text-red-500 text-sm italic text-end">{errors.file}</p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8">
              <CustomSelectField
                label="Select Pump1:"
                name="pump1"
                options={[
                  { value: 'Glucose', label: 'Glucose' },
                  { value: 'Glycerol', label: 'Glycerol' },
                ]}
              />
              <CustomSelectField
                label="Select Pump2:"
                name="pump2"
                options={[
                  { value: 'Base', label: 'Base' },
                  { value: 'Acid', label: 'Acid' },
                ]}
              />
            </div>
            <button type="submit" className="me-auto lg:ms-auto w-fit bg-orange rounded text-white text-xl px-4 py-2">
              Upload and Process
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UploadForm;