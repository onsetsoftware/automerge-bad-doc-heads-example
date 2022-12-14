import * as Automerge from "@automerge/automerge";
import { data } from "./data";

import * as fs from 'fs';
import * as path from 'path';

// load document
const docData = fs.readFileSync(path.join(__dirname,'../data/doc.bin'));
const doc = Automerge.load(docData);

// load local syncState
const syncState = data.syncState;

let newDoc, newSyncState;

// update doc
[newDoc, newSyncState] = Automerge.receiveSyncMessage(doc, syncState, data.syncMessage);

// save and reload doc, which throws the error
Automerge.load(Automerge.save(newDoc));
