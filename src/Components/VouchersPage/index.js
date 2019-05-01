import React from 'react';
import moment from 'moment';

import CompensationSelection from "../CompensationSelection";
import {connect} from "react-redux";
import {selectVoucher} from "../../actions/vouchers";
import {initialState} from "../../reducers/voucher";
import Icon from "../Icon";

const mapStateToProps = state => ({
  receivedVoucher: (state.voucher || initialState).data,
  mealData: (state.voucher || initialState).mealData
});

function VouchersPage({ icon, dispatch, mealData, receivedVoucher }) {
  const instructions = ['תוכל לממש את השובר רק באותו היום', 'הכניסה מותנית בהצגת שובר בלבד'];

  function handleVoucherSelected(selectedVoucher) {
    const { meal, user, date } = mealData;
    const dateNumber = parseInt(moment(date).format("GGGGMMDD"));
    const data = { meal_id: meal, user_id: user, date: dateNumber, value: selectedVoucher };
    dispatch(selectVoucher({ data }));
  }

  if (!Object.keys(receivedVoucher).length) {
    return (<CompensationSelection onSubmit={handleVoucherSelected} icon={icon} />);
  }

  return (
    <div className="mh-voucher mh-flex-column">
      {receivedVoucher && <img className="mh-voucher__code" src={receivedVoucher.qrcode} alt="voucher"/> }

      <div className="mh-voucher__instructions mh-flex-column">
        <h4>איך זה עובד?</h4>
        <p className="mh-flex mh-align-center mh-flex--justify-end">{instructions[0]} <Icon className="mh-voucher__icon" icon="date" /></p>
        <p className="mh-flex mh-align-center mh-flex--justify-end">{instructions[1]} <Icon className="mh-voucher__icon" icon="check" /></p>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(VouchersPage);
