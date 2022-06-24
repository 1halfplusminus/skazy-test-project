import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export type Mutation = {
  createReservation: ReservationAvailability;
};


export type MutationCreateReservationArgs = {
  arrivalDate: Scalars['DateTime'];
  email: Scalars['String'];
  leavingDate: Scalars['DateTime'];
  nbChamber: Scalars['Int'];
};

export type Query = {
  checkAvailability: ReservationAvailability;
};


export type QueryCheckAvailabilityArgs = {
  arrivalDate: Scalars['DateTime'];
  email: Scalars['String'];
  leavingDate: Scalars['DateTime'];
  nbChamber: Scalars['Int'];
};

export type ReservationAvailability = {
  arrivalDate: Scalars['DateTime'];
  available: Scalars['Boolean'];
  leavingDate: Scalars['DateTime'];
  message: Scalars['String'];
  nbChamber: Scalars['Int'];
  price: Scalars['Float'];
};

export type CreateReservationMutationVariables = Exact<{
  nbChamber: Scalars['Int'];
  arrivalDate: Scalars['DateTime'];
  leavingDate: Scalars['DateTime'];
  email: Scalars['String'];
}>;


export type CreateReservationMutation = { createReservation: { available: boolean, message: string, price: number } };

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReservationAvailability: ResolverTypeWrapper<ReservationAvailability>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  ReservationAvailability: ReservationAvailability;
  String: Scalars['String'];
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createReservation?: Resolver<ResolversTypes['ReservationAvailability'], ParentType, ContextType, RequireFields<MutationCreateReservationArgs, 'arrivalDate' | 'email' | 'leavingDate' | 'nbChamber'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  checkAvailability?: Resolver<ResolversTypes['ReservationAvailability'], ParentType, ContextType, RequireFields<QueryCheckAvailabilityArgs, 'arrivalDate' | 'email' | 'leavingDate' | 'nbChamber'>>;
}>;

export type ReservationAvailabilityResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReservationAvailability'] = ResolversParentTypes['ReservationAvailability']> = ResolversObject<{
  arrivalDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  available?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  leavingDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nbChamber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ReservationAvailability?: ReservationAvailabilityResolvers<ContextType>;
}>;



export const CreateReservationDocument = gql`
    mutation createReservation($nbChamber: Int!, $arrivalDate: DateTime!, $leavingDate: DateTime!, $email: String!) {
  createReservation(
    nbChamber: $nbChamber
    arrivalDate: $arrivalDate
    leavingDate: $leavingDate
    email: $email
  ) {
    available
    message
    price
  }
}
    `;

/**
 * __useCreateReservationMutation__
 *
 * To run a mutation, you first call `useCreateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReservationMutation, { data, loading, error }] = useCreateReservationMutation({
 *   variables: {
 *      nbChamber: // value for 'nbChamber'
 *      arrivalDate: // value for 'arrivalDate'
 *      leavingDate: // value for 'leavingDate'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateReservationMutation, CreateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReservationMutation, CreateReservationMutationVariables>(CreateReservationDocument, options);
      }
export type CreateReservationMutationHookResult = ReturnType<typeof useCreateReservationMutation>;
export type CreateReservationMutationResult = Apollo.MutationResult<CreateReservationMutation>;
export type CreateReservationMutationOptions = Apollo.BaseMutationOptions<CreateReservationMutation, CreateReservationMutationVariables>;