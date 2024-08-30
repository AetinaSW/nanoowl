var firstOnload = true;

function jpeg_binary_to_base64(buffer){
  var base64 = btoa(new Uint8Array(buffer).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
  }, ''));
  return "data:image/jpeg;base64," + base64;
}

function togglePromptType() {
  const promptTextbox = document.getElementById("prompt-textbox");
  const promptButtonList = document.getElementById("prompt-button-list");
  const svgSetupMouse = document.getElementById("svg-setup-mouse");
  const svgSetupKeyboard = document.getElementById("svg-setup-keyboard");

  promptTextbox.classList.toggle("hidden");
  promptButtonList.classList.toggle("hidden");

  if(promptTextbox.classList.contains("hidden")){
    svgSetupMouse.classList.remove("hidden");
    svgSetupKeyboard.classList.add("hidden");
  }
  else{
    svgSetupMouse.classList.add("hidden");
    svgSetupKeyboard.classList.remove("hidden");
  }

}

function setupPrompt() {
  var prompt_input = document.getElementById("prompt_input")
  prompt_input.value = DEFAULT_PROMPT;
  
  // send prompt to server
  ws.send("prompt:" + DEFAULT_PROMPT);

  // refresh .prompt-button
  const promptButtons = document.querySelectorAll('.prompt-button');
  promptButtons.forEach((button) => {
    button.classList.add("active");
  })
}

window.onload = function() {
  // append DEFAULT_OBJECT to #prompt-button-list
  const promptButtonList = document.getElementById('prompt-button-list');
  const promptButton = DEFAULT_OBJECT.map((object) => {
    /*
    // emoji 呈現
      <a
        class="prompt-button inline-block bg-[#50646d] p-4 rounded-full cursor-pointer shadow"
        data-tooltip="${object.displayName}"
      >
        <div class="text-center">
          ${object.icon}
        </div>
      </a>
    */
    return `
      <a
        class="prompt-button relative w-full inline-block bg-[#999] p-4 rounded-full cursor-pointer drop-shadow-md text-xl select-none"
        data-tooltip="${object.displayName}"
        title="${object.displayName}"
      >
        <div class="text-center text-[30px]">
          ${object.displayName}
        </div>
      </a>
    `
  }).join('');
  promptButtonList.innerHTML = promptButton;

  
  // .prompt-button click event
  function toggleButton() {
    this.classList.toggle("active");
    refreshPrompt();
  }
  const promptButtons = document.querySelectorAll('.prompt-button');
  promptButtons.forEach((button) => {
    button.addEventListener('click', toggleButton);
  })
  const refreshPrompt = () => {
    let promptText = '';
    // find .prompt-button.active class
    const activeButtons = document.querySelectorAll('.prompt-button.active');
    activeButtons.forEach((button) => {
      const displayName = button.innerText.trim();
      const object = DEFAULT_OBJECT.find((obj) => obj.displayName === displayName);
      if (object) {
        promptText += `[a ${object.promptName.toLowerCase()}]`;
      }
    });
    // set prompt_input value
    const promptInput = document.getElementById('prompt_input');
    promptInput.value = promptText;
    // send prompt to server
    ws.send("prompt:" + prompt_input.value);
  }

  // Default prompt
  setupPrompt();
}
window.addEventListener('DOMContentLoaded', (event) => {
  const cameraImage = document.getElementById('camera_image');
  const loading = document.getElementById('loading');

  cameraImage.onerror = function() {
    this.style.display = 'none';
    loading.style.display = 'inline-block';
  };

  cameraImage.onload = function() {
    this.style.display = 'inline-block';
    loading.style.display = 'none';
    if(firstOnload){
      firstOnload = false;
      setupPrompt();
    }
  };
});

// websocket
var ws = undefined

console.log(location.host);
window.onbeforeunload = function() {
  if (typeof ws !== 'undefined') {
    ws.close();
  }
};

function connectWebSocket() {
  ws = new WebSocket(DEFAULT_WS_URL);

  var connectTimeout = setTimeout(function() {
    if (ws.readyState !== WebSocket.OPEN) {
      ws.close();
      console.log("Connection timed out.");
    }
  }, 2000); // set web socket timeout

  ws.onopen = function () {
    clearTimeout(connectTimeout); // clear the timeout
    console.log("Connected.");

    var prompt_input = document.getElementById("prompt_input")

    function handle_prompt_change(event) {
      console.log("Sending prompt: " + event.target.value);

      if (typeof ws !== 'undefined') {
          ws.send("prompt:" + event.target.value);
      }
    }

    prompt_input.oninput = handle_prompt_change;
  };

  ws.onclose = function () {
    console.log("Disconnected.");
    setTimeout(connectWebSocket, 300); // Reconnect
  };

  ws.onmessage = function (event) {
    var camera_image = document.getElementById("camera_image");
    var reader = new FileReader();
    reader.readAsDataURL(event.data);
    reader.onloadend = function () {
        console.log("Received message.");
        camera_image.src = reader.result;
    }
  }
}

connectWebSocket();
