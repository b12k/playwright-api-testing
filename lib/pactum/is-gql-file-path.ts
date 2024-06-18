import path from 'node:path';

export const isGqlFilePath = (filePath: string) => {
  const regex = /^.*\.(gql|graphql)$/;
  return regex.test(path.normalize(filePath));
};
