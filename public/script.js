const socket = io("http://localhost:4000/");
var editorRef = null;
var roomID = null;

$(document).ready(() => {
    $('#editor').hide();
});

function initializeEditor() {
    editorRef = CodeMirror.fromTextArea(
        document.getElementById('Editor'),
        {
            mode: { name: 'javascript', json: true },
            theme: 'dracula',
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineNumbers: true,
        }
    );

    editorRef.on('change', (instance, changes) => {
        console.log(instance,changes);
        const { origin } = changes;
        const code = instance.getValue();
        console.log(origin);
        
        if (origin !== 'setValue') {
            socket.emit("CODE_CHANGE", {
                roomID,
                code
            });
        }
    });
}

function connectClient() {
    console.log("Function connectClient called");
    roomID = document.getElementById("roomID").value;
    console.log(roomID);
    socket.emit("join",{roomId:roomID});
    $("#main").hide();
    $('#editor').show();
    initializeEditor();
}

socket.on("Joined",(roomId) => {
    console.log("User joined room : " +roomId);
});

socket.on("SYNC_CODE",(code) => {
    console.log(code);
    syncCodeWithEditor(code);
});

function syncCodeWithEditor(code) {
    console.log(code.code);
    editorRef.setValue(code.code);
}

function disconnectClient(){
    socket.emit("end", {roomId: roomID});
    $('#editor').hide();
    $("#main").show();
}