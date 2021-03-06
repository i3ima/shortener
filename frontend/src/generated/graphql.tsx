import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  govno: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUrl: UrlResponse;
};


export type MutationCreateUrlArgs = {
  description: Scalars['String'];
  url: Scalars['String'];
};

export type UrlResponse = {
  __typename?: 'UrlResponse';
  errors?: Maybe<Array<ErrorField>>;
  url?: Maybe<Url>;
};

export type ErrorField = {
  __typename?: 'ErrorField';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Url = {
  __typename?: 'Url';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  url: Scalars['String'];
  desc: Scalars['String'];
  short: Scalars['String'];
};

export type CreateUrlMutationVariables = Exact<{
  url: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateUrlMutation = (
  { __typename?: 'Mutation' }
  & { createUrl: (
    { __typename?: 'UrlResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorField' }
      & Pick<ErrorField, 'field' | 'message'>
    )>>, url?: Maybe<(
      { __typename?: 'Url' }
      & Pick<Url, 'id' | 'url' | 'desc' | 'short'>
    )> }
  ) }
);


export const CreateUrlDocument = gql`
    mutation createUrl($url: String!, $description: String!) {
  createUrl(description: $description, url: $url) {
    errors {
      field
      message
    }
    url {
      id
      url
      desc
      short
    }
  }
}
    `;

export function useCreateUrlMutation() {
  return Urql.useMutation<CreateUrlMutation, CreateUrlMutationVariables>(CreateUrlDocument);
};