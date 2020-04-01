var me = null;
var domain = null;

function isMe(scriptElem) {
  return scriptElem.getAttribute("src").includes("hms-widget-sdk");
}

var scripts = document.getElementsByTagName("script");
for (var i = 0; i < scripts.length; ++i) {
  if (isMe(scripts[i])) {
    me = scripts[i];
    const meArray = me.getAttribute("src").split("/");
    meArray.pop();
    domain = meArray.join("/");
  }
}

var loadJsFile = function(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = function() {
    if (callback) callback();
  };
  script.type = "text/javascript";
  script.async = false;
  script.defer = false;
  const oldScript = document.getElementsByTagName("script")[0];
  oldScript.parentNode && oldScript.parentNode.insertBefore(script, oldScript);
};

var defaultIframe = {
  src: "",
  qs: "",
  iframeElement: undefined,
  theme: undefined,
  customTheme: undefined,
  width: "300px",
  height: "300px",
  href: "https://hms-widget.bonmek.com",
  pathPrefix: "embedded-widget"
};

var hmsWidget = {
  iframeObject: undefined,
  init: function(config) {
    iframeObject = defaultIframe;
    const divElement = document.getElementById(config.selector);
    iframeObject.iframeElement = document.createElement("iframe");
    iframeObject.iframeElement.setAttribute(
      "width",
      config.width || iframeObject.width
    );
    iframeObject.iframeElement.setAttribute(
      "height",
      config.height || iframeObject.height
    );
    divElement.appendChild(iframeObject.iframeElement);
    if (config.href) {
      iframeObject.href = config.href;
    }
    if (config.pathPrefix) {
      iframeObject.pathPrefix = config.pathPrefix;
    }
    iframeObject.src = `${iframeObject.href}/${iframeObject.pathPrefix}/${config.widgetPath}`;
  },
  setParams: function(params, name) {
    const qs = queryStringify({
      ...params,
      isWaitForIframeLoaded: true
    });
    iframeObject.qs = qs;
  },
  setTheme: function(data) {
    iframeObject.theme = data;
  },
  setCustomizeTheme: function(data) {
    iframeObject.customTheme = data;
  },
  render: function(initSetup) {
    initSetup();
    try {
      iframeObject.iframeElement.onload = function() {
        const actions = ["finishIframeLoading", "setTheme", "setCustomTheme"];
        const messageEvent = createMessageEvents(
          iframeObject.iframeElement,
          actions
        );
        if (iframeObject.theme) {
          messageEvent.setTheme(iframeObject.theme);
        }
        if (iframeObject.customTheme) {
          messageEvent.setCustomTheme(iframeObject.customTheme);
        }
        messageEvent.finishIframeLoading();
      };
      console.info(
        "iframeObject.src :",
        `${iframeObject.src}${iframeObject.qs ? `?${iframeObject.qs}` : ""}`
      );
      iframeObject.iframeElement.setAttribute(
        "src",
        `${iframeObject.src}${iframeObject.qs ? `?${iframeObject.qs}` : ""}`
      );
    } catch (e) {
      console.error("error: ", e);
    }
  }
};

window.hmsWidgetAsyncInit = function(callback) {
  loadJsFile(`${domain}/message-utils.min.js`);
  loadJsFile(`${domain}/stringify.min.js`, () => {
    hmsWidget.render(function() {
      callback(hmsWidget);
    });
  });
};
window.hmsWidget = hmsWidget;
