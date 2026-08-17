import { category } from "./category";
import { localizedList, localizedString, localizedText } from "./localized";
import { product } from "./product";
import { site } from "./site";

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedList,
  category,
  product,
  site,
];
