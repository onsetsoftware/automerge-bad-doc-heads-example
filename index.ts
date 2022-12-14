import * as Automerge from "@automerge/automerge";
import { data } from "./data";

import * as fs from 'fs';

const docData = fs.readFileSync('./doc.bin');

const doc = Automerge.load(docData);
const syncState = data.syncState;

let newDoc, newSyncState;

try {
  [newDoc, newSyncState] = Automerge.receiveSyncMessage(doc, syncState, data.syncMessage);
} catch (e) {
  console.log("Automerge sync state error caught", e);
  [newDoc, newSyncState] = Automerge.receiveSyncMessage(doc, Automerge.decodeSyncState(Automerge.encodeSyncState(syncState)), data.syncMessage);
}

Automerge.load(Automerge.save(newDoc));
