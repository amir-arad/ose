/**
 * @file Contains tests for Party Entity.
 */
// eslint-disable-next-line prettier/prettier, import/no-cycle
import { QuenchMethods } from "../../../e2e";
import { createMockActorKey } from "../../../e2e/testUtils";
import OseParty from "../party";
import OsePartySheet from "../party-sheet";

export const key = "ose.entity.party";
export const options = { displayName: "Entity: Party" };

const createMockActor = async (type: string, data: object = {}) =>
  createMockActorKey(type, data, key);

export default ({ describe, it, expect, assert, after }: QuenchMethods) => {
  describe("currentParty()", () => {
    it("Returns all characters in a party", async () => {
      const actor = await createMockActor("character");
      const partySheet = new OsePartySheet();
      // eslint-disable-next-line no-underscore-dangle
      const promisedAnswer = await partySheet._addActorToParty(actor);
      expect(promisedAnswer).is.undefined;
      assert(actor?.getFlag(game.system.id, "party"));

      const party = OseParty;
      const actorsInParty = game.actors?.filter(
        (o) => o.flags[game.system.id]?.party
      );
      expect(party.currentParty.length).equal(actorsInParty?.length);
      await actor?.delete();
    });
  });
  after(() => {
    game.actors?.contents
      ?.filter((a) => a.name?.includes(`Test Actor ${key}`))
      ?.forEach((a) => a.delete());
  });
};
