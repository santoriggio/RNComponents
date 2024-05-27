import RNRestart from "react-native-restart"; // Import package from node modules
import { storage } from "./store";

type Translation = Record<string, any>;
type Translations = Record<string, Translation>;

type Options =
  | {
    count?: number;
  }
  | Record<string, any>;

class I18n {
  public translations: Translations = {};
  //public locale: string = "en";
  private _locale: string = storage.get("locale") || "en";

  constructor(translations: Translations) {
    this.translations = translations;
  }

  set locale(value: string) {
    this._locale = value;

    // const uid = firebaseAuth().currentUser.uid;
    // firestore().doc(`users/${uid}`).update({locale:value});

    storage.set("locale", value);

    RNRestart.restart();
  }

  get locale() {
    return this._locale;
  }

  public t(key: string, options: Options = {}) {
    if (typeof key !== "string") return "";

    let trs: any = null;

    if (key.includes(".")) {
      key.split(".").forEach((subKey, _) => {
        if (_ === 0 && this.translations[this.locale][subKey]) {
          trs = this.translations[this.locale][subKey];
        }

        if (_ > 0 && trs && trs[subKey]) {
          trs = trs[subKey];
        }
      });
    }

    if (trs) {
      return this.sub(trs, options);
    }

    if (!trs) {
      trs = this.translations[this.locale][key];
      if (Array.isArray(trs)) {
        return trs;
      }

      if (typeof trs == "object") {
        if (typeof options.count === "number") {
          if (options.count === 0 && typeof trs["zero"] !== "undefined") {
            return this.sub(trs["zero"], options);
          }

          if (options.count === 1 && typeof trs["one"] !== "undefined") {
            return this.sub(trs["one"], options);
          }

          if (typeof trs["other"] !== "undefined") {
            return this.sub(trs["other"], options);
          }
        }
      }

      return this.translations[this.locale][key];
    }

    return key;
  }

  get locales() {
    const locales = Object.keys(this.translations);

    return locales;
  }

  private sub(str: string, options: Options = {}) {
    return str.replace(
      /%\{(\w+)\}/g,
      (match, key: keyof Options) => options[key],
    );
  }
}

const i18n = new I18n({});
/* const i18n = new I18n({
  en: require("./languages/en.json"),
  it: require("./languages/it.json"),
}); */

export default i18n;
