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
  collection OrderBook {
    id: string;
    bid: number;
    ask: number;
    token1: string;
    domainId1: number;
    token2: string;
    domainId2: number;
    author: string;
    
    constructor (id: string, bid: number, ask: number, token1: string, domainId1: number, token2: string, domainId2: number, author: string) {
      this.id = id;
      this.bid = bid;
      this.ask = ask;
      this.token1 = token1;
      this.domainId1 = domainId1;
      this.token2 = token2;
      this.domainId2 = domainId2;
      this.author = author;
    }
  }
  
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
await db.collection("City").record("boston").call("setName", ["Brownston"]);
console.log(await db.collection("City").record("boston").get());
console.log(
  JSON.stringify(await db.collection("OrderBook").record("0x1").get())
);
