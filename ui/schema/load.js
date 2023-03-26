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

// await db.collection("City").create(["new-york", "New York"]);
const data = await db.collection("City").record("new-york").get();
console.log(JSON.stringify(data));
