import { BigInt, DataSourceContext } from "@graphprotocol/graph-ts";
import {
  InstaIndex,
  LogAccountCreated,
} from "../generated/InstaIndex/InstaIndex";
import { InstaList } from "../generated/InstaList/InstaList";
import { InstaAccount } from "../generated/InstaIndex/InstaAccount";
import { InstaAccountModified } from "../generated/templates";
import { Dsa, User } from "../generated/schema";

export function handleLogAccountCreated(event: LogAccountCreated): void {
  // event LogAccountCreated(address sender, address indexed owner, address indexed account, address indexed origin);

  let context = new DataSourceContext();
  context.setString("dsa", event.params.account.toHexString());
  InstaAccountModified.createWithContext(event.params.account, context);

  let contract = InstaIndex.bind(event.address);
  let instaAccount = InstaAccount.bind(event.params.account);
  let instaList = InstaList.bind(contract.list());
  let accountId = instaList.accountID(event.params.account);

  let dsa = createOrLoadDsa(event.params.account.toHexString());
  let user = createOrLoadUser(event.params.owner.toHexString());

  dsa.creator = event.params.owner;
  dsa.address = event.params.account;
  dsa.version = instaAccount.version();
  dsa.accountID = accountId;
  dsa.owner = user.id;
  dsa.isAuth = true;
  user.address = event.params.owner;
  dsa.save();
}

export function createOrLoadUser(id: string): User {
  let user = User.load(id);
  if (user == null) {
    user = new User(id);
    user.count = BigInt.fromI32(0);
  }
  return user;
}

export function createOrLoadDsa(id: string): Dsa {
  let dsa = Dsa.load(id);
  if (dsa == null) {
    dsa = new Dsa(id);
  }
  return dsa;
}
