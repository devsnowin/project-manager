import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import client from '../model/client';
import project from '../model/project';

/**
 * Client Type
 */
const Client = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

/**
 * Project Type
 */
const Project = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: Client,
      resolve(parent) {
        return client.findById(parent.clientId);
      },
    },
  }),
});

/**
 * Root Query
 */
const Query = new GraphQLObjectType({
  name: 'query',
  fields: {
    clients: {
      type: new GraphQLList(Client),
      resolve() {
        return client.find({});
      },
    },
    client: {
      type: Client,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return client.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(Project),
      resolve() {
        return project.find({});
      },
    },
    project: {
      type: Project,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return project.findById(args.id);
      },
    },
  },
});

/**
 * Root Mutation
 */
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: Client,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        return await client.create({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
      },
    },

    addProject: {
      type: Project,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              started: { value: 'STARTED' },
              progress: { value: 'PROGRESS' },
              done: { value: 'DONE' },
            },
          }),
          defaultValue: 'STARTED',
        },
        clientId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        return await project.create({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });
      },
    },

    deleteClient: {
      type: Client,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        await project.deleteMany({ clientId: args.id });

        return await client.findByIdAndDelete(args.id);
      },
    },

    deleteProject: {
      type: Project,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parent, args) {
        return await project.findByIdAndDelete(args.id);
      },
    },

    updateClient: {
      type: Client,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
            },
          },
          { new: true }
        );
      },
    },

    updateProject: {
      type: Project,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              started: { value: 'STARTED' },
              progress: { value: 'PROGRESS' },
              done: { value: 'DONE' },
            },
          }),
        },
      },
      async resolve(parent, args) {
        return await project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId,
            },
          },
          { new: true }
        );
      },
    },
  },
});

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
