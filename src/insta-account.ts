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
import { Dsa } from "../generated/schema";
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
  user.count = user.count.plus(BigInt.fromI32(1));
  dsa.owner = user.id;
  dsa.isAuth = true;

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

  let dsa = Dsa.load(id);
  if (dsa == null) {
    log.info("DSA-doesn't-exist: ", [id]);
    return;
  }
  let user = createOrLoadUser(event.params.user.toHexString());

  user.address = event.params.user;
  user.count = user.count.minus(BigInt.fromI32(1));
  dsa.owner = user.id;
  dsa.isAuth = false;

  user.save();
  dsa.save();
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
  user.count = user.count.plus(BigInt.fromI32(1));
  dsa.owner = user.id;
  dsa.isAuth = true;

  user.save();
  dsa.save();
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

  let dsa = Dsa.load(id);
  if (dsa == null) {
    log.info("DSA-doesn't-exist: ", [id]);
    return;
  }
  let user = createOrLoadUser(event.params.user.toHexString());

  user.address = event.params.user;
  user.count = user.count.minus(BigInt.fromI32(1));
  dsa.owner = user.id;
  dsa.isAuth = false;

  user.save();
  dsa.save();
}
