import { writable } from 'svelte/store';

// 現在のyyyy-mm
const dt: Date = new Date();
let y: string = String(dt.getFullYear());
let m: string = ("00" + (dt.getMonth()+1)).slice(-2);

export const ym: any  = writable<string>(y + '-' + m);
export const pics: any = writable();