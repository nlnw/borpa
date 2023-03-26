import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import * as dotenv from "dotenv";
dotenv.config();

const db = new Polybase({
  defaultNamespace: "borpaz",
  signer: (data) => {
    return {
      h: "eth-personal-sign",
      sig: ethPersonalSign(Buffer.from(process.env.PRIVATE_KEY, "hex"), data),
    };
  },
});

await db.applySchema(
  `
  @public
  collection City {
    id: string;
    name: string;
    country?: string;

    constructor (id: string, name: string) {
      this.id = id;
      this.name = name;
    }

    setCountry (country: string) {
      this.country = country;
    }

    setName (name: string) {
      this.name = name;
    }
  }

  @public
  collection Country {
    id: string;
    name: string;

    constructor (id: string, name: string) {
      this.id = id;
      this.name = name;
    }
  }
`
);

// await db.collection("City").create(["boston", "Bostin"]);
await db.collection("City").record("boston").call("setName", ["Bowston"]);
const data = await db.collection("City").record("boston").get();
console.log(JSON.stringify(data));
