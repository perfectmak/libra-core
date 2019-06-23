type BuffString = Buffer | string;

declare module 'futoin-hkdf' {
  export default function(ikm: BuffString, outputLen: number, options: Object): Buffer;
  export function hash_length(hash: string): number;
  export function extract(hashAlgo: string, hashLen: number, ikm: BuffString, salt?: BuffString): Buffer;
  export function expand(hashAlgo: string, hashLen: number, prk: BuffString, outputLen: number, info: BuffString): Buffer;
}