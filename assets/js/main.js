/**
* Template Name: Simple System
* Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
* Updated: Apr 20 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

// Import event emitter
import './eventEmitter.js';

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

  /**
   * Search bar toggle
   */
  if (select('.search-bar-toggle')) {
    on('click', '.search-bar-toggle', function(e) {
      select('.search-bar').classList.toggle('search-bar-show')
    })
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Initiate tooltips
   */
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  /**
   * Initiate quill editors
   */
  if (select('.quill-editor-default')) {
    new Quill('.quill-editor-default', {
      theme: 'snow'
    });
  }

  if (select('.quill-editor-bubble')) {
    new Quill('.quill-editor-bubble', {
      theme: 'bubble'
    });
  }

  if (select('.quill-editor-full')) {
    new Quill(".quill-editor-full", {
      modules: {
        toolbar: [
          [{
            font: []
          }, {
            size: []
          }],
          ["bold", "italic", "underline", "strike"],
          [{
              color: []
            },
            {
              background: []
            }
          ],
          [{
              script: "super"
            },
            {
              script: "sub"
            }
          ],
          [{
              list: "ordered"
            },
            {
              list: "bullet"
            },
            {
              indent: "-1"
            },
            {
              indent: "+1"
            }
          ],
          ["direction", {
            align: []
          }],
          ["link", "image", "video"],
          ["clean"]
        ]
      },
      theme: "snow"
    });
  }

  /**
   * Initiate TinyMCE Editor
   */

  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  tinymce.init({
    selector: 'textarea.tinymce-editor',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_list: [{
        title: 'My page 1',
        value: 'https://www.tiny.cloud'
      },
      {
        title: 'My page 2',
        value: 'http://www.moxiecode.com'
      }
    ],
    image_class_list: [{
        title: 'None',
        value: ''
      },
      {
        title: 'Some class',
        value: 'class-name'
      }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', {
          text: 'My text'
        });
      }

      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', {
          alt: 'My alt text'
        });
      }

      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.google.com/logos/google.jpg'
        });
      }
    },
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
  });

  /**
   * Initiate Bootstrap validation check
   */
  var needsValidation = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(needsValidation)
    .forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

  /**
   * Initiate Datatables
   */
  const datatables = select('.datatable', true)
  datatables.forEach(datatable => {
    new simpleDatatables.DataTable(datatable, {
      perPageSelect: [5, 10, 15, ["All", -1]],
      columns: [{
          select: 2,
          sortSequence: ["desc", "asc"]
        },
        {
          select: 3,
          sortSequence: ["desc"]
        },
        {
          select: 4,
          cellClass: "green",
          headerClass: "red"
        }
      ]
    });
  })

  /**
   * Autoresize echart charts
   */
  const mainContainer = select('#main');
  if (mainContainer) {
    setTimeout(() => {
      new ResizeObserver(function() {
        select('.echart', true).forEach(getEchart => {
          echarts.getInstanceByDom(getEchart).resize();
        })
      }).observe(mainContainer);
    }, 200);
  }

  // Example event handling for modals
  document.addEventListener('DOMContentLoaded', function() {
    // Listen for modal open events
    eventEmitter.on('modalOpen', (modalId) => {
      const modal = new bootstrap.Modal(document.getElementById(modalId));
      modal.show();
    });

    // Listen for modal close events
    eventEmitter.on('modalClose', (modalId) => {
      const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
      if (modal) {
        modal.hide();
      }
    });

    // Example: Emit event when iframe loads
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.addEventListener('load', () => {
        eventEmitter.emit('iframeLoaded', {
          id: iframe.id,
          src: iframe.src
        });
      });
    });
  });

  // Chrome Extension Messaging System
  // Chrome拡張機能メッセージングシステム
  const chromeExtensionMessaging = {
      /**
       * Send message to Chrome extension
       * Chrome拡張機能にメッセージを送信する
       * @param {string} type - Message type
       * @param {object} data - Message data
       */
      sendMessage(type, data) {
          // Check if running in Chrome extension context
          // Chrome拡張機能のコンテキストで実行されているか確認
          if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
              chrome.runtime.sendMessage({
                  type: type,
                  data: data
              }, (response) => {
                  // Handle response from extension
                  // 拡張機能からの応答を処理
                  if (response) {
                      eventEmitter.emit('extensionResponse', response);
                  }
              });
          } else {
              console.log('Not running in Chrome extension context');
          }
      },

      /**
       * Listen for messages from Chrome extension
       * Chrome拡張機能からのメッセージをリッスン
       */
      init() {
          if (chrome && chrome.runtime && chrome.runtime.onMessage) {
              chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                  // Emit event for extension message
                  // 拡張機能メッセージのイベントを発火
                  eventEmitter.emit('extensionMessage', {
                      message: message,
                      sender: sender
                  });
                  
                  // Send response back to extension
                  // 拡張機能に応答を送信
                  sendResponse({ received: true });
              });
          }
      }
  };

  // Initialize Chrome extension messaging
  // Chrome拡張機能メッセージングを初期化
  document.addEventListener('DOMContentLoaded', function() {
      chromeExtensionMessaging.init();
      
      // Example: Send message when page loads
      // 例：ページ読み込み時にメッセージを送信
      chromeExtensionMessaging.sendMessage('pageLoaded', {
          url: window.location.href,
          title: document.title
      });
  });

  // Chrome Extension Message Handler
  // Chrome拡張機能メッセージハンドラー
  document.addEventListener('DOMContentLoaded', function() {
      const sendButton = document.getElementById('sendToExtension');
      const messageType = document.getElementById('messageType');
      const messageData = document.getElementById('messageData');
      const responseDisplay = document.getElementById('extensionResponse');

      if (sendButton) {
          sendButton.addEventListener('click', function() {
              const type = messageType.value;
              const data = messageData.value;

              // Prepare message data based on type
              // タイプに基づいてメッセージデータを準備
              let messageContent = {
                  timestamp: new Date().toISOString()
              };

              switch(type) {
                  case 'pageLoaded':
                      messageContent = {
                          url: window.location.href,
                          title: document.title,
                          timestamp: new Date().toISOString()
                      };
                      break;
                  case 'buttonClicked':
                      messageContent = {
                          buttonId: this.id,
                          buttonText: this.textContent.trim(),
                          timestamp: new Date().toISOString()
                      };
                      break;
                  case 'customMessage':
                      messageContent = {
                          message: data,
                          timestamp: new Date().toISOString()
                      };
                      break;
              }

              // Send message to extension
              // 拡張機能にメッセージを送信
              chromeExtensionMessaging.sendMessage(type, messageContent);
          });
      }

      // Listen for responses from the extension
      // 拡張機能からの応答をリッスン
      eventEmitter.on('extensionResponse', (response) => {
          if (responseDisplay) {
              responseDisplay.style.display = 'block';
              responseDisplay.textContent = JSON.stringify(response, null, 2);
          }
      });

      // Listen for messages from the extension
      // 拡張機能からのメッセージをリッスン
      eventEmitter.on('extensionMessage', (data) => {
          console.log('Received message from extension:', data);
          if (responseDisplay) {
              responseDisplay.style.display = 'block';
              responseDisplay.textContent = JSON.stringify(data, null, 2);
          }
      });
  });

})();