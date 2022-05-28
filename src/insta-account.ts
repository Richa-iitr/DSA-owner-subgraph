import {
  Address,
  BigInt,
  Bytes,
  dataSource,
  log,
} from "@graphprotocol/graph-ts";
import {
  InstaAccountModified,
  LogDisableUser,
  LogEnableUser,
  LogDisable,
  LogEnable,
} from "../generated/templates/InstaAccountModified/InstaAccountModified";
import { DSA, User } from "../generated/schema";
import { createOrLoadDsa, createOrLoadUser } from "./insta-index";

export function handleLogEnableUser(event: LogEnableUser): void {
  // event LogEnableUser(address indexed user); --> v2

  let context = dataSource.context();
  let dsaId = context.getString("dsa");

  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  log.info("ID: {}", [dsaId]);

  let dsa = createOrLoadDsa(dsaId);
  let user = createOrLoadUser(event.params.user.toHexString());

  user.address = event.params.user;
  let owners = dsa.owners;
  let index = owners.indexOf(user.id);
  if (index == -1) {
    owners.push(user.id);
  }
  dsa.owners = owners;

  dsa.save();
  user.save();
}

export function handleLogDisableUser(event: LogDisableUser): void {
  // event LogDisableUser(address indexed user);  --> v2

  let context = dataSource.context();
  let id = context.getString("dsa");

  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  log.info("ID: {}", [id]);

  let dsa = DSA.load(id);
  if (dsa == null) {
    log.info("DSA-doesn't-exist: ", [id]);
    return;
  }
  let user = User.load(event.params.user.toHexString());
  if (user == null) {
    log.info("not-owner: {}", [event.params.user.toHexString()]);
    return;
  }
  user.address = event.params.user;
  let owners = dsa.owners;
  let removeIndex = owners.indexOf(user.id, 0);
  if (removeIndex != -1) {
    owners.splice(removeIndex, 1);
  }
  dsa.owners = owners;

  dsa.save();
  user.save();
}

export function handleEnableUser(event: LogEnable): void {
  // event LogEnable(address indexed user); --> v1

  let context = dataSource.context();
  let dsaId = context.getString("dsa");

  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  log.info("ID: {}", [dsaId]);

  let dsa = createOrLoadDsa(dsaId);
  let user = createOrLoadUser(event.params.user.toHexString());

  user.address = event.params.user;
  let owners = dsa.owners;
  let index = owners.indexOf(user.id);
  if (index == -1) {
    owners.push(user.id);
  }
  dsa.owners = owners;

  dsa.save();
  user.save();
}

export function handleDisableUser(event: LogDisable): void {
  // event LogDisable(address indexed user);  --> v1

  let context = dataSource.context();
  let id = context.getString("dsa");

  log.info("transaction hash: {} and from: {} ", [
    event.transaction.hash.toHexString(),
    event.transaction.from.toHexString(),
  ]);
  log.info("ID: {}", [id]);

  let dsa = DSA.load(id);
  if (dsa == null) {
    log.info("DSA-doesn't-exist: ", [id]);
    return;
  }
  let user = User.load(event.params.user.toHexString());
  if (user == null) {
    log.info("not-owner: {}", [event.params.user.toHexString()]);
    return;
  }
  user.address = event.params.user;
  let owners = dsa.owners;
  let removeIndex = owners.indexOf(user.id, 0);
  if (removeIndex != -1) {
    owners.splice(removeIndex, 1);
  }
  dsa.owners = owners;

  dsa.save();
  user.save();
}
