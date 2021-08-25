import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Icon, Image, ToolBar} from '../../../utils/general';

import dirs from './dir.json';

export const WnTerminal = ()=>{
  const apps = useSelector(state => state.apps);
  const wnapp = useSelector(state => state.apps.terminal);
  const [stack, setStack] = useState([
    "Microsoft Windows [Version 11.0.20021.1]",
    "(c) 2021 Microsoft Corporation. Tüm hakları saklıdır.",
    ""
  ]);
  const [pwd, setPwd] = useState("C:\\Users\\Elona");
  const [lastCmd, setLsc] = useState(0);
  const [wntitle, setWntitle] = useState("Komut İstemi");

  const dispatch = useDispatch();

  const dirFolders = (isFile="")=>{
    var tdir = {...dirs},
    curr = pwd=="C:\\"?[]:pwd.replace("C:\\","").split("\\");


    if(pwd!="C:\\"){
      for (var i = 0; i < curr.length; i++) {
        console.log(tdir);
        tdir = tdir[curr[i]];
      }
    }

    if(isFile==""){
      return Object.keys(tdir);
    }else{
      return tdir[isFile] || {};
    }
  }

  const cmdTool = (cmd)=>{
    var tmpStack = [...stack];
    tmpStack.push(pwd+">"+cmd);
    var arr = cmd.split(" "),
        type = arr[0].trim().toLowerCase(), arg = arr.splice(1,arr.length).join(" ") || "";

    arg = arg.trim();

    if(type=="echo"){
      if(arg.length){
        tmpStack.push(arg);
      }else{
        tmpStack.push("ECHO is on.");
      }
    }else if(type=="cd"){
      if(arg.length){
        var errp = true;
        var curr = pwd=="C:\\"?[]:pwd.replace("C:\\","").split("\\");

        if(arg=="."){
          errp = false;
        }else if (arg=="..") {
          errp = false;
          curr.pop();
          setPwd("C:\\"+curr.join("\\"));
        }else if(!arg.includes(".")){
          var tdir = dirFolders();

          for (var i = 0; i < tdir.length; i++) {
            if(arg==tdir[i] && errp){
              curr.push(tdir[i]);
              errp = false;
              setPwd("C:\\"+curr.join("\\"));
              break;
            }
          }
        }else{
          errp = false;
          tmpStack.push("Dizin adı geçersiz.");
        }

        if(errp){
          tmpStack.push("Sistem belirtilen yolu bulamıyor.");
        }
      }else{
        tmpStack.push(pwd);
      }
    }else if (type=="dir") {
      tmpStack.push(" Directory of "+pwd);
      tmpStack.push("");
      tmpStack.push("<DIR>    .")
      tmpStack.push("<DIR>    ..")

      var tdir = dirFolders();
      for (var i = 0; i < tdir.length; i++) {
        if(!tdir[i].includes(".")){
          tmpStack.push("<DIR>..."+tdir[i])
        }else{
          tmpStack.push("DOSYA...."+tdir[i])
        }
      }
    }else if (type=="cls") {
      tmpStack = [];
    }else if (type=="type") {
      var errp = true;

      if(arg.includes(".")){
        var tdir = dirFolders();

        for (var i = 0; i < tdir.length; i++) {
          if(arg==tdir[i] && errp){
            errp = false;
            var file = dirFolders(tdir[i]);
            var content = file.content || "";
            content = content.split("\n");
            for (var i = 0; i < content.length; i++) {
              tmpStack.push(content[i]);
            }
            break;
          }
        }
      }

      if(errp){
        tmpStack.push("Sistem belirtilen dosyayı bulamıyor.");
      }
    }else if (type=="start") {
      dispatch({type: "EDGELINK", payload: arg});
    }else if (type=="date") {
      tmpStack.push("The current date is: " + new Date().toLocaleDateString());
    }else if (type=="time") {
      tmpStack.push("The current time is: " +
              new Date().toLocaleTimeString("tr-TR",{
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'}).replaceAll(":",".") + "." +
              Math.floor(Math.random()*100));
    }else if (type=="exit") {
      tmpStack = [
       "Microsoft Windows [Version 11.0.20021.1]",
       "(c) 2021 Microsoft Corporation. Tüm hakları saklıdır.",
       ""
      ];
      dispatch({type: wnapp.action, payload: "close"})
    }else if (type=="title") {
      setWntitle(arg.length?arg:"Windows Terminal");
    }else if (type=="hostname") {
      tmpStack.push("Blue");
    }else if (type=="ver") {
      tmpStack.push("Microsoft Windows [Version 11.0.20021.1]");
    }else if (type=="systeminfo") {
      var dvInfo = [
        "Sunucu Adı:                ELONA",
        "OS Adı:                   Microsoft Windows 11 Home Tek Dil",
        "OS Versiyonu:              11.0.20021.1 N/A Build 20021.1",
        "OS Manufacturer:           Microsoft Corporation",
        "OS Configuration:          Standalone Workstation",
        "OS Build Type:             Multiprocessor Free",
        "Registered Owner:          Blue",
        "Registered Organization:   N/A",
        "Product ID:                7H1S1-5AP1R-473DV-3R5I0N"
      ];

      for (var i = 0; i < dvInfo.length; i++) {
        tmpStack.push(dvInfo[i]);
      }
    }else if (type=="help") {
      var helpArr = [
        "CD             Geçerli dizinin adını görüntüler veya değiştirir.",
        "CLS            Ekranı temizler.",
        "DATE           Tarihi görüntüler veya ayarlar.",
        "DIR            Bir dizindeki dosya ve alt dizinlerin listesini görüntüler.",
        "ECHO           Mesajları görüntüler veya komut yankısını açar veya kapatır.",
        "EXIT           CMD.EXE programından (komut yorumlayıcısı) çıkar.",
        "HELP           Windows komutları için Yardım bilgileri sağlar.",
        "START          Belirtilen bir programı veya komutu çalıştırmak için ayrı bir pencere başlatır.",
        "SYSTEMINFO     Makineye özgü özellikleri ve yapılandırmayı görüntüler.",
        "TIME           Sistem saatini görüntüler veya ayarlar.",
        "TITLE          Bir CMD.EXE oturumu için pencere başlığını ayarlar.",
        "TYPE           Bir metin dosyasının içeriğini görüntüler.",
        "VER            Windows sürümünü görüntüler."
      ];

      for (var i = 0; i < helpArr.length; i++) {
        tmpStack.push(helpArr[i]);
      }
    }else{
      tmpStack.push(`'${type}' dahili veya harici bir komut olarak tanınmaz,`);
      tmpStack.push("çalıştırılabilir program veya toplu iş dosyası.")
      tmpStack.push("")
      tmpStack.push("Kullanılabilir komutlar için \"help\" yazın")
    }

    tmpStack.push("");
    setStack(tmpStack);
  }

  const action = (event)=>{
    var cmdline = document.getElementById('curcmd');
    var action = event.target.dataset.action;

    if(cmdline){
      if(action=="hover"){
        var crline = cmdline.parentNode;
        var cmdcont = document.getElementById('cmdcont');
        if(crline && cmdcont){
          cmdcont.scrollTop = crline.offsetTop;
        }
        cmdline.focus();
      }else if (action=="enter") {
        if(event.key=="Enter"){
          event.preventDefault();
          var tmpStack = [...stack];
          var cmd = event.target.innerText.trim();
          event.target.innerText = "";
          setLsc(tmpStack.length+1);
          cmdTool(cmd);
        }else if (event.key=="ArrowUp" || event.key=="ArrowDown") {
          event.preventDefault();
          var i = lastCmd + [1,-1][Number(event.key=="ArrowUp")];

          while( i>=0 && i<stack.length){
            if(stack[i].startsWith("C:\\") && stack[i].includes(">")){
              var tp = stack[i].split(">");
              event.target.innerText = tp[1] || "";
              setLsc(i);
              break;
            }

            i+=[1,-1][Number(event.key=="ArrowUp")];
          }

          cmdline.focus();
        }else if(event.key=="Tab"){
          event.preventDefault();
          var cmd = event.target.innerText.trim(),
            arr = cmd.split(" ");
          var arg = arr.splice(1,arr.length).join(" ") || "";

          var tdir = dirFolders();
          for (var i = 0; i < tdir.length; i++) {
            if(arg.length &&
              tdir[i].toLowerCase().startsWith(arg.toLowerCase())){
              event.target.innerText = arr[0]+" "+tdir[i];
              break;
            }
          }
        }
      }
      cmdline.focus();
    }
  }

  useEffect(()=>{
    if(wnapp.dir && wnapp.dir!=pwd){
      setPwd(wnapp.dir);
      dispatch({type: "OPENTERM", payload: null});
    }
  })

  return (
    <div
      className="wnterm floatTab dpShad" data-size={wnapp.size}
      data-max={wnapp.max} style={{
       ...(wnapp.size=="cstm"?wnapp.dim:null),
       zIndex: wnapp.z
       }} data-hide={wnapp.hide} id={wnapp.icon+"App"}>
      <ToolBar app={wnapp.action} icon={wnapp.icon}
        name={wntitle} invert bg="#060606"/>
      <div className="windowScreen flex" data-dock="true">
        <div className="restWindow h-full flex-grow text-gray-100">
          <div className="cmdcont w-full box-border overflow-y-scroll thinScroll prtclk"
            id="cmdcont" onMouseOver={action} onClick={action} data-action="hover">
            <div className="w-full h-max pb-12">
              {stack.map(x=> <div className="cmdLine">{x}</div>)}
              <div className="cmdLine actmd">
                {pwd}>
                <div className="ipcmd" id="curcmd" contentEditable
                  data-action="enter" onKeyDown={action}></div>
                {/* <input id="curcmd" className="ipcmd" type="text" defaultValue="tyler"/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
