/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

import { format } from "date-fns";

const formatDate = (date, token, lingo) =>
  format(date, token, {
    locale: require(`date-fns/locale/${lingo}`)
  });

export default formatDate;
