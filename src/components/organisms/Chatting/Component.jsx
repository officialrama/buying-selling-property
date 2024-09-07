import React from 'react';
import InitialsAvatar from 'react-initials-avatar';
import { IsTyping, TextboxWithoutShadow } from '../../atoms';
import { Bubble, BubbleMe } from '../../molecules';

const Component = ({ closeChat }) => {
  return (
    <div>
      <div className="overlay-chat">
        <div className="overlay-chat__size">
          <div className="overlay-chat__wrapper">
            <div className="chat__wrapper">
              <div className="chat__header">
                <button onClick={closeChat}>
                  <img src="/icons/small-icons/left-btn-chat.svg" alt="back" />
                </button>
                <InitialsAvatar className="prod-detail__pages__property__detailBuying__left__dev-info__profile-pic" name="Sukses Maju" />
                <div className='prod-detail__pages__property__detailBuying__left__dev-info__name'>
                  <p>PT. Suskses Indo Maju</p>
                  <p className='prod-detail__pages__property__detailBuying__left__dev-info__location'>Yogyakarta <span className="chat__header__online">&bull; ONLINE</span></p>
                </div>
              </div>
              <div className="no-scrollbar chat__body">
                <Bubble
                  name="Kianna Curtis"
                  time="8.10 PM"
                  chatContent={[
                    `Halo selamat siang`
                  ]}
                />
                <BubbleMe
                  name="PT. Suskses Indo Maju"
                  time="8.10 PM"
                  chatContent={[
                    `Ada yang bisa kami bantu?`
                  ]}
                  isRead
                />
                <Bubble
                  name="Kianna Curtis"
                  time="8.10 PM"
                  chatContent={[
                    `Rumah iklan link ini dimana ya? \n https://www.rumah123.com/properti/sleman/hos9588033/`,
                    <><img src="/images/image 3.png" alt="img-chat" /></>
                  ]}
                />
                <IsTyping name="Kianna Curtis" />
              </div>
              <div className="chat__footer">
                <div className="chat__footer__textbox">
                  <button className="chat__footer__textbox__btn">
                    <img src="/icons/small-icons/clip-24.svg" alt="attachment" />
                  </button>
                  <button className="chat__footer__textbox__btn">
                    <img src="/icons/small-icons/emoji.svg" alt="emoji" />
                  </button>
                  <div className="chat__footer__textbox__input">
                    <TextboxWithoutShadow placeholder="Write a message..." typeInput="text" disablePadding={true} />
                  </div>
                  <button>
                    <img src="/icons/small-icons/send-chat.svg" alt="send" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;