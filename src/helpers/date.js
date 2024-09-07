import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');
export const formatDateIndo = (dateString) => {
    return moment(dateString, 'DD-MM-YYYY').format('DD MMMM YYYY');
  };