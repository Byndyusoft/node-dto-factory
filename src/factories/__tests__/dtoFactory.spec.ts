/*
 * Copyright 2021 Byndyusoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DtoFactory } from "~/src";
import { PartyDto } from "~/test";

describe("factories/DtoFactory", () => {
  let dtoFactory: DtoFactory<PartyDto>;

  beforeAll(() => {
    dtoFactory = new DtoFactory<PartyDto>({
      build() {
        return {
          mainCharacter: {
            id: 1,
            name: "Mage",
          },
          favoriteCompanion: {
            id: 2,
            name: "Warrior",
          },
          companions: [
            {
              id: 2,
              name: "Warrior",
            },
            {
              id: 3,
              name: "Rogue",
            },
          ],
        };
      },
    });
  });

  describe("::build", () => {
    it("must build party without override", () => {
      expect(dtoFactory.build()).toStrictEqual({
        mainCharacter: {
          id: 1,
          name: "Mage",
        },
        favoriteCompanion: {
          id: 2,
          name: "Warrior",
        },
        companions: [
          {
            id: 2,
            name: "Warrior",
          },
          {
            id: 3,
            name: "Rogue",
          },
        ],
      });
    });

    it("must build party with array override", () => {
      expect(
        dtoFactory.build({
          mainCharacter: {
            name: "Rogue",
          },
          companions: [
            {
              id: 10,
              name: "Mage",
            },
          ],
        }),
      ).toStrictEqual({
        mainCharacter: {
          id: 1,
          name: "Rogue",
        },
        favoriteCompanion: {
          id: 2,
          name: "Warrior",
        },
        companions: [
          {
            id: 10,
            name: "Mage",
          },
        ],
      });
    });

    it("must build party with nullable override", () => {
      expect(
        dtoFactory.build({
          favoriteCompanion: undefined,
        }),
      ).toStrictEqual({
        mainCharacter: {
          id: 1,
          name: "Mage",
        },
        favoriteCompanion: undefined,
        companions: [
          {
            id: 2,
            name: "Warrior",
          },
          {
            id: 3,
            name: "Rogue",
          },
        ],
      });
    });
  });

  describe("::buildList", () => {
    it("must build parties without override", () => {
      expect(dtoFactory.buildList(2)).toStrictEqual([
        {
          mainCharacter: {
            id: 1,
            name: "Mage",
          },
          favoriteCompanion: {
            id: 2,
            name: "Warrior",
          },
          companions: [
            {
              id: 2,
              name: "Warrior",
            },
            {
              id: 3,
              name: "Rogue",
            },
          ],
        },
        {
          mainCharacter: {
            id: 1,
            name: "Mage",
          },
          favoriteCompanion: {
            id: 2,
            name: "Warrior",
          },
          companions: [
            {
              id: 2,
              name: "Warrior",
            },
            {
              id: 3,
              name: "Rogue",
            },
          ],
        },
      ]);
    });

    it("must build parties with array override", () => {
      expect(
        dtoFactory.buildList(2, {
          mainCharacter: {
            id: 10,
          },
          companions: [],
        }),
      ).toStrictEqual([
        {
          mainCharacter: {
            id: 10,
            name: "Mage",
          },
          favoriteCompanion: {
            id: 2,
            name: "Warrior",
          },
          companions: [],
        },
        {
          mainCharacter: {
            id: 10,
            name: "Mage",
          },
          favoriteCompanion: {
            id: 2,
            name: "Warrior",
          },
          companions: [],
        },
      ]);
    });

    it("must build parties with nullable override", () => {
      expect(
        dtoFactory.buildList(2, {
          favoriteCompanion: {
            name: undefined,
          },
          companions: [],
        }),
      ).toStrictEqual([
        {
          mainCharacter: {
            id: 1,
            name: "Mage",
          },
          favoriteCompanion: {
            id: 2,
            name: undefined,
          },
          companions: [],
        },
        {
          mainCharacter: {
            id: 1,
            name: "Mage",
          },
          favoriteCompanion: {
            id: 2,
            name: undefined,
          },
          companions: [],
        },
      ]);
    });
  });
});
