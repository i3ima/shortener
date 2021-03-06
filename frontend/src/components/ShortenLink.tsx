import React from "react";
import { Wrapper } from "./Wrapper";
import { InputField } from "./InputField";
import { Form, Formik } from "formik";
import { Button, Container, Link } from "@chakra-ui/react";
import { useCreateUrlMutation } from "../generated/graphql";

export const ShortenLink: React.FC = () => {
  const [value, createUrl] = useCreateUrlMutation();

  return (
    <Wrapper>
      <Formik
        initialValues={{ url: "", short: "" }}
        onSubmit={async (values, { setErrors }) => {
          const result = await createUrl({
            url: values.url
          });

          if (result.data?.createUrl.errors) {
            setErrors({
              url: result.data.createUrl.errors[0].message,
            });
          }
          result.data?.createUrl.url?.short === undefined
            ? (values.short = "")
            : (values.short = result.data.createUrl.url.short);
        }}
      >
        {({ isSubmitting, values }) => (
          <div>
            <Form>
              <InputField
                addon="https://"
                name="url"
                placeholder=""
                label="URL"
              />
              <Button
                mt={5}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </Form>
            <Container>
              {values.short.length > 0 ? (
                <Link href={`http://localhost:4000/${values.short}`}>
                  Here's your link
                </Link>
              ) : null}
            </Container>
          </div>
        )}
      </Formik>
    </Wrapper>
  );
};
