import { lib, PBKDF2, algo, AES, mode, enc } from 'crypto-js';

/**
 * Encryption class for encrypt/decrypt that works between programming languages.
 *
 * @author Vee Winch.
 * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs Reference.
 * @link https://github.com/brix/crypto-js/releases crypto-js.js can be download from here.
 */
export class Encryption {

  /** Return encrypt method or Cipher method number. (128, 192, 256) */
  get encryptMethodLength(): number {
      const encryptMethod = this.encryptMethod;
      // get only number from string.
      // @link https://stackoverflow.com/a/10003709/128761 Reference.
      const aesNumber = encryptMethod.match(/\d+/)[0];

      return parseInt(aesNumber, 10);
  }


  /** Return cipher method divide by 8. example: AES number 256 will be 256/8 = 32. */
  get encryptKeySize(): number {
    const aesNumber = this.encryptMethodLength;

    return aesNumber / 8;
  }


  /**
   * Cipher method.
   * Recommended AES-128-CBC, AES-192-CBC, AES-256-CBC
   * due to there is no `openssl_cipher_iv_length()` function in JavaScript
   * and all of these methods are known as 16 in iv_length.
   * http://php.net/manual/en/function.openssl-get-cipher-methods.php
   * Refer to available methods in PHP if we are working between JS & PHP encryption.
   */
  get encryptMethod(): string {
    return 'AES-256-CBC';
  }


  /**
   * Decrypt string.
   *
   * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs
   * Reference.
   * @link https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-cryptojs
   * Crypto JS base64 encode/decode reference.
   *
   * @param string encryptedString The encrypted string to be decrypt.
   * @param string key The key.
   * @return string Return decrypted string.
   */
  // decrypt(encryptedString, key) {
  //     o json = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encryptedString)));

  //     var salt = CryptoJS.enc.Hex.parse(json.salt);
  //     var iv = CryptoJS.enc.Hex.parse(json.iv);

  //     var encrypted = json.ciphertext;// no need to base64 decode.

  //     var iterations = parseInt(json.iterations);
  //     if (iterations <= 0) {
  //         iterations = 999;
  //     }
  //     var encryptMethodLength = (this.encryptMethodLength/4);// example: AES number is 256 / 4 = 64
  //     var hashKey = CryptoJS.PBKDF2(key, salt, {
    // 'hasher': CryptoJS.algo.SHA512, 'keySize': (encryptMethodLength/8), 'iterations': iterations
  // });

  //     var decrypted = CryptoJS.AES.decrypt(encrypted, hashKey, {'mode': CryptoJS.mode.CBC, 'iv': iv});

  //     return decrypted.toString(CryptoJS.enc.Utf8);
  // }


  /**
   * Encrypt string.
   *
   * @link https://stackoverflow.com/questions/41222162/encrypt-in-php-openssl-and-decrypt-in-javascript-cryptojs Reference.
   * @link https://stackoverflow.com/questions/25492179/decode-a-base64-string-using-cryptojs Crypto JS base64 encode/decode reference.
   * @param string string The original string to be encrypt.
   * @param string key The key.
   * @return string Return encrypted string.
   */
  encrypt(text: string, key: string): string {
      // the reason to be 16, please read on `encryptMethod` property.
      const iv = lib.WordArray.random(16);

      const salt = lib.WordArray.random(256);
      const iterations = 999;
      const encryptMethodLength = (this.encryptMethodLength / 4);
      // example: AES number is 256 / 4 = 64

      const hashKey = PBKDF2(key, salt, {
        hasher: algo.SHA512,
        keySize: (encryptMethodLength / 8),
        iterations
      });

      const encrypted = AES.encrypt(text, hashKey, {
        mode: mode.CBC,
        iv
      });

      const ciphertext = enc.Base64.stringify(encrypted.ciphertext);

      const output = {
        ciphertext,
        iv: enc.Hex.stringify(iv),
        salt: enc.Hex.stringify(salt),
        iterations
      };

      return enc.Base64.stringify( enc.Utf8.parse( JSON.stringify(output) ) );
  }
}
