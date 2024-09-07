import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionBeforeChat } from '../../../../../../store/actions/changeRadioState';
import { RadioButtonWithLabel, Textarea } from '../../../../../atoms';
import { DetailsCard } from '../../../../../molecules';

const Component = () => {
  const stateRadio = useSelector(stateRadio => stateRadio.radioReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    dispatch(setQuestionBeforeChat(""));
  }, []);
  return (
    <div className="select-question__wrapper">
      <DetailsCard>
        <p className="select-question__title">Pilih Pertanyaan</p>
        <div className="select-question__radio__wrapper">
          <RadioButtonWithLabel 
            text="Di mana letak property ini?" 
            labelClassname="select-question__radio__label" 
            checkColor="orange" 
            checked={stateRadio.questionBeforeChat === "letak-properti"} 
            name="letak-properti" 
            onChange={(event) => { dispatch(setQuestionBeforeChat(event.target.value)) }} 
          />
          <RadioButtonWithLabel 
            text="Apa masih tersedia?" 
            labelClassname="select-question__radio__label" 
            checkColor="orange" 
            checked={stateRadio.questionBeforeChat === "masih-tersedia"} 
            name="masih-tersedia" 
            onChange={(event) => { dispatch(setQuestionBeforeChat(event.target.value)) }} 
          />
          <RadioButtonWithLabel 
            text="Berapa harga property ini?" 
            labelClassname="select-question__radio__label" 
            checkColor="orange" 
            checked={stateRadio.questionBeforeChat === "harga-properti"} 
            name="harga-properti" 
            onChange={(event) => { dispatch(setQuestionBeforeChat(event.target.value)) }} 
          />
          <RadioButtonWithLabel 
            text="Tulis pertanyaan lain" 
            labelClassname="select-question__radio__label" 
            checkColor="orange" 
            checked={stateRadio.questionBeforeChat === "pertanyaan-lain"} 
            name="pertanyaan-lain" 
            onChange={(event) => { dispatch(setQuestionBeforeChat(event.target.value)) }} 
          />
        </div>
        <div className="select-question__textarea__wrapper">
          <Textarea placeholder="Tulis pesan disini..." resize={false} />
        </div>
      </DetailsCard>
    </div>
  );
};

export default Component;