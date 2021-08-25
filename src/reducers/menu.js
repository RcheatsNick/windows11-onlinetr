const defState = {
  hide: true,
  top: 272,
  left: 430,
  opts: "desk",
  menus: {
    desk: [
      {
        name: "Görünüm",
        opts: [{
          name: "Büyük Simgeler",
          action: "changeIconSize",
          payload: "large"
        }, {
          name: "Orta Boyutlu Simgeler",
          action: "changeIconSize",
          payload: "medium"
        }, {
          name: "Küçük Simgeler",
          action: "changeIconSize",
          payload: "small",
          dot: true
        }, {
          type: "hr"
        }, {
          name: "Masaüstü Simgelerini Göster",
          action: "deskHide",
          check: true
        }]
      }, {
        name: "Sıralama Ölçütü",
        opts: [{
          name: "Ad",
          action: "changeSort",
          payload: "name"
        }, {
          name: "Boyut",
          action: "changeSort",
          payload: "size"
        }, {
          name: "Değiştirme Tarihi",
          action: "changeSort",
          payload: "date"
        }]
      }, {
        name: "Yenile",
        action: "refresh"
      }, {
        type: "hr"
      }, {
        name: "Yapıştır",
        dsb: true
      }, {
        name: "Kısayol Yapıştır",
        dsb: true
      },{
        name: "Silme işlemini geri al"
      }, {
        name: "Klasörü Cmd ile Aç",
        icon: 'terminal',
        action: "OPENTERM",
        payload: "C:\\Users\\Blue\\Desktop"
      }, {
        type: "hr"
      }, {
        name: "Yeni",
        dsb: true
      }, {
        type: "hr"
      }, {
        name: "Kişiselleştir",
        icon: 'win/themes',
        dsb: true
      },
      {
        name: "Hakkında",
        action: "DESKABOUT",
        icon: 'win/info',
        payload: true
      }
    ],
    task: [
      {
        name: "Simgeleri hizala",
        opts: [{
          name: "Sol",
          action: "changeTaskAlign",
          payload: "left"
        }, {
          name: "Orta",
          action: "changeTaskAlign",
          payload: "center",
          dot: true
        }]
      },{
        type: "hr"
      }, {
        name: "Arama",
        opts: [{
          name: "Göster",
          action: "TASKSRCH",
          payload: true
        }, {
          name: "Gizle",
          action: "TASKSRCH",
          payload: false
        }]
      }, {
        name: "Widgetlar",
        opts: [{
          name: "Gözter",
          action: "TASKWIDG",
          payload: true
        }, {
          name: "Gizle",
          action: "TASKWIDG",
          payload: false
        }]
      },{
        type: "hr"
      }, {
        name: "Masaüstünü Göster",
        action: "SHOWDSK"
      }
    ]
  }
};

const menusReducer = (state = defState, action) => {
  var tmpState = {
    ...state
  };
  if (action.type == "MENUHIDE") {
    tmpState.hide = true;
  } else if (action.type == "MENUSHOW") {
    tmpState.hide = false;
    tmpState.top = (action.payload && action.payload.top) || 272;
    tmpState.left = (action.payload && action.payload.left) || 430;
    tmpState.opts = (action.payload && action.payload.menu) || "desk";
  } else if (action.type == "MENUCHNG") {
    tmpState = {
      ...action.payload
    };
  }

  return tmpState;
}

export default menusReducer;
