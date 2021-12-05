# node-dto-factory

[![npm@latest](https://img.shields.io/npm/v/@byndyusoft/dto-factory/latest.svg)](https://www.npmjs.com/package/@byndyusoft/dto-factory)
[![test workflow](https://github.com/Byndyusoft/node-dto-factory/actions/workflows/test.yaml/badge.svg?branch=master)](https://github.com/Byndyusoft/node-dto-factory/actions/workflows/test.yaml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Factory to generate various DTO for unit tests.
Inspired by [factory.ts](https://github.com/willryan/factory.ts).

## Requirements

- Node.js v12 LTS or later
- npm or yarn

## Install

```bash
npm install @byndyusoft/dto-factory
```

or

```bash
yarn add @byndyusoft/dto-factory
```

## Usage

Example usage:

```typescript
import { makeDtoFactory } from "@byndyusoft/dto-factory";
import faker from "faker";

class CharacterDto {
  public readonly id!: number;

  public readonly name!: string;
}

const characterDtoFactory = makeDtoFactory<CharacterDto>(() => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
}));

// Build character without override
console.log(characterDtoFactory.build());

// Build character with override
console.log(
  characterDtoFactory.build({
    name: "Mage",
  }),
);

// Build characters without override
console.log(characterDtoFactory.buildList(10));

// Build characters with override
console.log(
  characterDtoFactory.buildList(10, {
    name: "Mage",
  }),
);
```

## Maintainers

- [@Byndyusoft/owners](https://github.com/orgs/Byndyusoft/teams/owners) <<github.maintain@byndyusoft.com>>
- [@Byndyusoft/team](https://github.com/orgs/Byndyusoft/teams/team)
- [@KillWolfVlad](https://github.com/KillWolfVlad)

## License

This repository is released under version 2.0 of the
[Apache License](https://www.apache.org/licenses/LICENSE-2.0).
