import React, { useEffect } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import useSubmit from "../hooks/useSubmit";
import FullScreenSection from "./FullScreenSection";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const { errors, touched, handleSubmit, resetForm, getFieldProps } = useFormik(
    {
      initialValues: {
        firstName: "",
        email: "",
        type: "hireMe",
        comment: "",
      },
      onSubmit: async (values) => {
        await submit("/api/contact", values);
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        type: Yup.string().optional(),
        comment: Yup.string()
          .min(25, "Must be at least 25 characters")
          .required("Required"),
      }),
    }
  );

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);

      if (response.type === "success") {
        resetForm();
      }
    }
  }, [response]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
      w="100%"
    >
      <VStack w="100%" maxWidth="832px" p={8} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={touched.firstName && errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input id="firstName" {...getFieldProps("firstName")} />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={touched.email && errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input id="email" type="email" {...getFieldProps("email")} />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" {...getFieldProps("type")}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl isInvalid={touched.comment && errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  height={250}
                  {...getFieldProps("comment")}
                />
                <FormErrorMessage>{errors.comment}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                isLoading={isLoading}
                loadingText="Submitting"
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
