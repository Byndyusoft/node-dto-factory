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
          companions: [
            {
              id: 1,
              name: "Warrior",
            },
            {
              id: 2,
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
        companions: [
          {
            id: 1,
            name: "Warrior",
          },
          {
            id: 2,
            name: "Rogue",
          },
        ],
      });
    });

    it("must build party with override", () => {
      expect(
        dtoFactory.build({
          mainCharacter: {
            name: "Rogue",
          },
          companions: [
            {
              id: 1,
              name: "Mage",
            },
          ],
        }),
      ).toStrictEqual({
        mainCharacter: {
          id: 1,
          name: "Rogue",
        },
        companions: [
          {
            id: 1,
            name: "Mage",
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
          companions: [
            {
              id: 1,
              name: "Warrior",
            },
            {
              id: 2,
              name: "Rogue",
            },
          ],
        },
        {
          mainCharacter: {
            id: 1,
            name: "Mage",
          },
          companions: [
            {
              id: 1,
              name: "Warrior",
            },
            {
              id: 2,
              name: "Rogue",
            },
          ],
        },
      ]);
    });

    it("must build parties with override", () => {
      expect(
        dtoFactory.buildList(2, {
          mainCharacter: {
            id: 2,
          },
          companions: [],
        }),
      ).toStrictEqual([
        {
          mainCharacter: {
            id: 2,
            name: "Mage",
          },
          companions: [],
        },
        {
          mainCharacter: {
            id: 2,
            name: "Mage",
          },
          companions: [],
        },
      ]);
    });
  });
});
