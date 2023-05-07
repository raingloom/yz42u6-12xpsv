import { DocumentSnapshot } from "@angular/fire/firestore"

export interface Ware {
  id: string;
  name: string;
  magnet: string;
  description: string;
}

export function fromSnapshot(snap: DocumentSnapshot<Ware>): Ware {
  const d = snap.data();
  if (d === undefined) {
    throw "snapshot contains no data";
  } else {
    d.id = snap.id;
    return d;
  }
}
