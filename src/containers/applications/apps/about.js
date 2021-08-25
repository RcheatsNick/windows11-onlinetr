import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Image, ToolBar} from '../../../utils/general';

export const AboutWin = ()=>{
  const {abOpen} = useSelector(state=> state.desktop);
  const [open, setOpen] = useState(()=>{
    if(localStorage.getItem('closeAbout')=="true"){
      return false;
    }else{
      return true;
    }
  });
  const dispatch = useDispatch();

  const action = ()=>{
    setOpen(false);
    localStorage.setItem('closeAbout',true);
    dispatch({type: "DESKABOUT", payload: false});
  }

  return open || abOpen?(
    <div className="aboutApp floatTab dpShad">
      <div className="py-1 px-2 bg-gray-100 text-xss">
        <div className="">About Windows</div>
      </div>
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow h-full flex-grow flex flex-col items-center p-4">
          <Image src="windows11" free/>
          <div className="w-88 h-px bg-gray-400 my-4">
          </div>
          <div className="abCont">
            <div>Microsoft Windows</div>
            <div>Version 21H2 (OS Build 20021.1)</div>
            <div>&copy; Windows 11 Online Türkçe. Tüm Hakları Saklıdır.</div>
            <br/>
            <div>
              Windows 11 Home Tek Dil İşletim Sistemi ve kullanıcısı
              arayüz ticari marka tarafından korunmaktadır ve diğer bekleyen veya
              Amerika Birleşik Devletleri ve diğer ülkelerdeki mevcut fikri mülkiyet hakları
              ülkeler/bölgeler.
            </div>
            <br/>
            <br/>
            <div className="mt-1">
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              İletişim: <a target="_blank" href="https://discord.gg/gMc5c6SPsT">Discord.gg/gMc5c6SPsT</a>
            </div>
            <br/>
            <br/>
            <div>
              <span> Mevcut çalışan uygulamalar
                <mark> Hesap makinesi</mark>,
                <mark> Edge</mark>,
                <mark> NotDefteri</mark>,
                <mark> Mağaza</mark>,
                <mark> Komut İstemi</mark>,
                <mark> VsCode</mark>,
                <mark> BeyazTahta.</mark>
              </span>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="okbtn">
              <div className="bg-gray-100" onClick={action}>Ok</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ):null;
}
